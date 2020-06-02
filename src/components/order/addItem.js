import React, { useState, useEffect, useContext } from "react";
import ProductDataSerivce from '../../services/product/products-service'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import { OrderContext } from '../../context/order/orderContext'
import './order.css'
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '50%',
    },
}));

export default function AddItem() {

    const classes = useStyles();
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState("")
    const [quantity, setQuantity] = useState("")
    const { insertItem } = useContext(OrderContext)


    useEffect(() => {
        async function loadProducts() {
            ProductDataSerivce.getAll().then((response) => {
                setProducts(response.data.content)
            })

        }

        loadProducts()
    }, [setProducts])

    const handleChange = (event) => {

        setProduct(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    function handleSubmit() {

        if (product !== "" && quantity !== ""){

        toast.success('Item adicionado', {
            position: toast.POSITION.TOP_RIGHT
        })

        const data = {
            product: product,
            quantity: quantity
        }

        insertItem(data)
        setQuantity("")
        setProduct("")
    } else{

        toast.error("Há campos sem preencher!")

    }


    }


    return (
        <div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Produto</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={product}
                        onChange={handleChange}
                    >

                        {products.map((prod) => (

                            <MenuItem key={prod.id} value={prod}>{prod.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="divEsq">
                <TextField
                    id="standard-basic"
                    label="Quantidade"
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />

            </div>
            <div className="divDir">
                <button onClick={handleSubmit} className="butttonItem">Adicionar Item</button>
            </div>

        </div>
    )

}