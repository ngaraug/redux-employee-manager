import { configureStore } from "@reduxjs/toolkit";
import  userDetails  from "./sliceUserDetails";

export const store =  configureStore({
    reducer :{
        app: userDetails
    }
})