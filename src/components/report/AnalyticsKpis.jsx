function AnalyticsKpis({ kpis }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Valor del Inventario</span>
                <span className="text-2xl font-black text-gray-800 mt-2">S/ {kpis.valor_total_inventario.toFixed(2)}</span>
                <span className="text-[10px] text-gray-400 mt-1">Costo total acumulado en base al precio de compra</span>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Productos en Catálogo</span>
                <span className="text-2xl font-black text-indigo-600 mt-2">{kpis.total_productos} ítems</span>
                <span className="text-[10px] text-gray-400 mt-1">Variedad de artículos únicos registrados en stock</span>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alertas de Stock Bajo</span>
                <span className="text-2xl font-black text-red-500 mt-2">{kpis.productos_stock_bajo} críticas</span>
                <span className="text-[10px] text-gray-400 mt-1">Productos que se encuentran bajo el umbral mínimo definido</span>
            </div>
        </div>
    );
}

export default AnalyticsKpis;