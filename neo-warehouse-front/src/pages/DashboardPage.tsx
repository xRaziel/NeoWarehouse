import React, { useEffect, useState } from "react";
import { Database, Box, ListChecks } from "lucide-react";
import SmallStat from "../shared/SmallStats";
import {getCantProductos} from "../services/product";
import {getStockTotal} from "../services/product";
import {getCantUltimoMesMovimientos} from "../services/movement";
import { obtenerProductos } from "../services/product";
import { obtenerMovimientos } from "../services/movement";
import type { Movement, Product } from "../types";

export default function DashboardPage() {
  const [cantProducts, setCantProducts] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [lastMovements, setLastMovements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);

  async function loadData() {
    setLoading(true);
    try {
      const [productsData, stockData, movementsData, productsList, movementsList] = await Promise.all([
        getCantProductos(),
        getStockTotal(),
        getCantUltimoMesMovimientos(),
        obtenerProductos(),
        obtenerMovimientos()
      ]);
      setCantProducts(productsData.data.count);
      setTotalStock(stockData.data.totalStock);
      setLastMovements(movementsData.data);
      if (productsList && Array.isArray(productsList.data)) {
        setProducts(productsList.data);
      }
      if (movementsList && Array.isArray(movementsList.data)) {
        setMovements(movementsList.data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  const lowStock = products.filter(p => p.stock <= 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SmallStat title="Productos" value={cantProducts} icon={<Box size={20} />} />
        <SmallStat title="Stock total" value={totalStock} icon={<Database size={20} />} />
        <SmallStat title="Movimientos (30d)" value={lastMovements} icon={<ListChecks size={20} />} />
      </div>

       <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-3">Sugerencias de reabastecimiento</h3>
          {lowStock.length === 0 ? (
            <div className="text-sm text-gray-500">Todo OK</div>
          ) : (
            <ul className="space-y-2">
              {lowStock.map(p => (
                <li key={p.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <div className="font-medium">{p.nombre}</div>
                    <div className="text-xs text-gray-500">Stock: {p.stock}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-3">Últimos movimientos</h3>
          <div className="space-y-2">
            {movements.slice(0, 6).map(m => (
              <div key={m.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div>
                  <div className="font-medium">{(products.find(p => p.id === m.producto_id) || {}).nombre} · {m.tipoMovimiento.tipo}</div>
                  <div className="text-xs text-gray-500">{new Date(m.fecha).toLocaleDateString()}</div>
                </div>
                <div className="text-sm text-gray-500">{m.nota.length === 0 ? '-' : m.nota}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

    
  );
}
