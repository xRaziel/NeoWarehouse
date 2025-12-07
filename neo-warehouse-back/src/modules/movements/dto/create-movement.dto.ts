export class CreateMovementDto {
    readonly productId: string;
    readonly quantity: number;
    readonly type: string;
    readonly date: Date;
    readonly note?: string;
}
