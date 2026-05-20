import { API_URL } from "../utils/constants/constants";

export const getProducts = async () => {
    // Recuperamos el token almacenado en el localStorage
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/product/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
2
    const resData = await response.json();

    if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Error al obtener los productos');
    }

    return resData.data; // Retorna directamente el array de productos
};


export const createProduct = async (productData) => {
    const token = localStorage.getItem('token');

    console.log(`Token: ${token}`)

    const response = await fetch(`${API_URL}/product/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
    });

    const resData = await response.json();

    if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Error al registrar el producto');
    }

    return resData.data;
};