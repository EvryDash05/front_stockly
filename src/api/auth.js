import { API_URL } from "../utils/constants/constants";

export const loginUser = async ({ email, password }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const resData = await response.json();

    // React Query requiere que lancemos un error si la respuesta no es exitosa (status fuera del rango 200-299)
    // o si tu API maneja el error dentro del JSON con un flag "success: false"
    if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Error al iniciar sesión');
    }

    return resData.data; // Retornamos directamente el objeto que contiene { user, token }
};