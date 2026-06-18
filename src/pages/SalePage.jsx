import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ShoppingCarT from '../components/sales/ShoppingCarT';
import ProductCatalog from '../components/sales/ProductCatalog';

// 1. Petición GET: Obtener catálogo de productos real
const fetchProductosAPI = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/product/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error('Error al recuperar datos del servidor');
    const resJson = await res.json();

    return resJson.data.map(p => ({
        ...p,
        sku: `SKU-${p.id_producto}`
    }));
};

// 2. Petición POST: Despachar la transacción de venta a Express
const createSaleAPI = async (payload) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/sale', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    const data = await res.json();

    // Si la API responde con errores estructurados (400, 404, 409), lanzamos el mensaje para capturarlo en onError
    if (!res.ok) {
        throw new Error(data.message || 'Error desconocido al procesar la venta');
    }

    return data;
};

export default function VentasPOS() {
    const [carrito, setCarrito] = useState([]);
    const queryClient = useQueryClient();

    // Query: Consumo declarativo del catálogo
    const { data: productos = [], isLoading, isError } = useQuery({
        queryKey: ['productosCat'],
        queryFn: fetchProductosAPI
    });

    // Mutation: Procesa la lógica transaccional de la venta
    const { mutate, isPending } = useMutation({
        mutationFn: createSaleAPI,
        onSuccess: () => {
            alert('Venta procesada con éxito. El inventario ha sido actualizado.');
            setCarrito([]);
            // Invalida la caché de React Query: Fuerza un re-fetch automático del stock real desde Postgres
            queryClient.invalidateQueries({ queryKey: ['productosCat'] });
        },
        onError: (error) => {
            // Captura los mensajes de error arrojados por tu controlador (Ej: "Stock insuficiente para: X")
            alert(`Error en la transacción: ${error.message}`);
        }
    });

    const handleAgregarAlCarrito = (producto) => {
        const itemExistente = carrito.find(item => item.id_producto === producto.id_producto);

        if (itemExistente) {
            if (itemExistente.cantidad >= producto.stock_actual) {
                alert('Lo sentimos, no hay suficiente stock físico en el inventario para añadir más unidades.');
                return;
            }
            setCarrito(carrito.map(item =>
                item.id_producto === producto.id_producto
                    ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * item.precio_unitario }
                    : item
            ));
        } else {
            setCarrito([...carrito, {
                id_producto: producto.id_producto,
                nombre_producto: producto.nombre_producto,
                cantidad: 1,
                precio_unitario: producto.precio_venta,
                subtotal: producto.precio_venta
            }]);
        }
    };

    const handleCancelarOrden = () => {
        if (window.confirm('¿Estás seguro de que deseas vaciar el carrito actual?')) {
            setCarrito([]);
        }
    };

    const handleFinalizarVenta = () => {
        // Estructura exacta que requiere tu Zod Schema (items array)
        const payload = {
            items: carrito.map(item => ({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio_unitario: item.precio_unitario
            }))
        };

        // Disparar la mutación asíncrona hacia el controlador
        mutate(payload);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-sm font-semibold text-gray-500 animate-pulse">Sincronizando pasarela comercial...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-sm font-semibold text-red-500">Error de credenciales o falla al conectar con el servidor.</p>
            </div>
        );
    }

    return (
        <div className="flex h-[92vh] bg-gray-50/50">
            {/* SECCIÓN CATÁLOGO (40%) */}
            <div className="w-5/12 p-6 flex flex-col border-r border-gray-200">
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Punto de Venta Directa (POS)</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Catálogo real protegido mediante cifrado JWT</p>
                </div>
                <div className="flex-1 overflow-hidden">
                    <ProductCatalog
                        productos={productos}
                        onAgregarAlCarrito={handleAgregarAlCarrito}
                    />
                </div>
            </div>

            {/* SECCIÓN ARQUEO / CARRITO (60%) */}
            <div className="w-7/12 p-6 flex flex-col bg-gray-50">
                <div className="flex-1">
                    {isPending ? (
                        <div className="flex flex-col items-center justify-center h-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <p className="text-sm font-bold text-indigo-600 animate-pulse">Ejecutando bloque transaccional en el servidor...</p>
                            <p className="text-xs text-gray-400 mt-1">Verificando existencias de stock y procesando COMMIT en disco.</p>
                        </div>
                    ) : (
                        <ShoppingCarT
                            carrito={carrito}
                            onCancelar={handleCancelarOrden}
                            onFinalizar={handleFinalizarVenta}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}