
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
  category: Category;
}

export interface MovementType {
  id: number;
  tipo: string;
}
export interface Movement {
  id: number;
  cantidad: number;
  fecha: string;
  user: string;
  producto_id: string;
  tipo_movimiento_id: string;
  tipoMovimiento: MovementType;
  producto: Product;
  nota: string;
}



export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
