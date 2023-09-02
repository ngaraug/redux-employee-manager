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
    try {
        console.log(data)
    const response = await fetch("https://redux-employee-manager-backend.vercel.app/api/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(data)
    })
        const result = await response.json()
        
        return result
    } catch (err) {
        console.log("Error while posting data")
        return err
    }


} )

// Read Action
    export const readUsers = createAsyncThunk('readUsers', async ()=>{
        

        try {
            const response = await fetch("https://redux-employee-manager-backend.vercel.app/api/read", {
                method: 'GET', 
            })
            const result = await response.json()
            console.log(result)
            return result
        } catch (err) {
            console.log("Error while reading data")
            return err
        }
    })

// Update action
export const updateUser = createAsyncThunk( "updateUser", async (data)=>{
    try {
        const response = await fetch(`https://redux-employee-manager-backend.vercel.app/api/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(data)
        })

 
        const result = await response.json()
        console.log(result)
        return result
    } catch (err) {
        return err
    }
} )

// Delete action
export const deleteUsers = createAsyncThunk('deleteUser', async (id)=>{
    try {
    const response = await fetch(`https://redux-employee-manager-backend.vercel.app/api/delete/${id}`, {
        method: "DELETE",
    })
    
        const result = await response.json()
        console.log(result)
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
            state.users = action.payload
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
            const { success } = action.payload
            if( success ){
                // state.users =  state.users.filter((ele)=> ele.id !== id )
            }
            
        },
        [deleteUsers.rejected]: (state, action)=>{
            state.users = action.payload
        }
    }
})

export default userDetails.reducer;