import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";

//Login
export const login = createAsyncThunk("auth/login", 
         async({formValue,navigate,toast}, {rejectWithValue}) => {
     try{        
         const response = await api.signIn(formValue);
         toast.success("login success");
         navigate("/");
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});

//Register
export const register = createAsyncThunk("auth/register", 
         async({formValue,navigate,toast}, {rejectWithValue}) => {
   try{
      const response = await api.signUp(formValue);
      toast.success("Registered successfully");
      navigate("/");
      return response.data;
   }catch(error){
       return rejectWithValue(error.response.data);
   }
});     

//GoogleSignIn

export const googleSignIn = createAsyncThunk("auth/googleSignIn",
         async({result,navigate,toast}, {rejectWithValue}) => {
   try{
      const response = await api.googleSignIn(result); //the name googleSignIn is same in api call
      toast.success("Google SignIn successfull");
      navigate("/");
      return response.data;
   }catch(error){
       return rejectWithValue(error.response.data);
   }
});


const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:"",
        loading:false,
    },
  //Store user info in home
  reducers:{
     setUser:(state,action) =>{
        state.user = action.payload;
     },
     setLogout:(state,action) =>{
      localStorage.clear();  
      state.user = null;
   },
  },

 extraReducers:{
    //login
     [login.pending]:(state,action)=>{
        state.loading = true;   
     }, 
     [login.fulfilled]:(state,action)=>{
        state.loading = false;
        localStorage.setItem("profile",JSON.stringify({...action.payload}));
        state.user = action.payload;       
     },
     [login.rejected]:(state,action)=>{
        state.loading = false;   
        state.error = action.payload.message;
     }, 
     //register
     [register.pending]:(state,action)=>{
      state.loading = true;   
     }, 
     [register.fulfilled]:(state,action)=>{
      state.loading = false;
      localStorage.setItem("profile",JSON.stringify({...action.payload}));
      state.user = action.payload;       
      },
      [register.rejected]:(state,action)=>{
      state.loading = false;   
      state.error = action.payload.message;
   }, 
   //GOOGLE SIGN IN
     [googleSignIn.pending]:(state,action)=>{
      state.loading = true;   
     }, 
     [googleSignIn.fulfilled]:(state,action)=>{
      state.loading = false;
      localStorage.setItem("profile",JSON.stringify({...action.payload}));
      state.user = action.payload;       
      },
      [googleSignIn.rejected]:(state,action)=>{
      state.loading = false;   
      state.error = action.payload.message;
   },
   
 },
});

export const { setUser,setLogout } = authSlice.actions;
export default authSlice.reducer;