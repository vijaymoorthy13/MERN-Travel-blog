import React from 'react'
import { useState,useEffect } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit"
import { Link,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {toast} from "react-toastify";
import { register } from '../redux/features/authSlice';


const initialState ={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmpassword:"",

};

const Register = () => {
  const [formValue,setFormValue] = useState(initialState);  
  const {loading, error} = useSelector((state) => ({ ...state.auth }))
  const {email,password,firstName,lastName,confirmPassword} = formValue; 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
     error && toast.warning(error)
  }, [error]);

  const handleSubmit = (e) => { 
      e.preventDefault();
      if(password !== confirmPassword){
          toast.warning("password is not matching")
      }
     if(email && password && firstName && lastName && confirmPassword) {
        dispatch(register({formValue,navigate,toast })); 
      }
  }

  const onInputChange = (e) => {
    const {name,value} = e.target;
    setFormValue({...formValue, [name]: value })
  }


  return (  
     <div style={{
         margin:"auto",     
         padding: "15px",
         maxWidth:"450px",
         alignContent:"center",
         marginTop:"120px",
     }}>

      <MDBCard alignment='center'>
          <MDBIcon fas icon='user-circle' className='fa-2x'/>
          <h2>Sign Up</h2>
          <MDBCardBody>
              <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                    <div className='col-md-6'>
                        <MDBInput 
                        label='firstName' 
                        type="text" 
                        value={firstName} 
                        name="firstName" 
                        onChange ={onInputChange}
                        required
                        invalid
                        validation='please provide first name'
                        />
                    </div>
                    <div className='col-md-6'>
                        <MDBInput 
                        label='lastName' 
                        type="text" 
                        value={lastName} 
                        name="lastName" 
                        onChange ={onInputChange}
                        required
                        invalid
                        validation='please provide last name'
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput 
                        label='email' 
                        type="email" 
                        value={email} 
                        name="email" 
                        onChange ={onInputChange}
                        required
                        invalid
                        validation='please provide Email Address'
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput 
                        label='Password' 
                        type="password" 
                        value={password} 
                        name="password" 
                        onChange ={onInputChange}
                        required
                        invalid
                        validation='please provide Password'
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput 
                        label='Confirm Password' 
                        type="password" 
                        value={confirmPassword} 
                        name="confirmPassword" 
                        onChange ={onInputChange}
                        required
                        invalid 
                        validation='please provide Confirm Password'
                        />
                    </div>
                    <div className='col-12'>
                      <MDBBtn style={{width:"100%"}} className="mt-2" >
                          {loading && "loading" ?
                             (<MDBSpinner
                             size='sm'
                             role="status"
                             tag="span"
                             className='me-2'           
                             /> )
                             
                             : "Register"
                          }
                          
                      </MDBBtn>
                    </div>
              </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
              <Link to="/login">
              <p>Already have an account ? Sign In</p>
              </Link>
          </MDBCardFooter>
      </MDBCard>

     </div>
  )
}

export default Register