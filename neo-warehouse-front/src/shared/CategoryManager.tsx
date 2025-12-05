import React, { useEffect, useState } from "react";
import type { Category } from "../types";
import { crearCategoria } from "../services/category";

type Props = {
  categories?: Category[];
  onCreate?: (category: Category) => void;
};

export default function CategoryManager({ categories = [], onCreate }: Props) {
  const [list, setList] = useState<Category[]>(categories);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setList(categories);
  }, [categories]);

  async function add() {
    if (!name.trim()) return;
    const newCategory = await crearCategoria(name.trim());
    if(newCategory && newCategory.id){
      setList(prev => [...prev, newCategory]);
      if (onCreate) onCreate(newCategory);
    }
    setName("");
    setOpen(false);
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Categorías del sistema</span>
          <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
            Nueva
          </button>
        </div>

        <div className="space-y-2">
          {list.map(c => (
            <div key={c.id} className="p-2 bg-gray-50 rounded flex justify-between">
              <div>{c.nombre}</div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}} className="fixed inset-0 flex items-center justify-center z-50">          {/* Modal box */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Nueva Categoría</h2>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full p-2 border rounded mb-4" 
              placeholder="Nombre de categoría"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button 
                className="px-4 py-2 border rounded hover:bg-gray-100" 
                onClick={() => {
                  setOpen(false);
                  setName("");
                }}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
                onClick={add}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
