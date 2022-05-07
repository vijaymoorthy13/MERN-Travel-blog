import React, { useState } from 'react'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import {useSelector,useDispatch}  from "react-redux";
import { setLogout } from '../redux/features/authSlice';
import { searchPlaces } from '../redux/features/placeSlice';
import {useNavigate} from "react-router-dom";
import decode from "jwt-decode";


const Header = () => {      
  
  const [show,setShow] = useState(false);
  const [search,setSearch] = useState("");
  const {user} = useSelector((state)=> ({...state.auth}));  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  if(token){
    const decodedToken = decode(token);
      if(decodedToken.exp * 1000 <  new Date().getTime()){
          dispatch(setLogout());
      }

  }

  const handleLogout = () =>{
      dispatch(setLogout()); 
  }

  const handleSubmit = (e) =>{
      e.preventDefault();
      if(search){
          dispatch(searchPlaces(search));
          navigate(`/places/search?searchQuery=${search}`);
          setSearch("")
      }else{
          navigate("/")
      }
      
  }

  return (
    <MDBNavbar fixed='top' expand="lg" style={{backgroundColor:"black"}}>
          <MDBContainer>
              <MDBNavbarBrand href="/" style={{color:"white",fontWeight:"600",fontSize:"22px"}}>
                  Travelpedia
              </MDBNavbarBrand>
              <MDBNavbarToggler
               type='button'
               aria-expanded="false"
               aria-label="toggle navigation"
               onClick={()=>setShow(!show)} 
               style={{color:"white"}}
              >
                <MDBIcon icon='bars' fas />
              </MDBNavbarToggler>
              <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0" >
                        {user?.result?._id && (
                            <h5 style={{marginRight:"30px",marginTop:"27px", color:"#EEE",textTransform:"capitalize"}}>
                                Name: {user?.result?.name}
                            </h5>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">
                                <p className='header-text'>Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/addplace">
                                <p className='header-text'>Add Places</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/dashboard">
                                <p className='header-text'>Dashboard</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ?
                        (<MDBNavbarItem>
                            <MDBNavbarLink href="/login">
                                <p className='header-text' onClick={handleLogout}>Logout</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        )  : 
                        (<MDBNavbarItem>
                            <MDBNavbarLink href="/login">
                                <p className='header-text'>Login</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        )}                                                 
                    </MDBNavbarNav>
                    <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
                        <input
                        type="text"
                        className='form-control'
                        placeholder='Search Places'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}   
                        />
                        <div style={{marginTop:"5px",marginLeft:"5px"}}>
                             <MDBIcon fas icon='search' />
                        </div>
                    </form>
              </MDBCollapse>
          </MDBContainer>   
    </MDBNavbar>
  )
}

export default Header