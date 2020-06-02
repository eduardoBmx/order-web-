import React, { useContext } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { OrderContext } from '../../context/order/orderContext'
import {toast} from 'react-toastify'

export default function ListProductItem({ item }, { key }) {

    const { deleteItem } = useContext(OrderContext)

    function onDelete(e, item){

        deleteItem(item)
        toast.success("Item removido do pedido!")
    }

    function moeda(value){
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }

    return (

        <TableRow key={key}>
            <TableCell component="th" scope="row">
                {item.product.name}
            </TableCell>
            <TableCell>{moeda(item.product.price)}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{moeda(item.quantity * item.product.price)}</TableCell>
            <TableCell>
                <Button onClick={(e) => { onDelete (e, item) }} startIcon={<DeleteIcon />}>Excluir</Button>
            </TableCell>
        </TableRow>

    )

}