import { configureStore } from "@reduxjs/toolkit";
import saveAPIdata from "../page/task_list/redux/saveApiData.ts";
import {stateName} from "../assets/constants";

export const store = configureStore({
    reducer: {
        [stateName.taskList]:saveAPIdata,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch;