import React, {useEffect, useState} from "react";
import ProductCard, {ProductCardProps} from "../product-card/ProductCard";
import OrderCard, {OrderUnit} from "../order-card/OrderCard";
import './style.css';
import axios from 'axios';
import AddProduct from "../add-product/AddProduct";

enum CounterOperation {PLUS, MINUS}

export default function Container(props: any) {

  const [products, setProducts] = useState<ProductCardProps[]>(
    [
      {
        title: "Burger",
        quantity: 1,
        price: 8.50,
        imgUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
      },
      {
        title: "Pizza",
        quantity: 1,
        price: 10.75,
        imgUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&w=1000&q=80"
      },
      {
        title: "Chicken",
        quantity: 1,
        price: 18.50,
        imgUrl: "https://images.pexels.com/photos/265393/pexels-photo-265393.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
    ])
  const [orderCardItems, setOrderCardItems] = useState<OrderUnit[]>([]);

  useEffect(() => {
    // get products from server...
    axios.get("http://localhost:8080/get-products").then(res => {
      // setProducts([])
      setProducts(res.data.map((it: any) => it as ProductCardProps))
    }).catch(err => console.log(err));


    const ws = new WebSocket('ws://localhost:8081/');

    ws.onmessage = function (message) {
      console.log(message.data);
      const data = JSON.parse(message.data);
      setProducts(data.map((it: any) => it as ProductCardProps));
    };


  }, []);

  function handleProductPlusMinus(title: string, operation: CounterOperation) {
    let bak: OrderUnit[] = orderCardItems.filter(it => it.title !== title);
    let upd: OrderUnit[] = orderCardItems.filter(it => it.title === title).map(it => {
      if (it.numberOfPcsOrdered == 1 && operation === CounterOperation.MINUS) return it;
      return {
        numberOfPcsOrdered: operation === CounterOperation.PLUS ? it.numberOfPcsOrdered + 1 : it.numberOfPcsOrdered - 1,
        totalPrice: operation === CounterOperation.PLUS ? it.totalPrice + it.unitPrice : it.totalPrice - it.unitPrice,
        unitPrice: it.unitPrice,
        title: it.title,
        imgUrl: it.imgUrl,
        quantity: it.quantity
      }
    });
    setOrderCardItems(upd.concat(bak))
  }

  const [showAddProduct, setShowAddProduct] = useState(false);
  return (<div>
    <div className="cr_header d-flex justify-content-around  container">
      <button
        onClick={() => {
          setShowAddProduct(!showAddProduct);
        }}
        className={"btn btn-primary m-2"}>{showAddProduct ? "Hide add product" : "Show add product"}
      </button>
    </div>
    <div className={"container"}>
      <AddProduct visible={showAddProduct}/>
      <div className={"d-flex align-items-baseline"}>
        <h5>Your Product</h5>
      </div>
      <div className="d-md-flex flex-md-column d-lg-flex flex-lg-row d-md-flex justify-content-md-between">
        <div className={"row no-gutters"}>

          {products.length === 1 ? products.map((it, i) => {
              if (orderCardItems.filter(it1 => it1.title === it.title).length > 0) return;
              return <div key={i}>
                <ProductCard
                  isOrdered={orderCardItems.filter(it1 => it1.title === it.title).length > 0}
                  onAddToCard={() => {
                    const obj: OrderUnit = {
                      title: it.title,
                      quantity: it.quantity,
                      unitPrice: it.price,
                      imgUrl: it.imgUrl,
                      numberOfPcsOrdered: 1,
                      totalPrice: it.price,
                    }
                    const upd = [...orderCardItems, obj];
                    setOrderCardItems(upd)
                  }}
                  title={it.title}
                  quantity={it.quantity} price={it.price}
                  imgUrl={it.imgUrl}/>
              </div>
            }) :
            products.map((it, i) => (
              <div key={i} className="col-sm-12 col-md-4 col-lg-4">
                <ProductCard
                  isOrdered={orderCardItems.filter(it1 => it1.title === it.title).length > 0}
                  onAddToCard={() => {

                    if (orderCardItems.filter(it1 => it1.title === it.title).length > 0) return;
                    /*
                    * can be handled in a single function..*/
                    const obj: OrderUnit = {
                      title: it.title + "",
                      quantity: it.quantity,
                      unitPrice: it.price,
                      imgUrl: it.imgUrl + "",
                      numberOfPcsOrdered: 1,
                      totalPrice: it.price * it.quantity,
                    }
                    const upd = [...orderCardItems, obj];
                    setOrderCardItems(upd)
                  }}
                  title={it.title}
                  quantity={it.quantity} price={it.price}
                  imgUrl={it.imgUrl}/>
              </div>))}

        </div>

        <div style={{marginTop: "-3rem"}} className="mobile-margin">
          <OrderCard
            onPlus={title => {
              handleProductPlusMinus(title, CounterOperation.PLUS)
            }}
            onMinus={title => {
              handleProductPlusMinus(title, CounterOperation.MINUS)
            }}
            onRemoveItem={(title) => {
              const upd = orderCardItems.filter(it => it.title !== title);
              setOrderCardItems(upd)
            }}
            onPlaceOrder={(orderSummery, grandTotal) => {
              console.log(orderSummery);
              axios.post("http://localhost:8080/place-order", {
                orderedItems: JSON.stringify(orderSummery),
                grandTotal: grandTotal
              }).then(res => {

                console.log(res.data)
                alert("Order confirmed!! with total bill of: " + grandTotal)

                setOrderCardItems([])
              }).catch(er => {
                alert("Error placing order.." + er.toString());
                console.log(er)
              });
            }}
            cardItems={orderCardItems}/>
        </div>
      </div>
    </div>
  </div>);

}