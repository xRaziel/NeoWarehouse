
export interface Category {
  id: string;
  nombre: string;
}

export interface Product {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  id_externo?: string;
  sku: string;
  category: Category;
}

export interface MovementType {
  id: string;
  tipo: string;
}
export interface Movement {
  id: string;
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
