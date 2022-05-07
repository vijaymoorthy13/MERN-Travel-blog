import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

// SIGN IN
export const signin = async (req,res) =>{
    const {email,password} = req.body;

    try{ 

       const oldUser = await UserModal.findOne({email});
       if(!oldUser) return res.status(404).json({messsage:"user doesn't exist"})

       const isPasswordCorrect = await bcrypt.compare(password,oldUser.password);
       if(!isPasswordCorrect) return res.status(400).json({messsage:"Invalid credentials"});

       const token = jwt.sign({email: oldUser.email, id:oldUser._id}, secret, {expiresIn:"1h"})
       res.status(200).json({result:oldUser,token})
    }catch(err){
        res.status(500).json({messsage:"something wrong"});
        console.log(err)
    }
}


// SIGN UP
export const signup = async (req,res) =>{
   const {email,password,firstName,lastName} = req.body;
   try{
       const oldUser = await UserModal.findOne({email});

       if(oldUser){
          return res.status(400).json({messsage:"user already exists "})
       }
       const hashedPassword = await bcrypt.hash(password,12);

       const result = await UserModal.create({
           email:email,
           password:hashedPassword,
           name: `${firstName} ${lastName}`,
       })
       const token = jwt.sign({email:result.email,id:result._id},secret, {expiresIn: "1h" });
       res.status(201).json({result,token});
   } catch(error){
      res.status(500).json({messsage:"something wrong"});
      console.log(error)
   }
};


//GOOGLE SIGN IN
export const googleSignIn = async (req,res) =>{
   const { email, name, token, googleId } = req.body;

   try{
      const oldUser = await UserModal.findOne({email});
      if(oldUser){
        const result = {_id: oldUser._id.toString(), email, name}
       return res.status(200).json({result, token}) 
      }        
      const result = await UserModal.create({
          email,
          name,
          googleId
      });
      res.status(200).json({result,token});
   }catch(error){
    res.status(500).json({messsage:"something wrong"});
    console.log(error)
   }

}
