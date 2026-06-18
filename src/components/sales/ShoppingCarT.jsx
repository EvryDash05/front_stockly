
export default function ShoppingCarT({ carrito, onCancelar, onFinalizar }) {
    // Sumatoria total mapeada a la tabla Ventas
    const totalVenta = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    const subtotalNeto = totalVenta / 1.18;
    const igv = totalVenta - subtotalNeto;

    return (
        <div className="w-full flex flex-col h-full justify-between">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-acol flex-1 h-[70vh]">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">
                    Carrito de Ventas Actual
                </h3>

                {/* Tabla Dinámica de ítems */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                    {carrito.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                            <p className="text-sm">Carrito vacío</p>
                            <p className="text-xs mt-1">Selecciona productos de la lista lateral</p>
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="text-gray-400 border-b text-xs uppercase font-semibold">
                                    <th className="py-2">Producto</th>
                                    <th className="py-2 text-center">Cant.</th>
                                    <th className="py-2 text-right">P. Unit.</th>
                                    <th className="py-2 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {carrito.map(item => (
                                    <tr key={item.id_producto} className="text-gray-600 hover:bg-gray-50/50 transition">
                                        <td className="py-3 font-medium text-gray-800">{item.nombre_producto}</td>
                                        <td className="py-3 text-center font-bold text-gray-700">{item.cantidad}</td>
                                        <td className="py-3 text-right">S/ {item.precio_unitario.toFixed(2)}</td>
                                        <td className="py-3 text-right text-indigo-600 font-bold">S/ {item.subtotal.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Resumen Financiero Dinámico */}
                <div className="border-t pt-4 mt-4 space-y-2.5">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Subtotal Neto (Base Imponible):</span>
                        <span className="font-medium">S/ {subtotalNeto.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>IGV (18%):</span>
                        <span className="font-medium">S/ {igv.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-gray-800 pt-2 border-t border-dashed border-gray-300">
                        <span>TOTAL A FACTURAR:</span>
                        <span className="text-xl text-indigo-600">S/ {totalVenta.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Botones de control del pie de página */}
            <div className="flex justify-end gap-3 mt-5">
                <button
                    onClick={onCancelar}
                    disabled={carrito.length === 0}
                    className="px-5 py-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 transition text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Cancelar Orden
                </button>
                <button
                    onClick={onFinalizar}
                    disabled={carrito.length === 0}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-xs font-bold shadow-md shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Procesar Venta (Emitir Ticket)
                </button>
            </div>
        </div>
    );
}