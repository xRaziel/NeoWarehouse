import { API_URL } from "../config/api";

export const obtenerProductos = async () => {
  const response = await fetch(`${API_URL}/product/getAllProducts`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener los productos');
  }
  return data;
};