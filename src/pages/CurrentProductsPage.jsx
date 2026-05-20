import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products'; // El mismo endpoint GET con Bearer que ya creamos
import ProductList from '../components/products/ProductList';
import ProductDetail from '../components/products/ProductDeatil';

function CurrentProductsPage() {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    // Hook useQuery para traer los datos limpios desde Node.js
    const { data: listaProductos, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    // Efecto para auto-seleccionar el primer elemento apenas cargue la lista del backend
    useEffect(() => {
        if (listaProductos && listaProductos.length > 0 && !productoSeleccionado) {
            setProductoSeleccionado(listaProductos[0]);
        }
    }, [listaProductos, productoSeleccionado]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] gap-3">
                <div className="w-10 h-10 border-4 border-[#3B46C4] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-gray-500">Cargando catálogo maestro...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center max-w-md mx-auto text-sm">
                <p className="font-bold">Error al jalar los productos</p>
                <p className="text-xs text-red-500 mt-0.5">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto">

            {/* Barra de Acciones Superior */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-[#1A1C3D]">Gestión de productos</h1>
                    <p className="text-sm text-gray-400 mt-1">Consulta y administra la información de todos tus productos.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
                        Importar productos
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#3B46C4] hover:bg-[#2F38A3] rounded-xl text-xs font-bold text-white shadow-sm transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        Agregar producto
                    </button>
                </div>
            </div>

            {/* Cuerpo Layout: Dividido en 2 Columnas Maestras */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Columna Izquierda (Ancho 1/3) */}
                <div className="lg:col-span-1">
                    <ProductList
                        productos={listaProductos || []}
                        productoSeleccionado={productoSeleccionado}
                        onSeleccionarProducto={setProductoSeleccionado}
                    />
                </div>

                {/* Columna Derecha (Ancho 2/3) */}
                <div className="lg:col-span-2">
                    <ProductDetail prod={productoSeleccionado} />
                </div>

            </div>

        </div>
    );
}

export default CurrentProductsPage;