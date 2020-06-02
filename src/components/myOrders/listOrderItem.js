import React, { useContext } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import { MyOrderContext } from '../../context/myOrder/myOrderContext'
import OrderDataService from '../../services/order/orderService'
import './myOrder.css'

export default function ListOrderItem({ order }, { key }) {

    const { deleteOrder, alterStatus, loadItems } = useContext(MyOrderContext)


    function moeda(order) {
        return order.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }

    async function onDelete(e, order) {

        OrderDataService.delete(order.id).then(response => {
            deleteOrder(order)
            toast.success("Pedido deletado!")
        })


        deleteOrder(order)
        toast.success("Pedido deletado!")
    }

    function openModal(event){
        event.preventDefault()
        alterStatus(true)
        loadItems(order.items)
    }

    return (
        <TableRow key={key}>
            <TableCell component="th" scope="row">
                {order.id}
            </TableCell>
            <TableCell>{order.client.name}</TableCell>
            <TableCell>{moeda(order)}</TableCell>
            <TableCell>
                <button onClick={(e) => {openModal(e)}} className="butttonItem">Items</button>
            </TableCell>
            <TableCell align='center'>
                <Button onClick={(e) => { onDelete(e, order) }} startIcon={<DeleteIcon />}>Excluir</Button>
            </TableCell>
        </TableRow>
    );


}