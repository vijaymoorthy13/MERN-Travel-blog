import React from 'react'
import { useEffect } from 'react';
import {
   MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage,
   MDBRow, MDBCol,  MDBBtn,  MDBCardGroup
}
 from "mdb-react-ui-kit";
 import { useParams,useNavigate } from 'react-router-dom';
 import Spinner from "../components/Spinner"
 import { useDispatch, useSelector } from 'react-redux';
import { getPlacesByTag } from '../redux/features/placeSlice';
import { excerpt } from '../utility.js';

const TagPlaces = () => {
  
  const {tagPlaces,loading} = useSelector((state) => ({...state.place}))
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {tag} = useParams();

  useEffect(() =>{
      if(tag){
        dispatch(getPlacesByTag(tag))
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tag])

   if(loading){
     return <Spinner/>
   }

  return (
      <div style={{
        margin: "auto",
        padding:"120px",
        maxWidth:"900px",
        alignContent:"center",
      }}>
      <h3 className='text-center'>Tours with tag:{tag}</h3>
      <hr style={{maxWidth:"570px"}}/>
         {tagPlaces &&
            tagPlaces.map((item) => (
            <MDBCardGroup key={item._id}>
                 <MDBCard style={{maxWidth:"570px"}} className="mt-2">
                     <MDBRow className='g-0'>
                        <MDBCol md="4">
                            <MDBCardImage
                             className='rounded'
                             src={item.imageFile}
                             alt={item.title}
                             fluid
                            />
                        </MDBCol>
                        <MDBCol md='8'>
                             <MDBCardBody>
                                  <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
                                  <MDBCardText className='text-start'>{excerpt(item.description, 40)}</MDBCardText>
                                  <div style={{float:"left",marginTop:"-10px"}}>
                                      <MDBBtn
                                        size="sm"
                                        rounded
                                        color='info'
                                        onClick={() => navigate(`/place/${item._id}`)}
                                      >
                                        Read More
                                      </MDBBtn>
                                  </div>
                             </MDBCardBody>                            
                        </MDBCol>
                     </MDBRow> 
                 </MDBCard>
           </MDBCardGroup>
         ))}
      </div>

  )
}

export default TagPlaces