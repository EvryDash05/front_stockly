
function CategoryDistribution({ distribution, totalValue }) {
    return (
        <div className="w-full lg:w-4/12 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Distribución por Categorías</h3>

            <div className="flex-1 flex flex-col justify-center space-y-4 py-2">
                {distribution.map((item, idx) => {
                    const porcentaje = totalValue > 0 ? (item.valor_monetario / totalValue) * 100 : 0;

                    return (
                        <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs font-medium text-gray-600">
                                <span className="truncate max-w-[160px]">{item.categoria} ({item.cantidad})</span>
                                <span className="font-semibold text-indigo-600">S/ {item.valor_monetario.toFixed(2)}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${porcentaje}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
                {distribution.length === 0 && (
                    <p className="text-center text-gray-400 text-xs py-6">No hay categorías registradas.</p>
                )}
            </div>
        </div>
    );
}

export default CategoryDistribution;