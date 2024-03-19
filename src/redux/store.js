import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./user/userSlice"
import noteSlice from "./note/noteSlice"


export const store = configureStore({
    reducer:{
        user:userSlice,
        note:noteSlice
    }
})