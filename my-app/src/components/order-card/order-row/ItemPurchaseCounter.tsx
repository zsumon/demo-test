import React, {useState} from "react";

interface ItemPurchaseCounterProps {
  onPlus(): void,

  onMinus(): void,
}

export default function ItemPurchaseCounter(props: ItemPurchaseCounterProps) {
  const [counter, setCounter] = useState(1);
  return <div className={"d-flex flex-column"}>
    <p onClick={() => {
      setCounter(counter + 1);
      props.onPlus()
    }} className={"m-0 text-center"} style={{cursor: "pointer"}}>+</p>

    <p style={{backgroundColor: "#dedede"}} className={"p-1 m-0"}>{counter}</p>
    <p onClick={() => {
      if (counter > 1)
        setCounter(counter - 1);
      props.onMinus()
    }} className={"m-0 text-center"} style={{cursor: "pointer"}}>-</p>
  </div>
}