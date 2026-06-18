
function TopSellingProducts({ products }) {
    return (
        <div className="w-full lg:w-8/12 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Top 5 Productos Más Vendidos</h3>

            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-gray-400 border-b text-xs uppercase font-semibold">
                            <th className="py-2">Producto</th>
                            <th className="py-2 text-center">Unidades Vendidas</th>
                            <th className="py-2 text-right">Total Recaudado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((item, idx) => (
                            <tr key={idx} className="text-gray-600 hover:bg-gray-50/50 transition">
                                <td className="py-3 font-medium text-gray-800">{item.nombre_producto}</td>
                                <td className="py-3 text-center font-bold text-gray-700">{item.unidades_vendidas} uds</td>
                                <td className="py-3 text-right text-indigo-600 font-bold">S/ {item.total_recaudado.toFixed(2)}</td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center text-gray-400 text-xs py-8">Aún no se registran transacciones de venta en el sistema.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TopSellingProducts;