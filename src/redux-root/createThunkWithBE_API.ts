import {createAsyncThunk, AsyncThunkPayloadCreator, AsyncThunkPayloadCreatorReturnValue, createSelector } from "@reduxjs/toolkit"
import { RootState, ThunkConfig } from "./types";
import { AggregatedBackEndAPI, BE_API } from "redux-root";
import { getAxiosInstance } from "./fetchHelpers";
import {selectors as authSelectors} from "features/auth"
import { isEmpty, merge } from "lodash";

type AppThunkCreator<Returned, ThunkArgs = void> = AsyncThunkPayloadCreator<Returned, ThunkArgs, ThunkConfig>
type ParamsOfCreator<Returned, ThunkArgs> = Parameters<AppThunkCreator<Returned, ThunkArgs>>
type AppThunkAPI<Returned, ThunkArgs> = ParamsOfCreator<Returned, ThunkArgs>["1"]

type AppThunkCreatorWithBE_API<Returned, ThunkArgs = void> =
    (arg: ThunkArgs, thunkAPI: AppThunkAPI<Returned, ThunkArgs>, beAPI: AggregatedBackEndAPI) =>
        AsyncThunkPayloadCreatorReturnValue<Returned, ThunkConfig>


const selectBE_API = createSelector(
    (state: RootState) => {
        return authSelectors.selectUserBaseInfo(state)
    },
    (state: RootState) => state.beOverrides,
    (authBase, overrides) => {
        const axiosInstance = getAxiosInstance(authBase);
        const instance = BE_API.createInstance(axiosInstance);
        return isEmpty(overrides) ? instance : merge(instance, overrides);
    }
)

export function createThunkWithBE_API<Returned, ThunkArgs = void>
    (typePrefix: string, payloadCreator: AppThunkCreatorWithBE_API<Returned, ThunkArgs>) {
    return createAsyncThunk<Returned, ThunkArgs, ThunkConfig>(typePrefix, (args, api) => {
        const rootState = api.getState();
        const beApi = selectBE_API(rootState);
        return payloadCreator(args, api, beApi);
    })
}