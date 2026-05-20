import { useState } from 'react';

function ProductDetail({ prod }) {
    const [activeTab, setActiveTab] = useState('general'); // general, costos, ubicaciones, movimientos

    if (!prod) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-[750px] flex flex-col items-center justify-center text-center text-gray-400 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-300"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" /></svg>
                <p className="text-sm font-medium">Selecciona un producto de la lista para ver su detalle completo.</p>
            </div>
        );
    }

    // Cálculo de valor de inventario para el KPI superior derecho
    const valorInventarioTotal = prod.stock_actual * prod.precio_compra;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 h-[750px] flex flex-col overflow-y-auto">

            {/* Cabecera del Detalle */}
            <div className="flex justify-between items-start gap-4 border-b border-gray-50 pb-6 mb-6">
                <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center font-bold text-gray-400 shrink-0">[Img]</div>
                    <div>
                        <h2 className="text-lg font-bold text-[#1A1C3D] leading-tight">{prod.nombre_producto}</h2>
                        <p className="text-xs text-gray-400 font-medium mt-1">SKU: {prod.sku || `SKU-${prod.id_producto}`}</p>
                        <span className="inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full mt-2">Activo</span>
                    </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-xs font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.128-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
                    Editar producto
                </button>
            </div>

            {/* Grid de 4 Mini KPIs superiores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-3.5 text-center">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Stock actual</p>
                    <p className="text-base font-bold text-[#1A1C3D] mt-1">{prod.stock_actual} uds</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Stock disponible</p>
                </div>
                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-3.5 text-center">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Stock mínimo</p>
                    <p className="text-base font-bold text-[#1A1C3D] mt-1">{prod.stock_minimo} uds</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Cantidad mínima</p>
                </div>
                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-3.5 text-center">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Stock máximo</p>
                    <p className="text-base font-bold text-[#1A1C3D] mt-1">500 uds</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Cantidad máxima</p>
                </div>
                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-3.5 text-center">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Valor del inventario</p>
                    <p className="text-base font-bold text-[#1A1C3D] mt-1">S/ {valorInventarioTotal.toFixed(2)}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Costo total</p>
                </div>
            </div>

            {/* Sub-Navegación por pestañas */}
            <div className="flex border-b border-gray-100 text-xs font-semibold text-gray-400 mb-6 gap-6">
                {[
                    { id: 'general', label: 'Información general' },
                    { id: 'costos', label: 'Precios y costos' },
                    { id: 'ubicaciones', label: 'Ubicaciones' },
                    { id: 'movimientos', label: 'Historial de movimientos' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 transition-colors border-b-2 ${activeTab === tab.id ? 'border-[#3B46C4] text-[#3B46C4] font-bold' : 'border-transparent hover:text-gray-600'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Contenido Dinámico de la Pestaña Activa */}
            {activeTab === 'general' && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-xs flex-1">
                    <div><p className="text-gray-400 font-medium">Categoría</p><p className="font-semibold text-gray-700 mt-1">{prod.categoria || 'Bebidas'}</p></div>
                    <div><p className="text-gray-400 font-medium">Proveedor</p><p className="font-semibold text-gray-700 mt-1">Distribuidora ABC S.A.C.</p></div>

                    <div><p className="text-gray-400 font-medium">Marca</p><p className="font-semibold text-gray-700 mt-1">Coca Cola</p></div>
                    <div><p className="text-gray-400 font-medium">Fecha de registro</p><p className="font-semibold text-gray-700 mt-1">10 ene. 2024</p></div>

                    <div><p className="text-gray-400 font-medium">Presentación</p><p className="font-semibold text-gray-700 mt-1">Botella</p></div>
                    <div><p className="text-gray-400 font-medium">Última actualización</p><p className="font-semibold text-gray-700 mt-1">12 may. 2024</p></div>

                    <div><p className="text-gray-400 font-medium">Contenido</p><p className="font-semibold text-gray-700 mt-1">500 ml</p></div>
                    <div><p className="text-gray-400 font-medium">Estado</p><p className="font-semibold text-gray-700 mt-1">🟢 Activo</p></div>

                    <div><p className="text-gray-400 font-medium">Unidad de medida</p><p className="font-semibold text-gray-700 mt-1">Unidad</p></div>
                    <div><p className="text-gray-400 font-medium">Vencimiento</p><p className="font-semibold text-gray-700 mt-1">{prod.fecha_vencimiento ? new Date(prod.fecha_vencimiento).toLocaleDateString() : 'No aplica'}</p></div>

                    <div className="col-span-2 border-t border-gray-50 pt-4">
                        <p className="text-gray-400 font-medium">Descripción</p>
                        <p className="font-medium text-gray-600 mt-1 leading-relaxed">{prod.descripcion || 'Sin descripción disponible para este artículo.'}</p>
                    </div>
                </div>
            )}

            {activeTab === 'costos' && (
                <div className="grid grid-cols-2 gap-5 text-xs flex-1">
                    <div><p className="text-gray-400 font-medium">Precio de Compra</p><p className="font-bold text-gray-700 text-sm mt-1">S/ {Number(prod.precio_compra).toFixed(2)}</p></div>
                    <div><p className="text-gray-400 font-medium">Precio de Venta</p><p className="font-bold text-gray-700 text-sm mt-1">S/ {Number(prod.precio_venta).toFixed(2)}</p></div>
                    <div><p className="text-gray-400 font-medium">Margen de Ganancia</p><p className="font-semibold text-emerald-500 mt-1">S/ {(prod.precio_venta - prod.precio_compra).toFixed(2)}</p></div>
                </div>
            )}

        </div>
    );
}

export default ProductDetail;