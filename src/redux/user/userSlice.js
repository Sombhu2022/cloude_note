import { createSlice } from "@reduxjs/toolkit";
import { createUser, logInUser } from "./userController";

const initialState = {
    user:{},
    isAuthenticate:false,
    status:null,
    error:null,
    message:null
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase( createUser.pending , (state , action)=>{
            state.status ="pending";
            state.error =null
            state.isAuthenticate=false
            state.user = {}
            state.message = null
        })

        builder.addCase(createUser.fulfilled ,(state , action)=>{
            //  state.error = action.payload
            state.status ="success";
            state.message = action.payload.message 
            state.isAuthenticate = true;
            state.user = action.payload.user
            
        } )


        builder.addCase(createUser.rejected , (state , action)=>{
            state.error=action.error.message
            state.status="rejected"
            state.isAuthenticate=false
            state.message = action.error.message
        })

        builder.addCase(logInUser.pending , (state , action)=>{
            state.status="panding"
            state.error =null
            state.isAuthenticate=false
            state.user = {}
            state.message = null
        })
       
        builder.addCase(logInUser.fulfilled ,(state , action)=>{
            //  state.error = action.payload
            state.status ="success";
            state.message = action.payload.message 
            state.isAuthenticate = true;
            state.user = action.payload.user
            
        } )


        builder.addCase(logInUser.rejected , (state , action)=>{
            state.error=action.error.message
            state.status="rejected"
            state.isAuthenticate=false
            state.message = action.error.message
        })


    }
})


export default userSlice.reducer