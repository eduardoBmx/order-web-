import React, { createContext, useState, useCallback } from "react";


const ProductContext = createContext()

const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [openProductM, setOpenProductM] = useState(false)
    const [pageProduct, setPageProduct] = useState(1)
    const [ lastPageProduct, setlastPageProduct ] = useState(1)
    const [updateProduct, setUpdateProduct] = useState({})

    const alterModal = useCallback(open => {
        setOpenProductM(open)
    }, [])

    const initProducts = useCallback(newProducts => {
        setProducts(newProducts)
    }, [])

    const saveProduct = useCallback(product => {
        setProducts(previousProducts => [...previousProducts, product])
    }, [])

    const deleteProduct = useCallback(product => {
        setProducts(products.slice(products.indexOf(product)))
    }, [products])

    const newPage = useCallback(page => {
        setPageProduct(page)
    }, [])

    const newLastPage = useCallback(last => {
        setlastPageProduct(last)
    }, [])

    const productToEdit = useCallback(product => {
        console.log(product)
        setUpdateProduct(product)
    }, [])
    

    return (
        <ProductContext.Provider value={{
            products,
            saveProduct,
            initProducts,
            openProductM,
            alterModal,
            deleteProduct,
            newPage,
            pageProduct,
            newLastPage,
            lastPageProduct,
            productToEdit,
            updateProduct
        }}>
            {children}
        </ProductContext.Provider>
    )
}


export {
    ProductContext,
    ProductProvider
}