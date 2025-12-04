import React, { useState } from 'react'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import MovementsPage from './pages/MovementsPage'

function App() {
  const [route, setRoute] = useState<"dashboard" | "products"  | "movements">("dashboard")

  return (
    <div className="min-h-screen font-sans">
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">NeoWarehouse</div>
          </div>

          <nav className="flex items-center gap-3">
            <button onClick={() => setRoute("dashboard")} className={`px-3 py-2 rounded ${route === "dashboard" ? "bg-slate-100" : "hover:bg-slate-50"}`}>
              Dashboard
            </button>
            <button onClick={() => setRoute("products")} className={`px-3 py-2 rounded ${route === "products" ? "bg-slate-100" : "hover:bg-slate-50"}`}>
              Productos
            </button>
            <button onClick={() => setRoute("movements")} className={`px-3 py-2 rounded ${route === "movements" ? "bg-slate-100" : "hover:bg-slate-50"}`}>
              Movimientos
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {route === "dashboard" && <DashboardPage />}
        {route === "products" && <ProductsPage />}
        {route === "movements" && <MovementsPage />}
      </main>
    </div>
  );
}

export default App
