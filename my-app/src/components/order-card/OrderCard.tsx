import React, {useState} from "react";
import OrderCardRow from "./order-row/OrderCardRow";
import './style.css';

export interface OrderUnit {
  title: string,
  quantity: number,
  unitPrice: number,
  imgUrl: string,
  numberOfPcsOrdered: number,
  totalPrice: number
}

interface OrderCardProps {
  onPlaceOrder(orderSummery: OrderUnit[], grandTotal: number): void,

  onRemoveItem(title: string): void,

  onPlus(title: string): void

  onMinus(title: string): void

  cardItems: Array<OrderUnit>
}

export default function OrderCard(props: OrderCardProps) {
  let grandTotal = 0;
  props.cardItems.map(it => {
    grandTotal += it.totalPrice;
    return it
  });
  return <div style={{minWidth: "20rem", minHeight: "40rem"}} className="shadow mb-2 bg-white rounded ord-div">

    <div className={"p-2"}>
      <h5 className={""}>Your Card</h5>
    </div>

    <div className="border-top p-2">
      {props.cardItems.sort((a, b) => a.title < b.title ? 1 : -1).map((it, i) => {
        let mb = "";
        if (i + 1 === props.cardItems.length) mb = " mb-5";
        return <OrderCardRow
          marginBottom={mb}
          key={i}
          imgUrl={it.imgUrl}
          title={it.title}
          price={it.unitPrice}
          quantity={it.quantity}
          totalNumberOfPurchase={it.numberOfPcsOrdered}
          onRemove={() => {
            props.onRemoveItem(it.title)
          }}
          onPlus={() => {
            props.onPlus(it.title)
          }}
          onMinus={() => {
            props.onMinus(it.title)
          }}
        />
      })}

      <div className="place-order">
        {props.cardItems.length > 0 ?
          <div className="d-flex align-items-baseline justify-content-between p-2">
            <button
              onClick={() => {
                props.onPlaceOrder(props.cardItems.map(it => it), grandTotal);
              }}
              className={"btn"} style={{backgroundColor: "#FF732B", color: "white"}}>Place order
            </button>
            <p>Grand total: ${grandTotal}</p>
          </div> : <p className="p-1 mt-3 text-center">Your order card is empty!</p>}
      </div>
    </div>
  </div>
}