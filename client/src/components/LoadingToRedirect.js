import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const[count,setCount] = useState(5);
  const navigate= useNavigate(); 

useEffect(()=>{
    const interval = setInterval(()=>{
          setCount((currentCount) => --currentCount)
    },1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
},[count,Navigate])

  return (
    <>
    <div style={{marginTop:"100px"}}>
        <h4>Redirecting you in {count} seconds</h4>
    </div>
    </>
  )
}

export default LoadingToRedirect