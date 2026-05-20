import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { loginUser } from '../../api/auth';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // Configuración de la mutación con React Query
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // Aquí manejas el éxito de la autenticación
            console.log('Login exitoso:', data.user);
            console.log('Token recibido:', data.token);

            // Ejemplo: Guardar token en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Aquí podrías redireccionar al dashboard, ej: navigate('/dashboard')
            navigate('/main-menu');
        },
        onError: (error) => {
            // Aquí manejas los errores del backend (credenciales incorrectas, etc.)
            console.error('Error en la mutación:', error.message);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Intentando iniciar sesión con:', { email, password });
        if (!email || !password) return;


        // Ejecuta la petición pasando el body esperado
        loginMutation.mutate({ email, password });
    };


    return (
        <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Mostrar mensaje de error si la mutación falla */}
            {loginMutation.isError && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
                    {loginMutation.error.message}
                </div>
            )}

            {/* Input: Correo electrónico */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#1a1c3d]" htmlFor="email">
                    Correo electrónico
                </label>
                <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </span>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        disabled={loginMutation.isPending}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b46c4] focus:ring-1 focus:ring-[#3b46c4] transition-colors disabled:bg-gray-50"
                        required
                    />
                </div>
            </div>

            {/* Input: Contraseña */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#1a1c3d]" htmlFor="password">
                    Contraseña
                </label>
                <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </span>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        disabled={loginMutation.isPending}
                        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b46c4] focus:ring-1 focus:ring-[#3b46c4] transition-colors disabled:bg-gray-50"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Opciones: Recordarme y Olvidaste tu contraseña */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#3b46c4] focus:ring-[#3b46c4] cursor-pointer"
                    />
                    Recordarme
                </label>
                <a href="#forgot" className="text-[#3b46c4] font-medium hover:underline">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            {/* Botón: Iniciar sesión dinámico */}
            <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-[#3b46c4] hover:bg-[#2f38a3] text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors text-sm mt-2 flex items-center justify-center gap-2 disabled:bg-blue-400"
            >
                {loginMutation.isPending ? (
                    <>
                        {/* Spinner simple de carga */}
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Cargando...
                    </>
                ) : (
                    'Iniciar sesión'
                )}
            </button>
        </form>
    );
}