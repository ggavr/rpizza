import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

// First, create the thunk
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {currentPage, category, sortBy, order, search } = params;
        const {data} = await axios.get(
            `https://6321b7a6fd698dfa29fd6b7d.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`
        );
        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems (state, action) {
            state.items = action.payload
        }
    },
    extraReducers:{
        [fetchPizzas.pending]:(state)=>{
            console.log('pending')
            state.status = 'loading'
            state.items=[]

        },
        [fetchPizzas.fulfilled]:(state, action)=>{
            console.log('OK')
            state.items=action.payload
            state.status = 'success'}
        ,
        [fetchPizzas.rejected]:(state)=>{
            console.log('error')
            state.status = 'error'
            state.items=[]

        }
    }
})

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer