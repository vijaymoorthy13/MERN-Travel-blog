import React from 'react';
import {MDBCard,MDBCardBody,MDBCardTitle,MDBCardText,MDBCardImage,MDBCardGroup, MDBBtn, MDBIcon, MDBTooltip} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { likePlace } from '../redux/features/placeSlice';
import moment from "moment";



const CardPlace = ({imageFile,description,title,tags,_id,name,createdAt,likes}) => {

const {user} = useSelector((state) => ({...state.auth}));
const userId = user?.result?._id || user?.result?.googleId;   //to check the user is logged in and like the place

const dispatch = useDispatch();


const excerpt =(str) =>{
    if(str.length > 45){
        str = str.substring(0,45) +"..."
    }
    return str
}

const Likes = () =>{
    if(likes.length > 0){
        return likes.find((like) => like === userId) ? (    
            <>
            <MDBIcon fas icon="thumbs-up"/>
            &nbsp;
            {likes.length > 1 ? (
                <MDBTooltip tag="a" title={`You and ${likes.length - 1} other people likes this place`}>
                    {likes.length} Likes    
                </MDBTooltip>
            ) : (
                `${likes.length} Like${likes.length > 1 ? 's' : ""}`
            )}
            </> 
        ) : (
            <>
            <MDBIcon far icon='thumbs-up'>
                &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
            </MDBIcon>
            </>
        )
    }
    return (
        <>  
        <MDBIcon far icon="thumbs-up"/>
        &nbsp;Like
        </>
    )
}

const handleLike =() =>{
  dispatch(likePlace({ _id }));
}

  return (
    <MDBCardGroup>
         <MDBCard  className='h-100 mt-2 d-sm-flex' style={{maxWidth:"30rem"}}>
             <MDBCardImage 
                 src={imageFile}
                alt={title}
                position="top"
                style={{maxWidth:"100",height:"180px"}}
             />            
             <div className='top-left' style={{textTransform:"capitalize"}}>{name}</div>
             <span className='text-start tag-card'>
                 {tags.map((tag,index)=> (
                     <Link key={index} to={`/places/tag/${tag}`} > #{tag}</Link>
                 ))}
                 
             </span>      
             <div style={{marginRight:"20px"}}>
             <MDBBtn 
                 style={{
                     float:"right", 
                     display:"block"}} 
                     tag="a" 
                     color='none' 
                     onClick={!user?.result ?  null : handleLike}
                     >
                    {!user?.result ? (
                        <MDBTooltip title="Please login to like this place" tag="a" >
                        <Likes/>
                        </MDBTooltip>
                    ) : (
                        <Likes/>
                    )}
              </MDBBtn>
             </div>       
             <MDBCardBody> 
                 <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
                 <MDBCardText className='text-start'>{excerpt(description)}
                 {!user?.result ? (
                         <MDBTooltip title="Please login to view place Details" tag="a" >
                          <Link to={`/login`}>Read More</Link>                 
                         </MDBTooltip>
                 ) : (
                     <Link to={`/place/${_id}`}>Read More</Link>                 
                 )}
                 
                 </MDBCardText>                 
                 <small className='text-muted' style={{float:"left"}}>
                    Posted: {moment(createdAt).calendar()};
                 </small>                      
             </MDBCardBody>             
             
         </MDBCard>
    </MDBCardGroup>
  ) 
}

export default CardPlace