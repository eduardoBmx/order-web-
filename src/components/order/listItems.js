import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { OrderContext } from '../../context/order/orderContext'
import ListItemsItem from './listItemsItem'

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    }
}));

export default function ListItems() {
    const classes = useStyles();
    const {items} = useContext(OrderContext)


    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome do Produto</TableCell>
                            <TableCell>Preço Unitario</TableCell>
                            <TableCell>Quantidade</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {items.map((item) => (

                            <ListItemsItem item={item} key={item.product.id} />
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}