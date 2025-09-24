import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrums from '../Breadcrums/Breadcrums';
import {ShopContext} from '../Context/ShopContext'
import Descriptionbox from '../Descriptionbox/Descriptionbox';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import RelatedProducts from '../RelatedProducts/RelatedProducts';


const Product = () => {
    const {all_product}=useContext(ShopContext);
    const {productId}=useParams();
    const product=all_product.find((e)=>e.id===Number(productId));

  return (
    <div>
        <Breadcrums product={product}/>
        <ProductDisplay product={product} />
        <Descriptionbox/>
        <RelatedProducts/>
    </div>
  )
}

export default Product