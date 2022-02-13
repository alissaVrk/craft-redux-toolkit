import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AggregatedBackEndAPI } from ".";

type PartialTwoLevel<T> = Partial<{[key in keyof T]: Partial<T[key]>}>

export const beApiOverridesSlice = createSlice({
    name: "beOverrides",
    initialState: {} as PartialTwoLevel<AggregatedBackEndAPI>,
    reducers: {
        overrideApis: (state, action: PayloadAction<PartialTwoLevel<AggregatedBackEndAPI>>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})