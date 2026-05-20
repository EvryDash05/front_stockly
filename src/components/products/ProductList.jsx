
function ProductList({ productos, productoSeleccionado, onSeleccionarProducto }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-[750px]">

            {/* Buscador e Input */}
            <div className="space-y-3 mb-4">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Buscar producto por nombre o SKU"
                        className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4]"
                    />
                    <span className="absolute right-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" /></svg>
                    </span>
                </div>

                <select className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white text-gray-500 font-medium focus:outline-none cursor-pointer">
                    <option>Todas las categorías</option>
                </select>
            </div>

            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                Total de productos: {productos.length}
            </p>

            {/* Lista Scrolleable */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {productos.map((prod) => {
                    const isSelected = productoSeleccionado?.id_producto === prod.id_producto;
                    // Lógica de color del indicador de stock
                    const stockColor = prod.stock_actual <= prod.stock_minimo ? 'bg-amber-400' : 'bg-emerald-500';

                    return (
                        <div
                            key={prod.id_producto}
                            onClick={() => onSeleccionarProducto(prod)}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${isSelected
                                    ? 'bg-[#EEF2FF] border-[#3B46C4]/30 ring-1 ring-[#3B46C4]/20'
                                    : 'bg-white border-gray-100 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 text-[10px] text-gray-400 border border-gray-100 font-bold">[Img]</div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-xs leading-tight line-clamp-1">{prod.nombre_producto}</h4>
                                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">SKU: {prod.sku || `SKU-${prod.id_producto}`}</p>
                                </div>
                            </div>

                            <div className="text-right shrink-0 flex items-center gap-3">
                                <div>
                                    <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Stock actual</p>
                                    <p className="font-bold text-gray-700 text-xs mt-0.5">{prod.stock_actual} uds</p>
                                </div>
                                <span className={`w-2 h-2 rounded-full ${stockColor}`}></span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Paginación Estática del Diseño */}
            <div className="flex items-center justify-center gap-1 pt-4 border-t border-gray-50 mt-4 text-xs font-semibold text-gray-500">
                <button className="p-1 hover:bg-gray-100 rounded-lg">‹</button>
                <button className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#3B46C4] text-white">1</button>
                <button className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100">2</button>
                <button className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100">3</button>
                <span className="px-1 text-gray-300">...</span>
                <button className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100">16</button>
                <button className="p-1 hover:bg-gray-100 rounded-lg">›</button>
            </div>

        </div>
    )
}

export default ProductList;