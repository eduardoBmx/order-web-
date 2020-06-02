import React, { useState, useContext } from "react";
import Modal from '@material-ui/core/Modal';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { MyOrderContext } from '../../context/myOrder/myOrderContext'
import { makeStyles } from '@material-ui/core/styles';
import ListItemsItem from './listItemsItem'

function rand() {
    return Math.round(Math.random() * 15);
}

function getModalStyle() {
    const top = 5 + rand();
    const left = 5 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '50%',
        backgroundColor: '#F8F8FF',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ModalItems() {


    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const { alterStatus, open, items, loadItems } = useContext(MyOrderContext)


    const handleClose = () => {
        alterStatus(false);
        loadItems([])
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome do Produto</TableCell>
                            <TableCell>Quantidade</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {items.map((item) => (
                            <ListItemsItem item={item} key={item.id}/>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered="true"

        >
            {body}
        </Modal>
    )

}