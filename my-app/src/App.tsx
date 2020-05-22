import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Container from './components/container/Container';
import AddProduct from "./components/add-product/AddProduct";
import OrderConfirmation from "./components/order-card/OrderConfirmation";

function App() {
  return (<>
      <AddProduct visible={false}/>
      <Container/>
    </>
  );
}

export default App;
