import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null,
}
const saveAPIdata = createSlice({
    name: 'saveData',
    initialState,
    reducers :{
        taskList:(state, action)=>{
            state.data = action.payload;
        }
    }
})
export const {taskList} = saveAPIdata.actions;
export default saveAPIdata.reducer;