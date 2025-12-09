import React, { useState } from 'react';
import type { Movement, Product, MovementType } from '../types';

type Props = {
  products: Product[];
  movementTypes: MovementType[];
  onSave: (movement: Partial<Movement>) => void;
  onCancel: () => void;
};

export default function MovementForm({ products = [], movementTypes = [], onSave, onCancel }: Props) {
  const [cantidad, setCantidad] = useState<number | ''>('');
  const [productoId, setProductoId] = useState<string | null>(null);
  const [tipoMovimientoId, setTipoMovimientoId] = useState<string | null>(null);
  const [nota, setNota] = useState('');
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  function validate() {
    const err: { [k: string]: string } = {};
    if (cantidad === '' || cantidad === null || Number.isNaN(Number(cantidad)) || Number(cantidad) <= 0) {
      err.cantidad = 'La cantidad debe ser mayor a 0';
    }
    if (productoId == null) err.producto = 'Debes seleccionar un producto';
    if (tipoMovimientoId == null) err.tipoMovimiento = 'Debes seleccionar un tipo de movimiento';
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!validate()) return;

    const payload: Partial<Movement> = {
      cantidad: Number(cantidad),
      producto_id: productoId!,
      tipo_movimiento_id: tipoMovimientoId!,
      nota: nota.trim(),
      fecha: new Date().toISOString(),
      user: 'Usuario actual', // TODO: Reemplazar con usuario real
    };

    onSave(payload);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Producto</label>
        <select
          value={productoId ?? ''}
          onChange={e => {
            const v = e.target.value;
            if (v === '') return setProductoId(null);
            setProductoId(v);
          }}
          className={`w-full p-2 border rounded ${errors.producto ? 'border-red-500' : ''}`}>
          <option value="">-- Selecciona producto --</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre} (Stock: {p.stock})
            </option>
          ))}
        </select>
        {errors.producto && <div className="text-xs text-red-600 mt-1">{errors.producto}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tipo de movimiento</label>
      <select
        value={tipoMovimientoId ?? ''}
        onChange={e => {
          const v = e.target.value;
          if (v === '') return setTipoMovimientoId(null);
          setTipoMovimientoId(v);
        }}
        className={`w-full p-2 border rounded ${errors.tipoMovimiento ? 'border-red-500' : ''}`}>
        <option value="">-- Selecciona tipo --</option>
        {movementTypes.map(t => (
          <option key={t.id} value={t.id}>
            {t.tipo}{t.tipo === 'Ajuste' ? ' (Ingrese nuevo stock en cantidad)' : ''}
          </option>
        ))}
      </select>
        {errors.tipoMovimiento && <div className="text-xs text-red-600 mt-1">{errors.tipoMovimiento}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cantidad</label>
        <input
          type="number"
          value={cantidad as any}
          onChange={e => setCantidad(e.target.value === '' ? '' : Number(e.target.value))}
          className={`w-full p-2 border rounded ${errors.cantidad ? 'border-red-500' : ''}`}
        />
        {errors.cantidad && <div className="text-xs text-red-600 mt-1">{errors.cantidad}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nota</label>
        <textarea
          value={nota}
          onChange={e => setNota(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Ingresa una nota opcional..."
        />
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded hover:bg-gray-100">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Guardar
        </button>
      </div>
    </form>
  );
}