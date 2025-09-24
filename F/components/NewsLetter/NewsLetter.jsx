import React from 'react'
import './NewsLetter.css'

function NewsLetter() {
  return (
    <div className='newsletter'>
     <h1>Get Exculusive Offers On Your Email</h1>
     <p>Subscribe to our newsletter and Stay Updated</p>
     <div>
        <input type='email' placeholder='Email Address'/>
        <button>Subscribe</button>

     </div>
    </div>
  )
}

export default NewsLetter