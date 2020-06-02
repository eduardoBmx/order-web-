import React, { useState, useContext, useEffect } from "react";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { ClientContext } from '../../context/client/clientContext'
import ClientDataService from '../../services/client/clientService'
import './client.css'


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
        width: '30%',
        backgroundColor: '#C0C0C0',
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 2, 1),
    },
}));

export default function ClientModal() {

    const { modalStatus, openModalClient, loadClients, updateClient } = useContext(ClientContext)
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [street, setStreet] = useState("")
    const [district, setDistrict] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [number, setNumber] = useState("")
    const [cep, setCep] = useState("")
    const [complement, setComplement] = useState("")

    function finish() {
        setName("")
        setEmail("")
        setPhoneNumber("")
        setStreet("")
        setDistrict("")
        setCity("")
        setState("")
        setNumber("")
        setCep("")
        setComplement("")
    }

    useEffect(() => {
        async function loadProduct() {

            const newClient = updateClient

            if (newClient.id !== undefined) {
                setName(updateClient.name)
                setEmail(updateClient.email)
                setPhoneNumber(updateClient.phoneNumber)
                setStreet(updateClient.address.street)
                setDistrict(updateClient.address.district)
                setCity(updateClient.address.city)
                setState(updateClient.address.state)
                setNumber(updateClient.address.number)
                setCep(updateClient.address.cep)
                setComplement(updateClient.address.complement)
            }
        }
        loadProduct()
    }, [updateClient])

    const handleClose = () => {
        modalStatus(false);
    };

    async function handleSubmit(e) {
        e.preventDefault()

        const data = {
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            address: {
                street: street,
                district: district,
                city: city,
                state: state,
                number: number,
                cep: cep,
                complement: complement
            }
        }

        if (updateClient.id === undefined) {
            create(data)
        } else {
            edit(data)
        }

    }

    async function loadClient() {
        ClientDataService.getAll().then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                loadClients(response.data.content)
            } else {
                alert("Erro ao buscar os clientes!")
            }
        })
    }

    async function edit(data) {
        ClientDataService.edit(updateClient.id, data).then((response) => {
            if (response.status === 200) {
                alert("Editado com sucesso!")
                loadClient()
            } else {
                alert("Erro ao editar!")
            }
        })
    }

    async function create(data) {
        ClientDataService.create(data).then((response) => {
            if (response.status === 201) {
                loadClient()
                alert("criado com sucesso!")
            } else {
                alert("Erro ao criar cliente!")
            }
        })

        finish()
    }

    const body = (
        <form onSubmit={handleSubmit} style={modalStyle} className={classes.paper}>
            <div className="divForm">
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Telefone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        required
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        name="phoneNumber"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="street">Rua</label>
                    <input
                        type="text"
                        className="form-control"
                        id="street"
                        required
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                        name="street"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="district">Bairro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="district"
                        required
                        value={district}
                        onChange={e => setDistrict(e.target.value)}
                        name="district"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        required
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        name="city"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="state">Estado</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        required
                        value={state}
                        onChange={e => setState(e.target.value)}
                        name="state"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="number">Numero</label>
                    <input
                        type="text"
                        className="form-control"
                        id="number"
                        required
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        name="number"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cep">Cep</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cep"
                        required
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                        name="cep"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="complement">Complemento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="complement"
                        required
                        value={complement}
                        onChange={e => setComplement(e.target.value)}
                        name="complement"
                    />
                </div>

                <button type="submit" className="btn btn-success">Salvar</button>

            </div>
        </form >)

    return (
        <Modal
            open={openModalClient}
            onClose={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {body}
        </Modal>
    )

}