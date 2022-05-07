import React, { useEffect } from 'react'
import {
   MDBCard,
   MDBCardTitle,
   MDBCardText,
   MDBCardBody,
   MDBCardImage,
   MDBRow,
   MDBCol,
   MDBBtn,
   MDBIcon,
   MDBCardGroup,
} from "mdb-react-ui-kit";
import {useDispatch,useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import { deletePlace, getPlacesByUser } from '../redux/features/placeSlice';
import Spinner from '../components/Spinner';
import {toast} from "react-toastify"
import moment from 'moment';

const Dashboard = () => {

  const{user} = useSelector((state) => ({...state.auth}));
  const{userPlaces,loading,createdAt} = useSelector((state) => ({...state.place})) 
  const userId = user?.result?._id;
  const dispatch =  useDispatch();
  const navigate = useNavigate()

  useEffect(() =>{
      if(userId){
          dispatch(getPlacesByUser(userId))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userId])

  const excerpt =(str) =>{
    if(str.length > 40){
        str = str.substring(0,40) +"..."
    }
    return str
}

//LOADING PAGE 
if(loading) {
    return <Spinner/>
  }
//DELETE
  const handleDelete = (id) =>{
     if(window.confirm(`Are you sure you want to delete?`)){
         dispatch(deletePlace({id,toast,navigate}))                  
     }
     
  }

  return (
      <div 
      style={{
          margin: "auto",
          marginTop:"50px",
          padding:"50px",
          maxWidth:"700px",
          alignContent:"center",
      }}
      >
          {userPlaces.length === 0 && (
              <h3 style={{textTransform:"capitalize"}}>No Places available with the user: {user?.result.name}</h3>
          )}
          {userPlaces.length > 1 && (
              <>
             <h5 className='text-center' style={{textTransform:"capitalize"}}>Dashboard: {user?.result?.name}</h5>
             <hr style={{maxWidth:"570px"}}/>
             </>
          )}
       {userPlaces && userPlaces.map((item) => (
           <MDBCardGroup key={item._id}>
               <Link to={`/place/${item._id}`}>
               <MDBCard                
               style={{maxWidth:"600px"}}                 
               className="mt-2"
               >                                                 
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
                          <MDBCardTitle className='text-start' style={{color:"#000"}}>
                              {item.title}
                          </MDBCardTitle>
                          <MDBCardText className='text-start'>
                               <small className='text-muted'>
                                   {excerpt(item.description)}
                               </small>
                               <small className='text-muted' style={{float:"left"}}>
                                 Posted: {moment(createdAt).calendar()};
                                 </small>                      
                          </MDBCardText>
                          <div 
                          style={{marginLeft:"5px",
                          float:"right",
                          marginTop:"-10px"}}
                          >
                            <MDBBtn className='mt-1' tag="a" color='none'>
                                   <MDBIcon
                                   fas
                                   icon="trash"
                                   style={{color:"#dd4b39"}}
                                   size="lg"
                                   onClick ={() => handleDelete(item._id)}
                                   />
                            </MDBBtn>
                            <Link to={`/editPlace/${item._id}`}>
                                   <MDBIcon
                                   fas
                                   icon="edit"
                                   size="lg"
                                   style={{color:"#55acee",marginLeft:"10px"}}
                                   />                                   
                            </Link>
                          </div>  
                      </MDBCardBody>
                  </MDBCol>
               </MDBRow>
                    
               </MDBCard>
               </Link>
           </MDBCardGroup>
       ))}
       
      </div>
  )
}


export default Dashboard