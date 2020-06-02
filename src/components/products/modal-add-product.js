import React, { useState, useContext, useEffect } from "react";
import Modal from '@material-ui/core/Modal';
import ProductDataService from "../../services/product/products-service";
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ProductContext } from '../../context/product/my-products-context'
import { makeStyles } from '@material-ui/core/styles';
import "./addProduct.css"
import { toast } from 'react-toastify';


const listType = [
    { title: "UN" },
    { title: "CX" }
]

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
        backgroundColor: '#C0C0C0',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ModalProduct() {


    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const { openProductM, alterModal, updateProduct, initProducts, newLastPage, pageProduct } = useContext(ProductContext);

    const handleClose = () => {
        alterModal(false);
    };

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [weightType, setWeightType] = useState("")

    useEffect(() => {
        async function loadProduct() {
            
            const newProduct = updateProduct

            if (newProduct.id !== undefined){
                setName(newProduct.name)
                setPrice(newProduct.price)
                setWeightType(newProduct.weightType)
            }
        
        }
        loadProduct()
    }, [updateProduct])

    

    function onTagsChange(event, values) {
        setWeightType(values)
    }


    async function handleSubmit(e) {
        e.preventDefault()

        const data = {
            name: name,
            price: price,
            weightType: weightType
        }

        if (updateProduct.id !== undefined){
            edit(updateProduct.id, data)
        } else {
            create(data)
        }
    }

    function edit(id, data) {
        ProductDataService.edit(id, data).then(response => {

            if (response.status === 200){
                getProducts()
                toast.success("Produto Editado!")
            } else {
                toast.error("Erro ao editar produto!")
            }
        })

        finish()


    }

    function create(data){
        ProductDataService.create(data).then(response => {

            if (response.status === 201){
                getProducts()
                toast.success("Produto Salvo!")
            } else {
                toast.error("Erro ao criar produto!")
            }
        })

        finish()
    }

    function getProducts(){
        
        ProductDataService.getAll(pageProduct).then((data) => {
            initProducts(data.data.content)
            newLastPage(data.data.totalPages)
        })
    }

    function finish() {
        setName('')
        setPrice('')
        setWeightType('')

        handleClose()
    }


    const body = (
        <form onSubmit={handleSubmit} style={modalStyle} className={classes.paper}>
            <div>
                <div className="form-group">
                    <label htmlFor="name">Nome Produto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Preço</label>
                    <input
                        type="number"
                        step=".00"
                        className="form-control"
                        id="price"
                        required
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        name="price"
                    />
                </div>

                <div className="form-group">
                <label htmlFor="price">Tipos</label>
                    <Autocomplete
                        id="free-solo-demo"
                        clearOnEscape
                        options={listType.map((option) => option.title)}
                        value={weightType}
                        onChange={onTagsChange}
                        renderInput={(params) => (
                            <TextField {...params}
                                id='weightType'
                                margin="normal"
                                variant="outlined"
                            />
                        )}
                    />
                </div>

                <button type="submit" className="btn btn-success">Salvar</button>

            </div>
        </form >)

    return (
            <Modal
                open={openProductM}
                onClose={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {body}
            </Modal>
    )

}