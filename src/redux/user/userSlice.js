import { createSlice } from "@reduxjs/toolkit";
import { authUser, createUser, logInUser, logoutUser } from "./userController";

const initialState = {
    user:{},
    isAuthenticate:false,
    status:null,
    error:null,
    message:null,
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
            state.status ="regSuccess";
            state.message = action.payload.message 
            state.isAuthenticate = true;
            state.user = action.payload.user
            localStorage.setItem("token" , action.payload.token)
        } )


        builder.addCase(createUser.rejected , (state , action)=>{
            state.error=action.error.message
            state.status="rejected"
            state.isAuthenticate=false
            state.message = action.error.message
        })

        builder.addCase(logInUser.pending , (state , action)=>{
            state.status="pending"
            state.error =null
            state.isAuthenticate=false
            state.user = {}
            state.message = null
        })
       
        builder.addCase(logInUser.fulfilled ,(state , action)=>{
            //  state.error = action.payload
            state.status ="loginSuccess";
            state.message = action.payload?.message 
            state.isAuthenticate = true;
            state.user = action.payload?.user
            localStorage.setItem("token" , action.payload?.token)
        } )


        builder.addCase(logInUser.rejected , (state , action)=>{
            state.error=action.payload.error
            state.status="rejected"
            state.isAuthenticate=false
            state.message = action.payload.error
        })



        builder.addCase(authUser.pending , (state , action)=>{
            state.status="pending"
            state.error =null
            state.isAuthenticate=false
            state.user = {}
            state.message = null
        })
       
        builder.addCase(authUser.fulfilled ,(state , action)=>{
            //  state.error = action.payload
            state.status ="success";
            state.message = action.payload.message 
            state.isAuthenticate = true;
            state.user = action.payload.user
            // localStorage.setItem("token" , action.payload.token)
        } )


        builder.addCase(authUser.rejected , (state , action)=>{
            state.error=action.error.message
            state.status="rejected"
            state.isAuthenticate=false
            state.message = action.error.message
        })


        builder.addCase(logoutUser.pending , (state , action)=>{
            state.status="pending"
            state.error =null
            state.isAuthenticate=false
            state.user = {}
            state.message = null
        })
       
        builder.addCase(logoutUser.fulfilled ,(state , action)=>{
            //  state.error = action.payload
            state.status ="success";
            state.message = action.payload.message 
            state.isAuthenticate = false;
            state.user = {}
            localStorage.setItem("token" , '')
        } )


        builder.addCase(logoutUser.rejected , (state , action)=>{
            state.error=action.error.message
            state.status="rejected"
            state.isAuthenticate=false
            state.message = action.error.message
        })


    }
})


export default userSlice.reducer