import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import PlaceReducer from "./features/placeSlice";

export default configureStore({
    reducer:{
        auth: AuthReducer,
        place:PlaceReducer
    },
})