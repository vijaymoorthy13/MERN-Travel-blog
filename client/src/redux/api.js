import axios from "axios"

const devEnv = process.env.NODE_ENV !== "production";

//const {REACT_APP_DEV_API,REACT_APP_PROD_API} = process.env;

const API = axios.create({baseURL: `https://travelopedia.herokuapp.com/`});



API.interceptors.request.use((req) =>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
});


export const signIn = (formData) => API.post("/users/signin",formData);
export const signUp = (formData) => API.post("/users/signup",formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn",result);  

export const createPlace = (placeData) => API.post("/place",placeData);
export const getPlaces = (page) => API.get(`/place?page=${page}`);
export const getPlace = (id) => API.get(`/place/${id}`);
export const deletePlace = (id) => API.delete(`/place/${id}`); 
export const updatePlace = (updatedPlaceData, id) => API.patch(`/place/${id}`,updatedPlaceData); 
export const getPlacesByUser = (userId) => API.get(`/place/userPlaces/${userId}`); 

export const getPlacesBySearch = (searchQuery) => API.get(`/place/search?searchQuery=${searchQuery}`);

export const getTagPlaces = (tag) => API.get(`/place/tag/${tag}`);  
export const getRelatedPlaces = (tags) => API.post(`/place/relatedPlaces/`, tags);  
export const likePlace = (id) => API.patch(`/place/like/${id}`);



