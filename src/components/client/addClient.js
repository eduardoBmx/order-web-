import React, { useContext } from "react";
import { ClientContext } from '../../context/client/clientContext'

export default function AddClient() {

    const { modalStatus } = useContext(ClientContext);

    const handleOpen = () => {
        modalStatus(true);
    };


    return (
        <div>
            <button className="btn btn-success" type="button" onClick={handleOpen}>
                Adicionar Cliente
      </button>
        </div>

    );
}