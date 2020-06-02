import React, { useContext } from "react";
import SelectClient from './selectClient'
import AddItem from './addItem'
import './order.css'
import { OrderContext } from '../../context/order/orderContext'
import {toast} from 'react-toastify'
import OrderDataService from '../../services/order/orderService'


export default function AddClient() {

    const { items, client } = useContext(OrderContext)

    function getTotalOrder() {

        let total = 0

        items.forEach(element => {
            total += (element.product.price * element.quantity) 
        });

        return total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }



    function handleSubmit() {

        if (client === "" || items === []){
            toast.error("Há campos a serem preenchidos!")
        } else {

            const data = {

                clientId: client.id,
                productItems: items.map(function(element) {
                    return {
                        id: element.product.id,
                        quantity: element.quantity
                    }
                  })
            }

            OrderDataService.create(data).then(response => {

                if (response.status === 201) {
                    toast.success("Pedido gerado!")
                } else {
                    toast.error("Erro ao gerar pedido!")
                }
            })
        }
    }

    return (

        <div className="divGeral">
            <div className="divOrderEsq">

                <SelectClient />
                <AddItem />

            </div>

            <div className="divBtnSubmit">
    
                <button onClick={handleSubmit} className="btn btn-success">Gerar Pedido</button>

                <div>
                    <label>Total Pedido: {getTotalOrder()}</label>
                </div>

            </div>
        </div>

    );
}