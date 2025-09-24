import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/cart_cross_icon.png'

function ListProduct() {
    const [allproducts, setallproducts] = useState([]);
    const fetchInfo  = async ()=>{
        await fetch ('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setallproducts(data)});
    }
    useEffect(()=>{
       fetchInfo();
    },[])

  const remove_product= async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
                method:'POST',
                headers:{
                  Accept:'application/json',
                  'Content-Type':'application/json',
                },
                body:JSON.stringify({id:id}),
               })
               await fetchInfo();
  }

  return (
    
    <div className='listproduct'>
       <h1>All Product</h1>
       <div className="listproduct-fomat-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
       </div>
       <div className="listproduct-all-product">
          <hr />
          {allproducts.map((product,index)=>{
             return <> <div key={index} className="listproduct-fomat-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>Ksh{product.old_price}</p>
                <p>Ksh{product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={remove_icon} alt="" />
             </div>
             <hr />   </>
            })}
       </div>
    </div>
 
  )

}

export default ListProduct
