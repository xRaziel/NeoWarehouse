import { useEffect, useRef, useState } from 'react'
import { obtenerProductos } from '../services/product';
import { obtenerCategorias } from '../services/category';
import { crearProducto } from '../services/product';
import { actualizarProducto } from '../services/product';
import type { Product } from '../types';
import CategoryManager from '../shared/CategoryManager';
import ProductForm from '../shared/ProductForm';

export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  //const didFetchRef = useRef(false);

  async function loadData() {
    setLoading(true);
    try{
        const [productData, categoryData] = await Promise.all([
            obtenerProductos(),
            obtenerCategorias()
        ]);
        if (productData && Array.isArray(productData.data)) {
            setProducts(productData.data);
        }
        if (categoryData && Array.isArray(categoryData.data)) {
            setCategories(categoryData.data);
        }

    }finally { setLoading(false);}
  }
  
  useEffect(() => { loadData(); }, []);

  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [openForm, setOpenForm] = useState(false);

  const filtered = !query ? products : products.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()) || p.category.nombre.toLowerCase().includes(query.toLowerCase()));

  async function save(product: Partial<Product>) {
    if (product.id) {
      // update existing
      await actualizarProducto(product as Product);
    } else {
      // create new
      await crearProducto(product as Omit<Product, "id">);
    }
    await loadData();
    setOpenForm(false);
    setEditing(null);
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Catálogo de productos</h2>
          <div className="flex items-center gap-2">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar..." className="px-3 py-2 rounded border" />
            <button onClick={() => { setEditing(null); setOpenForm(true); }} className="px-3 py-2 bg-indigo-600 text-white rounded">
              Nuevo producto
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs text-gray-500">Nombre</th>
                <th className="px-4 py-3 text-xs text-gray-500">Categoría</th>
                <th className="px-4 py-3 text-xs text-gray-500">Precio</th>
                <th className="px-4 py-3 text-xs text-gray-500">Stock</th>
                <th className="px-4 py-3 text-xs text-gray-500">SKU</th>
                <th className="px-4 py-3 text-xs text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{p.nombre}</td>
                  <td className="px-4 py-3">{p.category.nombre}</td>
                  <td className="px-4 py-3">${p.precio}</td>
                  <td className={`px-4 py-3 ${p.stock <= 10 ? "text-red-600 font-semibold" : ""}`}>{p.stock}</td>
                  <td className="px-4 py-3">{p.sku}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditing(p); setOpenForm(true); }} className="px-2 py-1 border rounded text-sm">
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-fit">
        <h2 className="text-lg font-semibold mb-3">Categorías</h2>
        <CategoryManager categories={categories} onCreate={() => loadData()} />
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6">
            <h3 className="text-lg font-semibold mb-4">{editing ? "Editar producto" : "Nuevo producto"}</h3>
            <ProductForm initial={editing} onCancel={() => { setOpenForm(false); setEditing(null); }} onSave={save} categories={categories} />
          </div>
        </div>
      )}

    </div>
  );
}