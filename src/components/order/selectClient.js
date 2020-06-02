import React, { useState, useEffect, useContext } from "react";
import ClientDataService from '../../services/client/clientService'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {OrderContext} from '../../context/order/orderContext'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '50%',
    },
}));


export default function SelectClient() {

    const classes = useStyles();
    const [listType, setListType] = useState([])
    const [open, setOpen] = useState(false)
    const {newClient, client} = useContext(OrderContext)


    useEffect(() => {
        async function loadClient() {
            ClientDataService.select().then((response) => {
                setListType(response.data)
            })

        }

        loadClient()
    }, [setListType])

    const handleChange = (event) => {
        newClient(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Cliente</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={client}
                    onChange={handleChange}
                >

                    {listType.map((clientSel) => (

                        <MenuItem key={clientSel.id} value={clientSel}>{clientSel.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )

}