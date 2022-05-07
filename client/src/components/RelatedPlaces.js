import React from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBCol,
    MDBCardTitle,
    MDBRow,
    MDBCardGroup
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import { excerpt } from '../utility.js';
import Spinner from './Spinner.js';


const RelatedPlaces = ({relatedPlaces, placeId,loading}) => {

    if(loading) {
        return <Spinner/>
      }

  return (
      <>
    {relatedPlaces && relatedPlaces.length > 0 && (
        <>
        {relatedPlaces.length > 1 && <h4>Related places</h4>}
        <MDBRow className='row-col-1 row-cols-md-3 g-4'>
        {relatedPlaces.filter((item) => item._id !== placeId).splice(0,3).map((item) => (
            <MDBCardGroup key={item.id}>
            <MDBCol>
                <MDBCard key={item.id}>
                    <Link to={`/place/${item._id}`}>
                        <MDBCardImage
                        src={item.imageFile}
                        alt={item.title}
                        position="top"                        
                        />
                    </Link>
                    <span className='text-start tag-card'>
                       {item.tags.map((tag) => (
                           <Link to={`/places/tag/${tag}`} > #{tag}</Link>
                       ))}
                    </span>
                    <MDBCardBody>
                        <MDBCardTitle className='text-start'>
                            {item.title}
                        </MDBCardTitle>
                        <MDBCardText className='text-start'>
                            {excerpt(item.description,45)}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>            
            </MDBCardGroup>
          ))}          
        </MDBRow>
        </>    
    )}
    </>
    
  )
}

export default RelatedPlaces