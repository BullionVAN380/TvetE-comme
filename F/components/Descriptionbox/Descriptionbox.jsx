import React from 'react'
import './Descriptionbox.css'

const Descriptionbox = () => {
  return (
    <div className='descriptionbox'>
       <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reveiws (122)</div>
       </div>
       <div className="descriptionbox-description">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum ab accusantium et, molestiae, aliquam consectetur at repudiandae praesentium eveniet explicabo repellendus maxime quae saepe id assumenda vitae voluptatibus libero tenetur.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid at harum alias velit repellat tenetur possimus odio ut, ex nostrum dolor excepturi deleniti. Error voluptates ipsum consequuntur, alias minima praesentium!</p>
       </div>
    </div>
  )
}

export default Descriptionbox