import React, { useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { MyOrderContext } from '../../context/myOrder/myOrderContext'
import OrderDataService from '../../services/order/orderService'
import ListOrderItem from './listOrderItem'

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    }
}));

export default function ListOrders() {

    const classes = useStyles();
    const {orders, loadOrders} = useContext(MyOrderContext)

    useEffect(() => {
        async function load() {
        
            OrderDataService.getAll().then((data) => {
                loadOrders(data.data.content)
                
            })
        }
        load()
        
    }, [loadOrders])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nome Cliente</TableCell>
                            <TableCell>Preço Total</TableCell>
                            <TableCell>Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {orders.map((order) => (

                            <ListOrderItem order={order} key={order.id} />
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}