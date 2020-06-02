import React, {useContext} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { ProductContext } from '../../context/product/my-products-context'
import ProductDataService from '../../services/product/products-service'
import { toast } from 'react-toastify';

export default function ListProductItem({ product }, { key }) {

    const { deleteProduct, productToEdit, alterModal, pageProduct, initProducts, newLastPage } = useContext(ProductContext);

    async function deleteProductHandle(event, product) {
        event.preventDefault()
        
        
        let confirm = window.confirm("Deseja excluir " + product.name + "?")

        if (confirm === true){
        ProductDataService.delete(product.id).then((data) => {

            if (data.status === 204){
                deleteProduct(product)
                getProducts(pageProduct)
                toast.success("Produto deletado!")
            } else {
                alert("Error to delete product!")
                toast.error("Erro ao deleta o produto!")
            }
            
        })
    }
        
    }

    async function getProducts(page){
        ProductDataService.getAll(page).then((data) => {
            initProducts(data.data.content)
            newLastPage(data.data.totalPages)
        })
    }

    async function onEdit(event, product) {
        event.preventDefault()
        productToEdit(product)
        alterModal(true)
        
    }

    return (
        <TableRow key={key}>
            <TableCell component="th" scope="row">
                {product.name}
            </TableCell>
            <TableCell align="right">{product.price}</TableCell>
            <TableCell align="right">{product.weightType}</TableCell>
            <TableCell align='center'>
            <Button onClick={(e)=> {deleteProductHandle(e, product)}} startIcon={<DeleteIcon />}>Excluir</Button>
            <Button onClick={(e)=> {onEdit(e, product)}} startIcon={<EditIcon />}>Editar</Button>
            </TableCell>
        </TableRow>
    );
}