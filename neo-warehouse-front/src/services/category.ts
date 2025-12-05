import { API_URL } from "../config/api";

export const obtenerCategorias = async () => {
  const response = await fetch(`${API_URL}/category/getAllCategories`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener las categorías');
  }
  return data;
};

