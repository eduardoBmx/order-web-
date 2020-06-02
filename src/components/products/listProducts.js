import React, { useContext, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ListProductItem from './listProductItem'
import ProductDataService from '../../services/product/products-service'
import { ProductContext } from '../../context/product/my-products-context'
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export default function ListProducts() {
    const classes = useStyles();
    const { products, initProducts, newPage, newLastPage, lastPageProduct} = useContext(ProductContext);


    const handleChange = (event, value) => {
   
        newPage(value)

        getProducts(value)

      };

    async function getProducts(page){
        
        ProductDataService.getAll(page).then((data) => {
            initProducts(data.data.content)
            newLastPage(data.data.totalPages)
        })
    }

    useEffect(() => {
        async function loadProducts() {
        
            ProductDataService.getAll().then((data) => {
                initProducts(data.data.content)
                newLastPage(data.data.totalPages)
                
            })
        }
        loadProducts()
        // eslint-disable-next-line
    }, [initProducts])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome do Produto</TableCell>
                            <TableCell align="right">Preço</TableCell>
                            <TableCell align="right">Unidade Medida</TableCell>
                            <TableCell align='center'>Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {products.map((product) => (

                            <ListProductItem product={product} key={product.id} />
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.root}>
                <Pagination count={lastPageProduct} color="secondary" onChange={handleChange} />
            </div>
        </div>
    )
}