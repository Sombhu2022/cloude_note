import { createSlice } from "@reduxjs/toolkit";
import { allNote, createNote, deleteNote, editNote, selectNote } from "./noteController.js";

const initialState = {
    note:[],
    noteSelect:{},
    status: "ideal" ,
    error:null ,
    message:null
}

export const noteSlice = createSlice({
    name:"note" ,
    initialState ,
    reducers:{

    },
    extraReducers:(builder)=>{

        // create note
        builder.addCase( createNote.pending , (state , action)=>{
            state.status = "pending"
            state.error = null
            state.message = null
        })
        builder.addCase( createNote.fulfilled , (state , action)=>{
            state.status = "createSuccess"
            state.error = null
            state.message = null
            state.noteSelect={}
            state.note.push(action.payload.note)
        })
        builder.addCase( createNote.rejected , (state , action)=>{
            state.status = "rejected"
            state.noteSelect={}
            state.error = action.error.message
            state.message = action.error.message
        })

        // all note get

        builder.addCase( allNote.pending , (state , action)=>{
            state.status = "pending"
            state.error = null
            state.message = null
            state.noteSelect={}
        })
        builder.addCase( allNote.fulfilled , (state , action)=>{
            state.status = "success"
            state.error = null
            state.message = null
            state.note = action.payload.note
            state.noteSelect={}
        })
        builder.addCase( allNote.rejected , (state , action)=>{
            state.status = "rejected"
            state.error = action.error.message
            state.message = action.error.message
        })

    //    delete note
        builder.addCase( deleteNote.pending , (state , action)=>{
            state.status = "pending"
            state.noteSelect={}
            state.error = null
            state.message = null
        })
        builder.addCase( deleteNote.fulfilled , (state , action)=>{
            state.status = "delSuccess"
            state.noteSelect={}
            state.error = null
            state.message = null
            // state.note.pop(action.payload.note)
            // state.note = state.note.filter(ele=> ele !== action.payload.note)
            // console.log(state.note);
            state.note = action.payload.note
        })
        builder.addCase( deleteNote.rejected , (state , action)=>{
            state.status = "rejected"
            state.error = action.error.message
            state.message = action.error.message
        })

        // select note 
        builder.addCase( selectNote.pending , (state , action)=>{
            state.status = "pending"
            state.error = null
            state.message = null
            state.noteSelect = {}
        })
        builder.addCase( selectNote.fulfilled , (state , action)=>{
            state.status = "selectSuccess"
            state.error = null
            state.message = null
            state.noteSelect=action.payload.note
            // console.log(state.selectNote);
        })
        builder.addCase( selectNote.rejected , (state , action)=>{
            state.status = "rejected"
            state.error = action.error.message
            state.message = action.error.message
            state.noteSelect={}
        })


        //edit note
        builder.addCase( editNote.pending , (state , action)=>{
            state.status = "pending"
            state.error = null
            state.message = null
        })
        builder.addCase( editNote.fulfilled , (state , action)=>{
            state.status = "editSuccess"
            state.error = null
            state.message = "edit success"
            // state.note.pop(action.payload.note)
            state.noteSelect={}
            state.note = action.payload.note
            // let select= state.note.filter(ele=> ele === action.payload.note)
            // console.log(select);
        })
        builder.addCase( editNote.rejected , (state , action)=>{
            state.status = "rejected"
            state.error = action.error.message
            state.message = action.error.message
        })

    }
        
})


export default noteSlice.reducer