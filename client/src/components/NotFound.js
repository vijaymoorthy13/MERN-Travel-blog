import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
      <>
     <div style={{marginTop:"20%", color:"red"}}>
       
        <h2>PAGE NOT FOUND </h2>
        <Link to={"/"}>
        <h4 style={{textDecoration:"underline"}}>Go to Homepage</h4>
        </Link>
     </div>
    </>

  )
}

export default NotFound