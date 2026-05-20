
function RowProductCount({ prod, onCantidadChange, onEliminar }) {
    const diferencia = prod.cantidadContada - prod.stockTeorico;

    return (
        <tr className="hover:bg-slate-50/50 transition-colors">
            {/* Celda Producto */}
            <td className="py-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 text-xs font-bold text-gray-400">[Img]</div>
                <div>
                    <h4 className="font-semibold text-gray-800 leading-tight">{prod.nombre}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{prod.categoria}</p>
                </div>
            </td>

            {/* Celda SKU */}
            <td className="py-4 text-gray-500 font-medium text-xs">{prod.sku}</td>

            {/* Celda Stock Teórico */}
            <td className="py-4 text-gray-500 font-semibold">{prod.stockTeorico} uds</td>

            {/* Celda Cantidad Contada */}
            <td className="py-4">
                <div className="flex border border-gray-200 rounded-xl overflow-hidden w-[130px] focus-within:border-[#3B46C4] focus-within:ring-1 focus-within:ring-[#3B46C4] bg-white">
                    <input
                        type="number"
                        min="0"
                        value={prod.cantidadContada}
                        onChange={(e) => onCantidadChange(prod.id, e.target.value)}
                        className="w-full pl-3 py-1.5 text-sm font-semibold text-gray-700 focus:outline-none text-right"
                    />
                    <span className="bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-400 border-l border-gray-100 flex items-center">uds</span>
                </div>
            </td>

            {/* Celda Diferencia Dinámica */}
            <td className="py-4 text-center font-bold">
                {diferencia === 0 ? (
                    <span className="text-gray-400">0</span>
                ) : diferencia > 0 ? (
                    <span className="text-emerald-500">+{diferencia}</span>
                ) : (
                    <span className="text-red-500">{diferencia}</span>
                )}
            </td>

            {/* Celda Acciones */}
            <td className="py-4 text-right pr-4">
                <button
                    onClick={() => onEliminar(prod.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.559.831-1.018 1.402-1.218M4.927 5.79c1.096-.065 2.192-.132 3.297-.193M16.012 5.79l-.213-1.442a2.25 2.25 0 0 0-2.244-2.077H10.43a2.25 2.25 0 0 0-2.244 2.077L8.016 5.79m7.862 0H16.01M8.941 5.79m7.862 0A48.112 48.112 0 0 1 13 5.714H10" /></svg>
                </button>
            </td>
        </tr>
    );
}

export default RowProductCount;