import React from 'react'
import { ProductProvider } from '../../context/product/my-products-context'
import AddProduct from './add-product'
import ListProduct from './listProducts'
import ModalProduct from './modal-add-product'
import './addProduct.css'

export default function Products() {
    return (
        <ProductProvider>

            <div className="containerProduct">
                <AddProduct />
                <ListProduct />
                <ModalProduct />
            </div>

        </ProductProvider>

    )
}

