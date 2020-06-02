import React, { useContext } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { ClientContext } from '../../context/client/clientContext'
import ClientDataService from '../../services/client/clientService'

export default function ListClientItem({ client }, { key }) {

    const { loadClients, modalStatus, editClient } = useContext(ClientContext);

    async function deleteHandle(event, client) {
        event.preventDefault()


        let confirm = window.confirm("Deseja excluir " + client.name + "?")

        if (confirm === true) {
            ClientDataService.delete(client.id).then((data) => {
                
                if (data.status === 204) {
                    alert("Exluido com sucesso!")
                    getClients()
                } else {
                    alert("Error to delete client!")
                }

            })
        }
    }


    async function getClients(){
        ClientDataService.getAll().then((response) => {
            loadClients(response.data.content)
        })
    }

    async function onEdit(event, client) {
        event.preventDefault()
        
        editClient(client)

        modalStatus(true)
    }

    return (
        <TableRow key={key}>
            <TableCell component="th" scope="row">
                {client.name}
            </TableCell>
            <TableCell >{client.email}</TableCell>
            <TableCell >{client.phoneNumber}</TableCell>
            <TableCell >{client.address.street}</TableCell>
            <TableCell >{client.address.district}</TableCell>
            <TableCell >{client.address.city}</TableCell>
            <TableCell >{client.address.state}</TableCell>
            <TableCell >{client.address.number}</TableCell>
            <TableCell >{client.address.cep}</TableCell>
            <TableCell >{client.address.complement}</TableCell>
            <TableCell align='center'>
                <Button onClick={(e) => { deleteHandle(e, client) }} startIcon={<DeleteIcon />}>Excluir</Button>
                <Button onClick={(e) => { onEdit(e, client) }} startIcon={<EditIcon />}>Editar</Button>
            </TableCell>
        </TableRow>
    );
}