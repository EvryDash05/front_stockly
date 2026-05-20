import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Datos estáticos basados en tu diseño para los gráficos
const dataGraficoLinea = [
  { name: '12 May', valor: 30000 },
  { name: '13 May', valor: 42000 },
  { name: '14 May', valor: 35000 },
  { name: '15 May', valor: 55000 },
  { name: '16 May', valor: 40000 },
  { name: '17 May', valor: 48000 },
  { name: '18 May', valor: 60000 },
];

const dataGraficoDona = [
  { name: 'En stock óptimo', value: 876, color: '#10B981' }, // Verde
  { name: 'Stock bajo', value: 32, color: '#FBBF24' },      // Amarillo
  { name: 'Sin stock', value: 68, color: '#EF4444' },       // Rojo
  { name: 'Sin movimiento', value: 272, color: '#9CA3AF' }, // Gris
];

function DashboardPage() {
  // Simulación de usuario (luego lo puedes jalar de tu estado/localStorage)
  const usuario = { nombre: 'Juan' }; 

  return (
    <div className="space-y-8">
      
      {/* 1. CABECERA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1C3D]">¡Hola, {usuario.nombre}! 👋</h1>
          <p className="text-sm text-gray-500 mt-1">Aquí tienes un resumen de tu inventario.</p>
        </div>
        
        {/* Selector de Fecha */}
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm text-sm text-gray-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0V7.5m18 0V5.25c0-.621-.504-1.125-1.125-1.125H5.25C4.629 4.125 4.125 4.629 4.125 5.25V7.5" />
          </svg>
          <span className="font-medium">12 may. – 18 may. 2024</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Tarjeta: Productos totales */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-[#EEF2FF] text-[#3B46C4] rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-10.5v10.5" /></svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Productos totales</p>
            <h3 className="text-2xl font-bold text-[#1A1C3D] mt-1">1,248</h3>
            <p className="text-xs text-emerald-500 font-medium mt-1">+8% vs. semana pasada</p>
          </div>
        </div>

        {/* Tarjeta: Stock bajo */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-[#FFFBEB] text-[#D97706] rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Stock bajo</p>
            <h3 className="text-2xl font-bold text-[#1A1C3D] mt-1">32</h3>
            <button className="text-xs text-[#3B46C4] font-medium underline mt-1 block">Ver detalles</button>
          </div>
        </div>

        {/* Tarjeta: Valor del inventario */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-[#ECFDF5] text-[#059669] rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125H3.75m16.5 0h.008v.008h-.008v-.008Zm0-3h.008v.008h-.008v-.008Z" /></svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor del inventario</p>
            <h3 className="text-2xl font-bold text-[#1A1C3D] mt-1">S/ 45,680.00</h3>
            <p className="text-xs text-emerald-500 font-medium mt-1">+12% vs. semana pasada</p>
          </div>
        </div>

        {/* Tarjeta: Productos vencidos */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-[#FDF2F8] text-[#DB2777] rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Productos vencidos</p>
            <h3 className="text-2xl font-bold text-[#1A1C3D] mt-1">5</h3>
            <button className="text-xs text-[#3B46C4] font-medium underline mt-1 block">Ver detalles</button>
          </div>
        </div>

      </div>

      {/* 3. FILA CENTRAL: GRÁFICO DE LÍNEA Y PRODUCTOS MÁS VENDIDOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico de Resumen de Inventario */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-[#1A1C3D]">Resumen de inventario (últimos 7 días)</h2>
            <select className="text-xs border border-gray-200 rounded-lg p-1.5 focus:outline-none text-gray-500 bg-transparent font-medium">
              <option>Esta semana</option>
            </select>
          </div>
          <div className="h-[250px] w-full text-xs">
            <ResponsiveContainer width="100%" h="100%">
              <AreaChart data={dataGraficoLinea} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B46C4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B46C4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#9CA3AF" tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(value) => [`S/ ${value}`, 'Valor']} />
                <Area type="monotone" dataKey="valor" stroke="#3B46C4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorValor)" dot={{ stroke: '#3B46C4', strokeWidth: 2, r: 4, fill: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lista de Productos más vendidos */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-[#1A1C3D]">Productos más vendidos</h2>
            <button className="text-xs text-[#3B46C4] font-semibold hover:underline">Ver todos</button>
          </div>
          
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {[
              { id: 1, name: 'Gaseosa Coca Cola 500 ml', cat: 'Bebidas', qty: '350 uds' },
              { id: 2, name: 'Aceite Vegetal 1L', cat: 'Despensa', qty: '250 uds' },
              { id: 3, name: 'Arroz Extra 5 kg', cat: 'Despensa', qty: '200 uds' },
              { id: 4, name: 'Leche Entera 1L', cat: 'Lácteos', qty: '180 uds' },
              { id: 5, name: 'Azúcar Rubia 1 kg', cat: 'Despensa', qty: '150 uds' },
            ].map((prod) => (
              <div key={prod.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 w-6 h-6 flex items-center justify-center rounded-full">{prod.id}</span>
                  <div>
                    <h4 className="font-semibold text-gray-700 leading-tight">{prod.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{prod.cat}</p>
                  </div>
                </div>
                <span className="font-bold text-[#1A1C3D] text-xs shrink-0">{prod.qty}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. FILA INFERIOR: ALERTAS IMPORTANTES Y DONA DE ESTADO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alertas Importantes */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-[#1A1C3D]">Alertas importantes</h2>
            <button className="text-xs text-[#3B46C4] font-semibold hover:underline">Ver todas</button>
          </div>
          
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {/* Alerta Stock Bajo */}
            <div className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-xl cursor-pointer hover:bg-red-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-700">32 productos con stock bajo</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Revisa los productos que necesitan reposición.</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </div>

            {/* Alerta Productos Vencidos */}
            <div className="flex items-center justify-between p-4 bg-amber-50/50 border border-amber-100 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-700">5 productos vencidos</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Revisa los productos vencidos y toma acción.</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </div>
          </div>
        </div>

        {/* Gráfico de Dona: Estado del Inventario */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h2 className="text-base font-bold text-[#1A1C3D] mb-4">Estado del inventario</h2>
          
          <div className="flex flex-row items-center justify-between gap-2 flex-1">
            {/* Gráfico Circular Real */}
            <div className="w-[130px] h-[130px] relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataGraficoDona}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {dataGraficoDona.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Texto absoluto en el centro de la dona */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-bold text-[#1A1C3D] leading-none">1,248</span>
                <span className="text-[10px] font-medium text-gray-400 mt-0.5">Total</span>
              </div>
            </div>

            {/* Leyendas customizadas alineadas a la derecha */}
            <div className="space-y-2 text-xs flex-1 pl-4">
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span><span className="text-gray-500">En stock óptimo</span></div><span className="font-semibold text-[#1A1C3D]">876 (70%)</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]"></span><span className="text-gray-500">Stock bajo</span></div><span className="font-semibold text-[#1A1C3D]">32 (3%)</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span><span className="text-gray-500">Sin stock</span></div><span className="font-semibold text-[#1A1C3D]">68 (5%)</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]"></span><span className="text-gray-500">Sin mov.</span></div><span className="font-semibold text-[#1A1C3D]">272 (22%)</span></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default DashboardPage;