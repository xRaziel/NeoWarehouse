
export class CreateMovementDto {
    cantidad?: number;
    fecha: Date;
    nota: string;
    producto_id: string;
    tipo_movimiento_id: string;
    user: string;
}