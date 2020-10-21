import React, { useState, useEffect } from 'react';
import { IProduct } from '../store/modules/cart/types';
import api from '../services/api';

const Catalog: React.FC = () => {
    const [catalog, setCatalog] = useState<IProduct[]>([]);

    useEffect(() => {
        api.get('products').then(response => {
            setCatalog(response.data);
        })
    }, []);

    return (
        <main>
            <h1>Catalog</h1>

            {catalog.map(product => (
                <article key={product.id}>
                    <strong>{product.title}</strong> {" - "}
                    <strong>{product.price}</strong> {"   "}

                    <button type="button">Purchase</button>
                </article>
            ))}
        </main>
    );
}

export default Catalog;