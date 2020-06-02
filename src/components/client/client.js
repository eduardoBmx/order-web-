import React from 'react';
import { ClientProvider } from '../../context/client/clientContext';
import AddClient from './addClient'
import ClientModal from './modalAddClient'
import ListClients from './listClient'
import './client.css'

export default function Client() {

    return (
        <ClientProvider>
            <div className="container">
                <AddClient />
                <ListClients />
                <ClientModal />
            </div>
        </ClientProvider>
    )

}
