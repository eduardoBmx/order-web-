import React, { useContext } from "react";
import { ProductContext } from '../../context/product/my-products-context'

export default function AddProduct() {

    const { alterModal } = useContext(ProductContext);

    const handleOpen = () => {
        alterModal(true);
    };


    return (
        <div>
            <button className="btn btn-success" type="button" onClick={handleOpen}>
                Adicionar Produto
      </button>
        </div>

    );
}