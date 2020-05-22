import React, {useState} from "react";
import axios from 'axios';

export interface AddProductProps {
  visible: boolean
}

export default function AddProduct(props: AddProductProps) {

  const [title, setTitle] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  function handleSubmit() {
    axios.post("http://localhost:8080/add-product", {
      title, quantity: parseFloat(quantity), imgUrl, price: parseFloat(price)
    }).then(res => console.log(res.data)).catch(err => console.log(err));
  }

  if (!props.visible) return <></>

  return (<div className={"container mt-2 mb-2"} style={{maxWidth: "25rem"}}>
    <div className="card">
      <h5 className="card-header">Add product</h5>
      <div className="card-body">

        <div className="form-group">
          <input onChange={(e) => setTitle(e.target.value)}
                 type="text" className="form-control" id="" placeholder="Title"/>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => setImgUrl(e.target.value)}
            type="text" className="form-control" id="" placeholder="Image url"/>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="text" className="form-control" id="" placeholder="Quantity/Unit"/>
        </div>
        <div className="form-group">
          <input onChange={(e) => setPrice(e.target.value)}
                 type="text" className="form-control" id="" placeholder="Price/unit"/>
        </div>

        <button
          onClick={handleSubmit}
          className={"btn btn-primary"}>Save
        </button>
      </div>
    </div>
  </div>);
}