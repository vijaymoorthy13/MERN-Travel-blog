import React, { useEffect } from 'react'
import {MDBCol,MDBContainer,MDBRow,MDBTypography} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {getPlaces, setCurrentPage} from "../redux/features/placeSlice";
import CardPlace from '../components/CardPlace';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {

 const {places,loading,currentPage,numberOfPages} = useSelector((state) =>({...state.place})) 
 
 
 const dispatch = useDispatch();
 const query = useQuery();
 const searchQuery = query.get("searchQuery");
 const location = useLocation()  

 useEffect(()=>{
   dispatch(getPlaces(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[currentPage])

 if(loading) {
   return <Spinner/>
 }
 
  return (
   <div style={{
     margin:"auto",
     padding:"15px",
     maxWidth:"1000px",
     alignContent:"center"
   }}>

    <MDBRow className='mt-5'>
      {places.length === 0 && location.pathname === "/" && (
        <MDBTypography className='text-center mb-0 mt-5'  tag="h2" >
               No Places found
        </MDBTypography>
      )}
      {places.length === 0 && location.pathname !== "/" && (
        <MDBTypography className='text-center mb-0 mt-5'  tag="h2" >
               No matches found with place the "{searchQuery}"
        </MDBTypography>
      )}
      <MDBCol>
         <MDBContainer >
           <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
               {places && places.map((item) => <CardPlace key={item._id}{...item}/>)}                             
            </MDBRow>
         </MDBContainer>
      </MDBCol>
    </MDBRow>     
    {places.length > 0 && !searchQuery && (
       <Pagination
       setCurrentPage={setCurrentPage}
       numberOfPages ={numberOfPages}
       currentPage={currentPage}
       dispatch={dispatch}
       >
       </Pagination>
    )}

      <hr style={{marginTop:"50px", width:"100%"}}/>
      <h6>Copyrights Reserved<span> @vijay</span></h6>

   </div>
 
  )
}

export default Home