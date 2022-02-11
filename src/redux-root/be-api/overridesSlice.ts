import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AggregatedBackEndAPI } from ".";

export const beApiOverridesSlice = createSlice({
    name: "beOverrides",
    initialState: {} as Partial<AggregatedBackEndAPI>,
    reducers: {
        overrideApis:(state, action:PayloadAction<Partial<AggregatedBackEndAPI>>) => ({
            ...state,
            ...action.payload
        })
    }
})