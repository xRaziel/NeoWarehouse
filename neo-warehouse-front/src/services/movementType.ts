import { API_URL } from "../config/api";


export const obtenerTiposMovimiento = async () => {
    const response = await fetch(`${API_URL}/type-movements/getAllTypeMovements`);
    const data = await response.json();
    if (data.status === 'error' || !response.ok) {
        throw new Error(data.message || 'Error al obtener los tipos de movimiento');
    }
    return data;
};