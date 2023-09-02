import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk( "createUser", async (data)=>{

// Create action
    // const response = await fetch("https://64f245410e1e60602d24f4e5.mockapi.io/crud", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     }, 
    //     body: JSON.stringify(data)
    // })

    const response = await fetch("http://localhost:3000/api/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(data)
    })

    try {
        console.log(response)
        const result = response.json()
        return result
    } catch (err) {
        console.log("Error while posting data")
        return err
    }


} )

// Read Action
    export const readUsers = createAsyncThunk('readUsers', async ()=>{
        const response = await fetch("https://64f245410e1e60602d24f4e5.mockapi.io/crud", {
            method: 'GET', 
        })

        try {
            const result = response.json()
            return result
        } catch (err) {
            console.log("Error while reading data")
            return err
        }
    })

// Update action
export const updateUser = createAsyncThunk( "updateUser", async (data)=>{
    const response = await fetch(`https://64f245410e1e60602d24f4e5.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(data)
    })

    try {
        const result = response.json()
        return result
    } catch (err) {
        return err
    }
} )

// Delete action
export const deleteUsers = createAsyncThunk('deleteUser', async (id)=>{
    const response = await fetch(`https://64f245410e1e60602d24f4e5.mockapi.io/crud/${id}`, {
        method: "DELETE",

    })

    try {
        const result = response.json()
        return result
    } catch (err) {
        console.log("Error while deleting")
        return err
    }
})

// Reducer section
export const userDetails = createSlice({
    name:"userDetails",
    initialState: {
        users: [],
        error: null
    },
    extraReducers:{
        // Create
        [createUser.fulfilled]: (state, action)=>{
            state.users.push(action.payload)
        },
        [createUser.rejected]: (state, action)=>{
            state.users = action.payload
        },
        // Read
        [readUsers.fulfilled]: (state, action)=>{
            state.users  = action.payload
        },
        [readUsers.rejected]: (state, action)=>{
            state.users = action.payload()
        },
        // Update
        [updateUser.fulfilled]: (state, action)=>{
            state.users = state.users.map((ele)=>{
                return ele.id === action.payload.id ? action.payload : ele
            }) 
        },
        [updateUser.rejected]: (state, action)=>{
            state.users = action.payload
        },
        // Delete
        [deleteUsers.fulfilled]: (state, action)=>{
            // state.users  = action.payload
            const { id } = action.payload
            if( id ){
                state.users =  state.users.filter((ele)=> ele.id !== id )
            }
            
        },
        [deleteUsers.rejected]: (state, action)=>{
            state.users = action.payload()
        }
    }
})

export default userDetails.reducer;