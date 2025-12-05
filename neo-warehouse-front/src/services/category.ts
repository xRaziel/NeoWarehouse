import { API_URL } from "../config/api";

export const obtenerCategorias = async () => {
  const response = await fetch(`${API_URL}/category/getAllCategories`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener las categorías');
  }
  return data;
};

export const crearCategoria = async (nombre: string) => {
  const response = await fetch(`${API_URL}/category/createCategory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre }),
  });
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Error al crear la categoría');
  }
  return data.data;
};