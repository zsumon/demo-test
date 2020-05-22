import React from "react";

interface OrderConfirmationProps {
  items: [{
    title: string,
    unitPrice: number,
    total: number
  }],
  grandTotal: number
}

export default function (props: OrderConfirmationProps) {
  return <div>
    <div className="card">
      <h5 className="card-header">Your ordered is confirmed!</h5>
      <div className="card-body">
        {props.items.map((it, i) => <div className={"border mb-2"}>
          <p>{it.title}</p>
          <p>{it.unitPrice}</p>
          <p>{it.total}</p>
        </div>)}
        <p>Grand total: {props.grandTotal}</p>
      </div>
    </div>
  </div>
}