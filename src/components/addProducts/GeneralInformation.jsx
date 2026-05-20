
// Recibimos los estados del padre a través de las props
function GeneralInformation({ 
  nombreProducto, 
  setNombreProducto, 
  descripcion, 
  setDescripcion 
}) {
  return (
    <div>
      <h2 className="text-sm font-bold text-[#1A1C3D] uppercase tracking-wider mb-4">Información general</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Nombre del Producto - VINCULADO */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">Nombre del producto <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            placeholder="Ej. Gaseosa Coca Cola 500 ml" 
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] focus:ring-1 focus:ring-[#3B46C4]" 
            required 
            value={nombreProducto} // <-- Enlace de datos
            onChange={(e) => setNombreProducto(e.target.value)} // <-- Actualiza el padre
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">SKU / Código <span className="text-red-500">*</span></label>
          <input type="text" placeholder="Ej. COCA-500" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] focus:ring-1 focus:ring-[#3B46C4]" required />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">Código de barras</label>
          <div className="relative flex items-center">
            <input type="text" placeholder="Ej. 7750895001234" className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] focus:ring-1 focus:ring-[#3B46C4]" />
            <span className="absolute right-4 text-gray-400 cursor-pointer hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 4.875 9.5v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.5v-4.5Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 14v2m-3 2h2m3 0h-1m1-3h.01M14 20h.01M17 20h.01m-3-3h.01M20 14h.01" /></svg>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">Categoría <span className="text-red-500">*</span></label>
          <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] bg-white text-gray-500 cursor-pointer" required defaultValue="">
            <option value="" disabled>Selecciona una categoría</option>
            <option value="bebidas">Bebidas</option>
            <option value="despensa">Despensa</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">Marca <span className="text-red-500">*</span></label>
          <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] bg-white text-gray-500 cursor-pointer" required defaultValue="">
            <option value="" disabled>Ej. Coca Cola</option>
            <option value="cocacola">Coca Cola</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">Proveedor <span className="text-red-500">*</span></label>
          <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] bg-white text-gray-500 cursor-pointer" required defaultValue="">
            <option value="" disabled>Selecciona un proveedor</option>
            <option value="prov1">Proveedor Demo 1</option>
          </select>
        </div>

        {/* Descripción - VINCULADA */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-gray-600">Descripción</label>
          <textarea 
            rows="2" 
            placeholder="Describe las características del producto, presentaciones, usos, etc." 
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] focus:ring-1 focus:ring-[#3B46C4] resize-none" 
            value={descripcion} // <-- Enlace de datos
            onChange={(e) => setDescripcion(e.target.value)} // <-- Actualiza el padre
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">Unidad de medida <span className="text-red-500">*</span></label>
          <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] bg-white text-gray-500 cursor-pointer" required defaultValue="">
            <option value="" disabled>Selecciona una unidad</option>
            <option value="uds">Unidades (uds)</option>
            <option value="kg">Kilogramos (kg)</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default GeneralInformation;