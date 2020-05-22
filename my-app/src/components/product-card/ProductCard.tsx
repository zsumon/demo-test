import React from "react";
import img from '../../assets/download.svg';
import cart from '../../assets/cart.png';
import './style.css';

export interface ProductCardProps {
  imgUrl: string,
  title: string,
  quantity: number,
  price: number,
  isOrdered?: boolean,

  onAddToCard?(): void
}

export default function ProductCard(props: ProductCardProps) {
  return <>
    <div className="card pc_card shadow mb-2 bg-white rounded">
      <div className={"pc_img_div"}>
        <i className="far fa-heart pc_heart_icon"/>
        <img
          className="card-img-top pc_image"
          alt="Card image cap"
          src={props.imgUrl}/>
      </div>

      <div className="card-body pc_card-body">
        <h5 className="pc_title">{props.title}</h5>

        <p className="pc_quantity_title">Quantity: {props.quantity} pcs</p>

        <div className={"d-flex align-items-center justify-content-between"}>
          <h6 className="card-title pc_price_title">${(props.price).toFixed(2)}</h6>

          {props.isOrdered ? <i style={{fontSize: "1.9rem", color: "#FA7226"}} className="fas fa-check-circle"/> :
            <img onClick={() => {
              props.onAddToCard!()
            }} className="pc_cart_img" src={cart} alt=""/>}

        </div>
      </div>
    </div>
  </>
}