import React, { useEffect, useState } from 'react';
import type { Category, Product } from '../types';

type Props = {
  initial?: Product | null;
  categories: Category[];
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
};

export default function ProductForm({ initial = null, categories = [], onSave, onCancel }: Props) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState<number | ''>('');
  const [sku, setSku] = useState('');
  const [categoriaId, setCategoriaId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    if (!initial) {
      setNombre('');
      setPrecio('');
      setSku('');
      setCategoriaId(null);
      setErrors({});
      return;
    }

    // populate with initial product data for editing
    setNombre(initial.nombre ?? '');
    setPrecio(initial.precio ?? '');
    setSku(initial.sku ?? '');
    // products from API include `category` object but not `categoria_id` — use category.id when present
    const maybeId = initial.category?.id ?? null;
    setCategoriaId(maybeId !== null ? String(maybeId) : null);
    setErrors({});
  }, [initial]);

  function validate() {
    const err: { [k: string]: string } = {};
    if (!nombre.trim()) err.nombre = 'El nombre es obligatorio';
    if (precio === '' || precio === null || Number.isNaN(Number(precio))) err.precio = 'Precio inválido';
    if (!sku.trim()) err.sku = 'SKU es obligatorio';
    if (categoriaId == null) err.category = 'Debes seleccionar una categoría';
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!validate()) return;

    const selectedCategory = categories.find(c => String(c.id) === categoriaId) ?? null;

    const payload: Partial<Product> = {
      ...(initial?.id ? { id: initial.id } : {}),
      nombre: nombre.trim(),
      precio: Number(precio),
      sku: sku.trim(),
      category: selectedCategory as Category | undefined,
    };

    onSave(payload);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input value={nombre} onChange={e => setNombre(e.target.value)} className={`w-full p-2 border rounded ${errors.nombre ? 'border-red-500' : ''}`} />
        {errors.nombre && <div className="text-xs text-red-600 mt-1">{errors.nombre}</div>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Precio</label>
          <input type="number" step="0.01" value={precio as any} onChange={e => setPrecio(e.target.value === '' ? '' : Number(e.target.value))} className={`w-full p-2 border rounded ${errors.precio ? 'border-red-500' : ''}`} />
          {errors.precio && <div className="text-xs text-red-600 mt-1">{errors.precio}</div>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">SKU</label>
        <input value={sku} onChange={e => setSku(e.target.value)} className={`w-full p-2 border rounded ${errors.sku ? 'border-red-500' : ''}`} />
        {errors.sku && <div className="text-xs text-red-600 mt-1">{errors.sku}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Categoría</label>
        <select
          value={categoriaId ?? ''}
          onChange={e => {
            const v = e.target.value;
            
            if (v === '') return setCategoriaId(null);

            setCategoriaId(v);
          }}
          className={`w-full p-2 border rounded ${errors.category ? 'border-red-500' : ''}`}>
          <option value="">-- Selecciona categoría --</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
        {errors.category && <div className="text-xs text-red-600 mt-1">{errors.category}</div>}
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded hover:bg-gray-100">Cancelar</button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Guardar</button>
      </div>
    </form>
  );
}
