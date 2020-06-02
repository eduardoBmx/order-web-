import React, { createContext, useState, useCallback } from "react";

const MyOrderContext = createContext()

const MyOrderProvider = ({ children }) => {

    const [orders, setOrders] = useState([])
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([])

    const loadOrders = useCallback(values => {
        setOrders(values)
    },[])

 
    const deleteOrder = useCallback(value => {
        setOrders(orders.filter(e => ( e !== value )))
    }, [orders])
    
    const alterStatus = useCallback(value => {
        setOpen(value)
    },[])

    const loadItems = useCallback(value => {
        setItems(value)
    },[])

    return(
        <MyOrderContext.Provider value={{
            orders,
            loadOrders,
            deleteOrder,
            open,
            alterStatus,
            items,
            loadItems
        }}>
            {children}
        </MyOrderContext.Provider>
    )

}

export {
    MyOrderContext,
    MyOrderProvider
}