import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function ListItemsItem({ item }, { key }) {

    function moeda(item){
    

        return item.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }

    return (
        <TableRow key={key}>
            <TableCell >{item.product.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.product.price}</TableCell>
            <TableCell>{moeda(item)}</TableCell>
        </TableRow>
    )
}