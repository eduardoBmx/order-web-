import React, { createContext, useState, useCallback } from "react";

const OrderContext = createContext()

const OrderProvider = ({ children }) => {

    const [client, setClient] = useState({})
    const [items, setItems] = useState([])


    const newClient = useCallback(value => {
        setClient(value)
    },[])

    const insertItem = useCallback(value => {
        setItems(prevItems => [...prevItems, value])
    }, [])

    const deleteItem = useCallback(value => {
        setItems(items.filter(e => ( e !== value )))
    }, [items])

    return(
        <OrderContext.Provider value={{
            client,
            newClient,
            items,
            insertItem,
            deleteItem
        }}>
            {children}
        </OrderContext.Provider>
    )

}

export {
    OrderContext,
    OrderProvider
}