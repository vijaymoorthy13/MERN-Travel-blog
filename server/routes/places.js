import express from "express";

const router = express.Router();
import auth from "../middleware/auth.js"    

import { 
        
        createPlace, 
        deletePlace, 
        getPlace, 
        getPlaces, 
        getPlacesBySearch, 
        getPlacesByTag, 
        getPlacesByUser, 
        getRelatedPlaces,         
        updatePlace, 
        likePlace, 
    } from "../controller/places.js";


router.get("/search",getPlacesBySearch);// search places related to the word matching     
router.get("/tag/:tag",getPlacesByTag)// search places related to the tags matching  
router.post("/relatedPlaces",getRelatedPlaces)// Related places by searching the tags 
router.get("/",getPlaces); //get all places
router.get("/:id",getPlace);   // get a single place page


router.post("/",auth,createPlace);  // first it runs middleware and then it runs controller
router.delete("/:id",auth,deletePlace); // delete a place in dashboard by user  
router.patch("/:id",auth,updatePlace);  // update the existing place 
router.get("/userPlaces/:id",auth,getPlacesByUser); // get a place only posted by user  
router.patch("/like/:id",auth,likePlace); /// like the post 

export default router; 