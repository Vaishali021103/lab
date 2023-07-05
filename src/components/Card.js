import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const priceRef = useRef();
  const [qty, setQty] = useState("");

  const handleAddtoCart = async () => {
    // let lab = []
    // for (const item of data) {
    //   if (item.id === props.itemName._id) {
    //     lab = item;
    //     break;
    //   }
    // }
    // // console.log(food)
    // // console.log(new Date())
    // if (lab !== []) {
    //   if (lab.qty === qty) {
    //     await dispatch({ type: "UPDATE", id: props.itemName._id, price: finalPrice, qty: qty })
    //     return
    //   }
      //  if (lab.qty !== qty) {
      //   await dispatch({ type: "ADD", id: props.itemName._id, name: props.itemName.name, price: finalPrice, qty: qty,img: props.ImgSrc })
      //   return
      // }
    //   return
    // }
    await dispatch({
      type: "ADD",
      id: props.itemName._id,
      price: finalPrice,
      name: props.itemName.name,
      qty: qty,
    });
    console.log(data);
  };

  let finalPrice = parseInt(options[qty]);
  useEffect(()=>{
    setQty(priceRef.current.value)
  },[])

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px", borderColor:"blue"}}
        >
          <img
            src={props.itemName.img}
            className="card-img-top"
            alt="..."
            style={{ height: "180px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.itemName.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100"
                style={{
                  background: "#00698f",
                  color: "white",
                  borderRadius: "10px",
                }} ref={priceRef}
                onChange={(e)=> setQty(e.target.value)}
              >
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>

              <div className="d-inline h-100 fs-5 fw-bold" style={{}}>₹{finalPrice}/-</div>
            </div>
            <hr style={{background:"blue"}}></hr>
            <button
              className="justify-center ms-2"
              style={{
                background: "#00698f",
                borderRadius: "12px",
                fontFamily: "DM Sans, 'Source Sans Pro'",
                height: "40px",
                width: "100px",
                color: "white",
              }}
              onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
