import TourModal from "../models/places.js";
import mongoose from "mongoose";

//CREATE A NEW PLACE
export const createPlace = async (req,res) =>{
   const place = req.body;
   const newPlace = new TourModal({
       ...place,
       creator: req.userId,
       createdAt: new Date().toISOString()
   });
   try{
       await newPlace.save();
       res.status(201).json(newPlace);
   }catch(error){
      res.status(404).json({message:"something wrong in creating place"})   
   }   
};

///GET ALL PLACES IN HOMEPAGE USING PAGINATION
export  const getPlaces = async(req,res) =>{
    const {page} = req.query;
  try{
      //const places = await TourModal.find();
      //res.status(200).json(places)
      const limit = 6;
      const startIndex = (Number(page) - 1) * limit; 
      const total = await TourModal.countDocuments({});
      const places = await TourModal.find().limit(limit).skip(startIndex);
      res.json({
          data:places,
          currentPage: Number(page),
          totalPlaces : total,
          numberOfPages : Math.ceil(total / limit),
      })
  }catch(err){
      res.status(404).json({message:"something wrong in getting details of all places"})
  }    
};

///GET A SINGLE PLACE
export  const getPlace = async(req,res) =>{
    const {id} = req.params;
    try{
        const place = await TourModal.findById(id);
        res.status(200).json(place)
    }catch(err){
        res.status(404).json({message:"something wrong in getting a single place"});
        res.status(404).json(err);
    }    
  }

///GET PLACE BY THE USER
export const getPlacesByUser = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({message:"user doesn't exist"});
    }
    const userPlaces = await TourModal.find({creator:id});
    res.status(200).json(userPlaces);
}  

//DELETE PLACE IN DAHSBOARD
export const deletePlace = async(req,res) =>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message:`No user exist with id: ${id}`})
      }
    await TourModal.findByIdAndRemove(id);
    res.json({message: "Tour deleted Successfully"}); 
    }catch(err){
       res.status(404).json({message:"something wrong in delete place"})
    }
}  

//UPDATE PLACE IN DAHSBOARD
export const updatePlace = async(req,res) =>{
    const {id} = req.params;
    const{title,description,creator,imageFile,tags} = req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message:`No place exist with id: ${id}`})
      }
      const updatedPlace = {
         creator,
         title,
         description,
         tags,
         imageFile,
         _id: id,
      }
    await TourModal.findByIdAndUpdate(id,updatedPlace, {new: true});
    res.status(200).json(updatedPlace);
    }catch(err){
       res.status(404).json({message:"something went wrong in update place"})
    }
};  

//SEARCH PLACE 
export const getPlacesBySearch = async(req,res) =>{
    const {searchQuery}  = req.query;
    try{
        const title =  new RegExp(searchQuery, "i");
        const places = await TourModal.find({title});
        res.json(places);
    }catch(err){
        res.status(404).json({message:"something went wrong in search places"});
        res.status(404).json({message:err})
    }
};

//search places by tag
export const getPlacesByTag = async(req,res) =>{
    const {tag}  = req.params;
    try{        
        const places = await TourModal.find({tags:{ $in: tag }});
        res.json(places);
    }catch(err){
        res.status(404).json({message:"something went wrong in search tag"});
        res.status(404).json(err)
    }
};


//Related places by searching tag
export const getRelatedPlaces = async(req,res) =>{
    const tags  = req.body;
    try{        
        const places = await TourModal.find({tags:{ $in: tags }});
        res.json(places);
    }catch(err){
        res.status(404).json({message:"something went wrong in Related places"});
        res.status(404).json(err)
    }
};

// LIKE PLACES
export const likePlace = async(req,res) =>{
    const { id } = req.params;
    try{          
    if(!req.userId){
         return res.json({message:"user is not authenticated"})
    }
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message:`No place exist with id:${id}`});
     }
  const place = await TourModal.findById(id);

  const index = place.likes.findIndex((id) => id === String(req.userId));

  if(index === -1){
      place.likes.push(req.userId)    
  }else{
      place.likes = place.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPlace = await TourModal.findByIdAndUpdate(id, place, {new: true});
  res.status(200).json(updatedPlace);
}catch(err){
    res.status(404).json({message:err.message})
}
};





