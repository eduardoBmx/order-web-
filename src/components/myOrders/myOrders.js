import React from 'react'
import {MyOrderProvider} from '../../context/myOrder/myOrderContext'
import ListOrders from './listOrders'
import ModalItems from './modalItems'

export default function MyOrder(){

    return(

        <MyOrderProvider>
            <ListOrders />
            <ModalItems />
        </MyOrderProvider>

    )

}

