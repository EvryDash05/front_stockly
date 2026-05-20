import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products'; // Ajusta la ruta a tu estructura
import RowProductCount from '../components/inventory/RowProductCount';
import SearchBar from '../components/inventory/SearchBar';
import CountingSummary from '../components/inventory/CountingSummary';

function InventoryCountPage() {
    const [activeTab, setActiveTab] = useState('buscar');
    const [productos, setProductos] = useState([]);

    // 1. Hook useQuery para consumir la API de productos de forma segura
    const { data: remoteProducts, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    // 2. Sincronizar la data del backend con el estado local mutable del conteo
    useEffect(() => {
        if (remoteProducts) {
            // Mapeamos las propiedades del backend a lo que requiere el componente de conteo
            const mapeados = remoteProducts.map(prod => ({
                id: prod.id_producto,
                nombre: prod.nombre_producto,
                categoria: 'General', // Si en el futuro agregas la relación en el back lo mapeas aquí
                sku: `SKU-${prod.id_producto}`, // O el campo correspondiente si añades la columna
                stockTeorico: prod.stock_actual,
                cantidadContada: prod.stock_actual, // Por defecto se inicializa igual al teórico
            }));
            setProductos(mapeados);
        }
    }, [remoteProducts]);

    const handleCantidadChange = (id, valor) => {
        const nuevaCantidad = valor === '' ? 0 : parseInt(valor, 10);
        setProductos(prev =>
            prev.map(prod => prod.id === id ? { ...prod, cantidadContada: nuevaCantidad } : prod)
        );
    };

    const handleEliminar = (id) => {
        setProductos(prev => prev.filter(prod => prod.id !== id));
    };

    // Manejo de estados de carga y error globales de la página
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] gap-3">
                <div className="w-10 h-10 border-4 border-[#3B46C4] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-gray-500">Cargando productos del inventario...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm max-w-[600px] mx-auto text-center">
                <p className="font-bold">Ocurrió un error al cargar el inventario</p>
                <p className="mt-1 text-xs text-red-500">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto">
            {/* CABECERA PRINCIPAL */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-[#1A1C3D]">Ingreso del conteo</h1>
                    <p className="text-sm text-gray-400 mt-1">Registra la cantidad física de cada producto.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl text-sm font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
                    Salir del conteo
                </button>
            </div>

            <CountingSummary />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <SearchBar activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* TABLA DE PRODUCTOS DINÁMICA */}
                <div>
                    <h3 className="text-xs font-bold text-[#1A1C3D] uppercase tracking-wider mb-4">Productos a contar</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <th className="pb-3 font-semibold">Producto</th>
                                    <th className="pb-3 font-semibold">SKU</th>
                                    <th className="pb-3 font-semibold">Stock teórico</th>
                                    <th className="pb-3 font-semibold text-center md:text-left">Cantidad contada</th>
                                    <th className="pb-3 font-semibold text-center">Diferencia</th>
                                    <th className="pb-3 font-semibold text-right pr-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {productos.map((prod) => (
                                    <RowProductCount
                                        key={prod.id}
                                        prod={prod}
                                        onCantidadChange={handleCantidadChange}
                                        onEliminar={handleEliminar}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button className="mt-4 flex items-center gap-2 px-4 py-2 border border-[#3B46C4] hover:bg-indigo-50 text-[#3B46C4] rounded-xl text-xs font-bold transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        Agregar producto manualmente
                    </button>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                    Cancelar conteo
                </button>
                <button className="px-6 py-2.5 bg-[#3B46C4] hover:bg-[#2F38A3] text-white font-semibold rounded-xl text-sm shadow-sm transition-colors">
                    Guardar y finalizar conteo
                </button>
            </div>
        </div>
    );
}

export default InventoryCountPage;