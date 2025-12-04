
export interface Category {
  id: number;
  nombre: string;
}

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  id_externo?: string;
  sku: string;
  categoria_id?: number;
}

export interface Movement {
  id: number;
  cantidad: number;
  fecha: string;
  user: string;
  producto_id: number;
  tipo_movimiento_id: number;
}

export interface MovementType {
  id: number;
  nombre: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
