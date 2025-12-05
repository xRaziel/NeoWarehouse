import { API_URL } from "../config/api";
import type { Product } from "../types";

export const obtenerProductos = async () => {
  const response = await fetch(`${API_URL}/product/getAllProducts`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener los productos');
  }
  return data;
};

export const crearProducto = async (producto: Omit<Product, "id">) => {
  
  const response = await fetch(`${API_URL}/product/createProduct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al crear el producto');
  }
  return data;
};

export const actualizarProducto = async (producto: Product) => {
  const response = await fetch(`${API_URL}/product/updateProduct`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al actualizar el producto');
  }
  return data;
};