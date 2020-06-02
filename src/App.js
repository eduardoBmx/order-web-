import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import Products from "./components/products/products"
import Client from "./components/client/client"
import Order from "./components/order/order"
import MyOrder from "./components/myOrders/myOrders"


function App() {

  return (

    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand">
            Lamour Brigadeiria
            </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/product"} className="nav-link">
                Produtos
                </Link>
            </li>
            <li className="nav-item">
              <Link to={"/client"} className="nav-link">
                Clientes
                </Link>
            </li>
            <li className="nav-item">
              <Link to={"/order"} className="nav-link">
                Pedido
                </Link>
            </li>
            <li className="nav-item">
              <Link to={"/my-orders"} className="nav-link">
                Meus Pedido
                </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>

            <Route exact path="/my-orders" component={MyOrder} />
            <Route exact path="/product" component={Products} />
            <Route exact path="/client" component={Client} />
            <Route exact path="/order" component={Order} />

          </Switch>
        </div>
      </div>
      <div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

