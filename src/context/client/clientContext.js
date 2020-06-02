import React, { createContext, useState, useCallback } from "react";

const ClientContext = createContext()

const ClientProvider = ({ children }) => {

    const [clients, setClients] = useState([])
    const [openModalClient, setOpenModalClient] = useState(false)
    const [updateClient, setUpdateCliente] = useState({})

    const loadClients = useCallback(clients => {
        setClients(clients)
    }, [])

    const modalStatus = useCallback(value => {
        
        setOpenModalClient(value)
    }, [])

    const editClient = useCallback(client => {
        setUpdateCliente(client)
    }, [])

    return (
        <ClientContext.Provider value={{
            clients,
            loadClients,
            modalStatus,
            openModalClient,
            editClient,
            updateClient
        }}>
            {children}
        </ClientContext.Provider>
    )
}

export {
    ClientContext,
    ClientProvider
}