import React from "react";
import './style.css';
import ItemPurchaseCounter from "./ItemPurchaseCounter";

interface OrderCardRowProps {
  imgUrl: string,
  title: string,
  price: number,
  quantity: number,
  totalNumberOfPurchase: number,
  marginBottom: string

  onRemove(title: string): void

  onPlus(): void,

  onMinus(): void
}

export default function OrderCardRow(props: OrderCardRowProps) {
  return <div className={"d-flex align-items-center p-1 justify-content-around" + props.marginBottom}>
    <div className={"d-flex"}>
      <img className="ocr_img mr-2" src={props.imgUrl} alt=""/>
      <div className={"d-flex flex-column ocr_prod_d mr-2"}>
        <p style={{fontSize: "14px"}}>{props.title}</p>
        <p style={{fontSize: "12px", fontWeight: "lighter"}}>{props.quantity} pcs/unit</p>
      </div>
    </div>
    <ItemPurchaseCounter
      onPlus={() => props.onPlus()}
      onMinus={() => props.onMinus()}
    />
    <p className={"m-0 ml-1"}>${(props.price * props.totalNumberOfPurchase).toFixed(2)}</p>
    <i onClick={() => props.onRemove(props.title)}
       className="fas fa-times-circle ml-2"
       style={{color: "red", cursor: "pointer"}}/>
  </div>
}