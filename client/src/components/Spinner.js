import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit'

const Spinner = () => {
  
  return (
      <>
      <MDBSpinner className='me-2' style={{width:"3rem",height:"3rem",marginTop:"100px"}}>
      </MDBSpinner>
      <div>
      <span className='' style={{textTransform:"capitalize"}}><h3>Loading ... Please Wait</h3></span>
      </div>
      </>
  )
}

export default Spinner