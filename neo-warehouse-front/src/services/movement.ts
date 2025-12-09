import { API_URL } from "../config/api";
import type { Movement } from "../types";


export const obtenerMovimientos = async () => {
    const response = await fetch(`${API_URL}/movements/getAllMovements`);
    const data = await response.json();
    if (data.status === 'error' || !response.ok) {
        throw new Error(data.message || 'Error al obtener los movimientos');
    }
    return data;
};

export const crearMovimiento = async (movimiento: Omit<Movement, "id">) => {

    const response = await fetch(`${API_URL}/movements/createMovement`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movimiento),
    });

    const data = await response.json();
    if(data.status === 'error' || !response.ok){
        throw new Error(data.message || 'Error al crear el movimiento');
    }
    return data;
    
};

export const getCantUltimoMesMovimientos = async () => {
    const response = await fetch(`${API_URL}/movements/getCantLastMonthMovements`);
    const data = await response.json();
    if (data.status === 'error' || !response.ok) {
        throw new Error(data.message || 'Error al obtener la cantidad de movimientos del último mes');
    }
    return data;
};