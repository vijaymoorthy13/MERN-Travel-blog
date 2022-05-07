import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


//Create place
export const createPlace = createAsyncThunk("place/createPlace", 
         async({placeData,navigate,toast}, {rejectWithValue}) => {
     try{
        const response = await api.createPlace(placeData);//api
        toast.success("Place Added successfully");
        navigate("/");
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});
             
                            /// if we not provide any parameter we simply give // -> //async(_, {rejectWithValue})  (OR)              
export const getPlaces = createAsyncThunk("place/getPlaces",     //using _, it display all places in the database 
         async(page, {rejectWithValue}) => {                                                             
     try{                                        // if we want to display the page we need to pass (page) parameter                                            
        const response = await api.getPlaces(page);//api call in redux folder
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});

export const getPlace = createAsyncThunk("place/getPlace", 
         async(id, {rejectWithValue}) => {             
     try{
        const response = await api.getPlace(id);//api call in redux folder
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});

                                                                              
export const getPlacesByUser = createAsyncThunk("place/getPlacesByUser",  
         async(userId, {rejectWithValue}) => {            
     try{
        const response = await api.getPlacesByUser(userId);//api call in redux folder
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});

export const deletePlace = createAsyncThunk("place/deletePlace",  
         async({id,toast,navigate}, {rejectWithValue}) => {            
     try{
        const response = await api.deletePlace(id);//api call in redux folder
        toast.success("Tour Deleted Successfully"); 
        navigate("/dashboard");
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});


export const updatePlace = createAsyncThunk("place/updatePlace",  
         async({id,updatedPlaceData,toast,navigate}, {rejectWithValue}) => {            
     try{
        const response = await api.updatePlace(updatedPlaceData,id);//api call in redux folder
        toast.success("Tour Updated Successfully"); 
        navigate("/");
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});

//SEARCH PLACE BY MATCHING WORDS
export const searchPlaces = createAsyncThunk("place/searchPlaces",  
         async(searchQuery, {rejectWithValue}) => {              
     try{
        const response = await api.getPlacesBySearch(searchQuery);//api call in redux folder
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});

//SEARCH PLACE BY MATCHING TAGS
export const getPlacesByTag = createAsyncThunk("place/getPlacesByTag",  
         async(tag, {rejectWithValue}) => {              
     try{
        const response = await api.getTagPlaces(tag);//api call in redux folder
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});

//RELATED PLACES
export const getRelatedPlaces = createAsyncThunk("place/getRelatedPlaces",  
         async(tags, {rejectWithValue}) => {              
     try{
        const response = await api.getRelatedPlaces(tags);//api call in redux folder
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});


export const likePlace = createAsyncThunk("place/likePlace", 
         async({ _id }, {rejectWithValue}) => {             
     try{
        const response = await api.likePlace(_id);//api call in redux folder
        return response.data;
     }catch(error){
         return rejectWithValue(error.response.data);
     }
});



const placeSlice = createSlice({
    name:"place",
    initialState:{
        place:{},
        places:[],
        userPlaces:[],
        tagPlaces:[],
        relatedPlaces:[],
        currentPage: 1,
        numberOfPages: null,        
        error:"",
        loading:false,
    },
   reducers:{
       setCurrentPage: (state,action) =>{ 
         state.currentPage = action.payload;
       },
   },
 extraReducers:{
    //CreatePlace
     [createPlace.pending]:(state,action)=>{
        state.loading = true;   
     }, 
     [createPlace.fulfilled]:(state,action)=>{
        state.loading = false;
        state.places = [action.payload];       
     },
     [createPlace.rejected]:(state,action)=>{
        state.loading = false;   
        state.error = action.payload.message;
     },
     
     //GET ALL PLACES
     [getPlaces.pending]:(state,action)=>{
      state.loading = true;   
     }, 
     [getPlaces.fulfilled]:(state,action)=>{
      state.loading = false;
      state.places =  action.payload.data;       
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage; 
     },
    [getPlaces.rejected]:(state,action)=>{
      state.loading = false;   
      state.error = action.payload.message;
     },      

     //GET PLACE BY ID
     [getPlace.pending]:(state,action)=>{
      state.loading = true;   
     }, 
     [getPlace.fulfilled]:(state,action)=>{
      state.loading = false;
      state.place =  action.payload;       
     },
    [getPlace.rejected]:(state,action)=>{
      state.loading = false;   
      state.error = action.payload.message;
     },      


     //GET PLACE BY USER ID 
     [getPlacesByUser.pending]:(state,action)=>{
      state.loading = true;   
     }, 
     [getPlacesByUser.fulfilled]:(state,action)=>{
      state.loading = false;
      state.userPlaces =  action.payload;       
     },
    [getPlacesByUser.rejected]:(state,action)=>{
      state.loading = false;   
      state.error = action.payload.message;
     },      

     //DELETE PLACE BY USER
     [deletePlace.pending]:(state,action)=>{
        state.loading = true;   
       }, 
       [deletePlace.fulfilled]:(state,action)=>{
        state.loading = false;
        //console.log("action",action);
        const {arg:{id} }= action.meta;
        if(id) {
            state.userPlaces = state.userPlaces.filter((item) => item._id !== id);
            state.places = state.places.filter((item) => item._id !== id);
        }
       },
      [deletePlace.rejected]:(state,action)=>{
        state.loading = false;   
        state.error = action.payload.message;
       },      

       //UPDATE PLACE BY USER
     [updatePlace.pending]:(state,action)=>{
        state.loading = true;   
       }, 
       [updatePlace.fulfilled]:(state,action)=>{
        state.loading = false;
        //console.log("action",action);
        const {
            arg:{id} 
             } = action.meta;
        if(id) {
            state.userPlaces = state.userPlaces.map((item) => 
                 item._id === id ? action.payload : item);
            state.places = state.places.map((item) => 
                 item._id === id ? action.payload : item);
        }
       },
      [updatePlace.rejected]:(state,action)=>{
        state.loading = false;   
        state.error = action.payload.message;
       },      

       //UPDATE PLACE BY USER
       [likePlace.pending]:(state,action)=>{},  //{state.loading = true; }// whenever u like the button it will load the page, 
       [likePlace.fulfilled]:(state,action)=>{
        state.loading = false;
        const {
            arg:{ _id } 
             } = action.meta;
        if(_id) {
            state.places = state.places.map((item) => 
               item._id === action.payload._id ? action.payload : item);
        }
       },
      [likePlace.rejected]:(state,action)=>{
        state.loading = false;   
        state.error = action.payload.message;
       },      
       
    //SEARCH PLACES IN MATCHING WORDS
     [searchPlaces.pending]:(state,action)=>{
        state.loading = true;   
       }, 
       [searchPlaces.fulfilled]:(state,action)=>{
        state.loading = false;
        state.places =  action.payload;       
       },
      [searchPlaces.rejected]:(state,action)=>{
        state.loading = false;   
        state.error = action.payload.message;
       },      

       //SEARCH PLACES IN MATCHING TAGS
       [getPlacesByTag.pending]:(state,action)=>{
        state.loading = true;   
       }, 
       [getPlacesByTag.fulfilled]:(state,action)=>{
        state.loading = false;
        state.tagPlaces =  action.payload;       
       },
       [getPlacesByTag.rejected]:(state,action)=>{
        state.loading = false;   
        state.error = action.payload.message;
       },      


       //RELATED PLACES IN MATCHING TAGS
       [getRelatedPlaces.pending]:(state,action)=>{
        state.loading = true;   
       }, 
       [getRelatedPlaces.fulfilled]:(state,action)=>{
        state.loading = false;
        state.relatedPlaces =  action.payload;       
       },
       [getRelatedPlaces.rejected]:(state,action)=>{
        state.loading = false;   
        state.error = action.payload.message;
       },      

 },
});

export const {setCurrentPage} = placeSlice.actions;


export default placeSlice.reducer; 