import { useState } from 'react';

export default function ProductCatalog({ productos, onAgregarAlCarrito }) {
    const [busqueda, setBusqueda] = useState('');

    const productosFiltrados = productos.filter(p =>
        p.nombre_producto.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.sku.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="w-full flex flex-col h-full">
            {/* Input Buscador */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre o SKU..."
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm bg-white shadow-sm"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            {/* Lista de productos en scroll */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {productosFiltrados.map(producto => (
                    <div
                        key={producto.id_producto}
                        className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition"
                    >
                        <div>
                            <h4 className="font-semibold text-gray-800 text-sm">{producto.nombre_producto}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">{producto.sku} • Stock: {producto.stock_actual} uds</p>
                            <p className="text-sm font-bold text-indigo-600 mt-1.5">S/ {producto.precio_venta.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={() => onAgregarAlCarrito(producto)}
                            className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition text-xs font-bold shadow-sm"
                        >
                            ＋ Agregar
                        </button>
                    </div>
                ))}
                {productosFiltrados.length === 0 && (
                    <p className="text-center text-gray-400 text-xs py-8">No se encontraron productos coincidentes.</p>
                )}
            </div>
        </div>
    );
}