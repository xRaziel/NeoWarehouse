import React, { useEffect, useRef, useState } from 'react'
import { obtenerProductos } from '../services/product';
import type { Product } from '../types';

function ProductsPage() {
  const [productos, setProductos] = useState<Product[]>([]);
    const didFetchRef = useRef(false);

    useEffect(() => {
        if (didFetchRef.current) return;
        didFetchRef.current = true;

        const fetchProductos = async () => {
        const data = await obtenerProductos();

        if (data && Array.isArray(data.data)) {
            setProductos(data.data);
        }
        };
        

        fetchProductos();
    }, []);

  return (
    <div>
    </div>
  )
}

export default ProductsPage