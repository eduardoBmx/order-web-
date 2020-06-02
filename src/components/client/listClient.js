import React, { useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ListClientItem from './listClientItem'
import ClientDataService from '../../services/client/clientService'
import { ClientContext } from '../../context/client/clientContext'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 1500,

    }
}));


export default function ListClients() {
    const classes = useStyles();
    const { loadClients, clients } = useContext(ClientContext);


    useEffect(() => {
        async function loadNewClients() {
        
            ClientDataService.getAll().then((data) => {
                loadClients(data.data.content)
            })
        }
        loadNewClients()
        
    }, [loadClients])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell >Telefone</TableCell>
                            <TableCell>Rua</TableCell>
                            <TableCell>Bairro</TableCell>
                            <TableCell>Cidade</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Numero</TableCell>
                            <TableCell>Cep</TableCell>
                            <TableCell>Complemento</TableCell>
                            <TableCell>Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {clients.map((client) => (

                            <ListClientItem client={client} key={client.id} />
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}