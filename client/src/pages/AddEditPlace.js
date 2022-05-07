    import React, { useEffect, useState } from 'react'
    import {
        MDBCard,
        MDBCardBody,
        MDBValidation,
        MDBBtn,
        MDBInput
    } from "mdb-react-ui-kit"
    import ChipInput from "material-ui-chip-input";  /// change font to tag
    import FileBase from "react-file-base64";
    import {toast} from "react-toastify";
    import { useNavigate, useParams } from 'react-router-dom';
    import { useDispatch,useSelector } from 'react-redux'; 
import { createPlace,updatePlace } from '../redux/features/placeSlice';
import Spinner from '../components/Spinner';
     
    const initialState ={
        title:"",
        description:"",
        tags:[]
    }

    const AddEditPlace = () => {
      
    const [placeData,setPlaceData]  = useState(initialState);
    const [tagErrMsg,setTagErrMsg]  = useState(null);
    const {error,loading,userPlaces} = useSelector((state) => ({...state.place}));
    const { user } = useSelector((state)=>({...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {title,description,tags} = placeData;
    const {id} = useParams();

    useEffect(() => {
        if(id){
            const singlePlace = userPlaces.find((place) => place._id === id);            
            setPlaceData({...singlePlace});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);
    
    useEffect(()=>{
        error && toast.error(error) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[error]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(loading){
            return <Spinner/>
        }

        if(!tags.length){
            setTagErrMsg("Please Provide Some tag");
        }

        if(title && description && tags){
            const updatedPlaceData = {...placeData, name: user?.result?.name };     

            if(!id){
                dispatch(createPlace({placeData,navigate,toast }));
            }else{ 
                dispatch(updatePlace({id,updatedPlaceData,navigate,toast }));
            }
            handleClear();
        }
    };
    const onInputChange = (e) =>{
        const {name,value} = e.target;
        setPlaceData({...placeData,[name]:value});
    };

    const handleAddTag = (tag) =>{
        setTagErrMsg(null);
        setPlaceData({...placeData,tags:[...placeData.tags,tag]})
    }
    const handleDeleteTag = (deleteTag) =>{
        setTagErrMsg(null);
        setPlaceData({...placeData,tags: placeData.tags.filter((tag)=> tag !== deleteTag)})
    }
    const handleClear = () => {
        setPlaceData({ title:"",description:"",tags:[] })
    };

      return (
        <div style={{
            margin:"auto",
            padding: "15px",
            maxWidth:"450px",
            alignContent:"center",
            marginTop:"120px",
        }} className="container" >
            <MDBCard alignment='center'>
                <h5>{id ? "Update place" : "Add Place"}</h5>
                <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                    <div className='col-md-12'>
                       <MDBInput
                       placeholder='Enter Title'
                          type="text"
                          value={title || ""}
                          name="title"
                          onChange={onInputChange}                          
                          className="form-control"
                          required
                          invalid                 
                          validation ="please provide Title"         
                       />
                    </div>
                    <div className='col-md-12'>
                       <MDBInput
                          placeholder='Enter Description'
                          type="text"
                          value={description}                           
                          name="description"
                          onChange={onInputChange}
                          className="form-control"
                          required
                          textarea
                          rows={4}
                          invalid
                          validation='please provide Email Address'
                       />
                    </div>
                    <div className='col-md-12'>
                         <ChipInput
                         name="tags"
                         variant='outlined'
                         placeholder='Enter Tag without "#" and hit enter to add'
                         fullWidth
                         value={tags}
                         onAdd={(tag) => handleAddTag(tag)}
                         onDelete={(tag) => handleDeleteTag(tag)}   
                         />
                         {tagErrMsg && (
                             <div className='tagErrMsg'>{tagErrMsg}</div>
                         )}
                    </div>
                    <div className='d-flex justify-content-start'>
                         <FileBase 
                         type="file" 
                         multiple={false} 
                         onDone={(({base64}) =>
                              setPlaceData({...placeData,imageFile:base64})
                              )}
                        />
                    </div>
                    <div className='col-md-12'>
                         <MDBBtn 
                         style={{width:"100%"}}>{id ? "Update" : "Submit"}</MDBBtn>
                         <MDBBtn 
                         style={{width:"100%"}} 
                         className="mt-2" 
                         color='danger' 
                         onClick={handleClear}> 
                             Clear
                         </MDBBtn>
                    </div>
                </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>   
      )
    }
    
    export default AddEditPlace