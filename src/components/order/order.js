import React from 'react';
import { OrderProvider } from '../../context/order/orderContext'
import AddClient from './addOrder'
import ListItems from './listItems'

export default function Order() {

    return (

        <OrderProvider>
            <div>
                <AddClient />
                <ListItems />

            </div>
        </OrderProvider>
    )
}