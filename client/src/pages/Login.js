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
import { login } from '../redux/features/authSlice';
import { googleSignIn } from '../redux/features/authSlice';
import {GoogleLogin} from "react-google-login"


const initialState ={
    email:"",
    password:"",

};

const Login = () => {
  const [formValue,setFormValue] = useState(initialState);  
  const {loading, error} = useSelector((state) => ({ ...state.auth }))
  const {email,password} = formValue; 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
//prod -> 

const devEnv = process.env.NODE_ENV !== "production";
const clientId = devEnv 
     ? "479576072254-k3adf9qqruh463kakqoc2naaecu2nc0u.apps.googleusercontent.com" 
     : "479576072254-krfaj7tu1hitnbk9mhd96o7v3o7v6qpv.apps.googleusercontent.com"

  useEffect(() => {
      error && toast.warning(error);
  }, [error]);

  const handleSubmit = (e) => { 
      e.preventDefault();
      if(email && password) {
          dispatch(login({formValue,navigate,toast })); 
      }
  }

  const onInputChange = (e) => {
    const {name,value} = e.target;
    setFormValue({...formValue, [name]: value })
  }

  const googleSuccess = (res) => {
      const email = res?.profileObj?.email;   
      const name = res?.profileObj?.name;   
      const token = res?.profileObj?.token;   
      const googleId = res?.profileObj?.googleId;   
      const result = {email, name, token, googleId};
      dispatch(googleSignIn({result, navigate, toast}));
      
  };

  const googleFailure = (error) => {
      toast.error(error)
  };

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
          <h2>Sign In</h2>
          <MDBCardBody>
              <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                    <div className='col-md-12'>
                        <MDBInput 
                        label='Email' 
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
                    <div className='col-12'>
                      <MDBBtn style={{width:"100%"}} className="mt-2" >
                          {loading ?
                             (<MDBSpinner
                             size='sm'
                             role="status"
                             tag="span"
                             className='me-2'             
                             />)
                             : "Login" 
                          }
                      </MDBBtn>
                    </div>
              </MDBValidation>
              <span style={{fontSize:"14px"}}>(OR)</span>
              <br/>
              <GoogleLogin
              clientId={clientId}
              render={(renderProps)=>(
                  <MDBBtn 
                  style={{width:"100%"}} 
                  color="danger" 
                  onClick={(renderProps.onClick)} 
                  disabled={renderProps.disabled}
                  >
                 <MDBIcon className='me-2' fab icon='google' />GOOGLE Sign in
                  </MDBBtn>
               )}
               onSuccess={googleSuccess}
               onFailure={googleFailure}
               cookiePolicy="single_host_origin"
              />
          </MDBCardBody>
          <MDBCardFooter>
              <Link to="/register">
              <p>Dont'have an account ? Sign Up</p>
              </Link>
          </MDBCardFooter>
      </MDBCard>
     </div>
  )
}

export default Login