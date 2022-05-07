import React, { useEffect } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBContainer,
    MDBIcon,
    MDBBtn
} from "mdb-react-ui-kit"
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
import { getPlace, getRelatedPlaces } from '../redux/features/placeSlice';
import RelatedPlaces from '../components/RelatedPlaces';
import DisqusThread from '../components/DisqusThread';
import Spinner from '../components/Spinner';


const SinglePlace = () => {

    const dispatch = useDispatch();
    const {place,relatedPlaces,loading} = useSelector((state) => ({...state.place}));  // STORE
    const {id} = useParams();
    const navigate = useNavigate();
    const tags = place?.tags;   

    
    useEffect(() =>{       
       tags && dispatch(getRelatedPlaces(tags));       
       // eslint-disable-next-line react-hooks/exhaustive-deps       
    },[tags])


    useEffect(()=>{
        if(id){
            dispatch(getPlace(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    if(loading) {
        return <Spinner/>
      }

  return (
      <>
      <MDBContainer style={{marginTop:"65px"}}>
           <MDBCard className='mb-3 mt-2' >
               <MDBCardImage
                position='top'
                style={{width:"100%",maxHeight:"600px"}}
                src={place?.imageFile}
                alt={place?.title}
               />
               <MDBCardBody>
                   <MDBBtn tag="a" color="none" style={{float:"left", color:"#000"}} onClick={() => navigate("/")}>
                     <MDBIcon
                        fas
                        size='lg'
                        icon='long-arrow-alt-left'
                        style={{float:"left"}}
                     >
                     </MDBIcon>
                   </MDBBtn>
                   <h3>{place?.title}</h3>
                   <span>
                       <p className='text-start placeName'>Posted By: {place?.name}</p>
                   </span>
                   <div style={{float:"left"}}>
                       <span className='text-start'>
                            {place && place.tags && place.tags.map((item) => `#${item} `)}  
                       </span>
                   </div>
                   <br/>
                   <MDBCardText className='text-start mt-2'>
                        <MDBIcon
                        style={{float:"left",margin:"5px"}}
                        far
                        icon='calendar-alt'
                        size='lg'
                        />
                        <small className='text-muted'>
                            {moment(place?.createdAt).fromNow()}
                        </small>                        
                   </MDBCardText>
                   <MDBCardText className='lead mb-0 text-start'>
                        {place?.description}
                   </MDBCardText>
               </MDBCardBody>              
               <RelatedPlaces relatedPlaces={relatedPlaces} placeId={id} loading={loading}/>               
           </MDBCard>
           <DisqusThread id={id} title={place?.title} path={`/place/${id}`}/>
      </MDBContainer>
      </>
  )
}

export default SinglePlace