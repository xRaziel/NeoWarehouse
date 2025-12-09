import React, { useEffect, useState } from 'react'
import type { Movement, Product, MovementType } from '../types';
import { useSnackbar } from '../shared/Snackbar';
import { obtenerMovimientos } from '../services/movement';
import { crearMovimiento } from '../services/movement';
import { obtenerProductos } from '../services/product';
import MovementForm from '../shared/MovementForm';
import { obtenerTiposMovimiento } from '../services/movementType';

function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [movementTypes, setMovementTypes] = useState<MovementType[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showSnackbar } = useSnackbar();

  async function loadData() {
    setLoading(true);
    try {
      // Cargar movimientos y productos en paralelo
      const [movementsData, productsData, movementTypesData] = await Promise.all([
        obtenerMovimientos(),
        obtenerProductos(),
        obtenerTiposMovimiento()
      ]);
      
      if (movementsData && Array.isArray(movementsData.data)) {
        setMovements(movementsData.data);
      }
      
      if (productsData && Array.isArray(productsData.data)) {
        setProducts(productsData.data);
      }

      if (movementTypesData && Array.isArray(movementTypesData.data)) {
        setMovementTypes(movementTypesData.data);
      }
    } catch (error) {
      showSnackbar("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  }

  async function save(movement: Partial<Movement>) {
    try {
      await crearMovimiento(movement as Omit<Movement, "id">);
      showSnackbar("Movimiento creado");
      await loadData();
      setOpenForm(false);
    } catch (error) {
      showSnackbar("Error al crear el movimiento");
    }
  }

  useEffect(() => { loadData(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Historial de movimientos</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpenForm(true)} className="px-3 py-2 bg-indigo-600 text-white rounded">
            Nuevo movimiento
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-xs text-gray-500">Fecha</th>
              <th className="px-4 py-3 text-xs text-gray-500">Producto</th>
              <th className="px-4 py-3 text-xs text-gray-500">Tipo</th>
              <th className="px-4 py-3 text-xs text-gray-500">Cantidad</th>
              <th className="px-4 py-3 text-xs text-gray-500">Nota</th>
            </tr>
          </thead>
          <tbody>
            {movements.map(m => (
              <tr key={m.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{new Date(m.fecha).toLocaleDateString()}</td>
                <td className="px-4 py-3">{m.producto.nombre}</td>
                <td className="px-4 py-3">{m.tipoMovimiento.tipo}</td>
                <td className="px-4 py-3">{m.cantidad === -1 ? 'No aplica' : m.cantidad}</td>
                <td className="px-4 py-3">{m.nota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {openForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Nuevo movimiento</h3>
            <MovementForm
              products={products}
              movementTypes={movementTypes}
              onCancel={() => setOpenForm(false)}
              onSave={save}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MovementsPage