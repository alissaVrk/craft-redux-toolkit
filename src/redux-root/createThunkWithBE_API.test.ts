import { configureStore } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { AggregatedBackEndAPI, BaseBackEndAPI, registerBackendAPI } from "redux-root";
import { createThunkWithBE_API } from "./createThunkWithBE_API";
import { featuresTestUtils, mockBeApi } from "test-utils"
import { createStore } from "./store";
import {actions as authActions} from "features/auth";
import { beApiOverridesSlice } from "./be-api";

describe("createThunkWithBe_API", () => {
    describe("api with authentications", () => {
        class WithoutUserBE extends BaseBackEndAPI {
            fetchA() {
                return this.axiosInstance.get("AAA");
            }
        }
        class WithUserBE extends BaseBackEndAPI {
            fetchB() {
                return this.axiosInstance.post("BBB");
            }
        }
    
        interface TestAggregated extends AggregatedBackEndAPI {
            withoutUser: WithoutUserBE,
            withUser: WithUserBE
        }
        //@ts-ignore
        registerBackendAPI("withoutUser", WithoutUserBE);
        //@ts-ignore
        registerBackendAPI("withUser", WithUserBE);
    
        function setupBE() {
            jest.spyOn(axios, "create").mockImplementation((config) => ({
                get: (url: string) => Promise.resolve(url),
                post: (url: string) =>
                    config?.headers?.["X-CSRF-TOKEN"]
                        ? Promise.resolve(url)
                        : Promise.reject("BE needs user")
            } as unknown as AxiosInstance));
        }
    
        function getStore(withUser = false) {
            const actionReducer = jest.fn();
            const authState = withUser
                ? featuresTestUtils.auth.getInitializedState()
                : featuresTestUtils.auth.getStateWithoutUser();
    
            const store = configureStore({
                reducer: (state, action) => {
                    if (action.type === "login") {
                        return {
                            ...state,
                            ...featuresTestUtils.auth.getInitializedState()
                        }
                    }
                    actionReducer(action.type);
                    return state;
                },
                preloadedState: authState
            });
    
            return {store, actionReducer};
        }

        it("should create api without user data and successfully dispatch an action that doesn't need it", async () => {
            setupBE();
            const withoutUserAction = createThunkWithBE_API("test/no-user", async (args, api, beApi) => {
                const testBeApi = beApi as TestAggregated;
                return testBeApi.withoutUser.fetchA()
            });
            const {actionReducer, store} = getStore();
            
            actionReducer.mockClear();
            await store.dispatch(withoutUserAction()).unwrap().catch(() => {});;
    
            expect(actionReducer).toHaveBeenCalledTimes(2);
            expect(actionReducer).toHaveBeenNthCalledWith(1, "test/no-user/pending");
            expect(actionReducer).toHaveBeenNthCalledWith(2, "test/no-user/fulfilled");
        });
    
        it("should create api without user data and fail when dispatch an action that does need it", async () => {
            setupBE();
            const withUserAction = createThunkWithBE_API("test/with-user", async (args, api, beApi) => {
                const testBeApi = beApi as TestAggregated;
                return testBeApi.withUser.fetchB();
            });
            const {actionReducer, store} = getStore();
    
            actionReducer.mockClear();
    
            await store.dispatch(withUserAction()).unwrap().catch(() => {});
    
            expect(actionReducer).toHaveBeenCalledTimes(2);
            expect(actionReducer).toHaveBeenNthCalledWith(1, "test/with-user/pending");
            expect(actionReducer).toHaveBeenNthCalledWith(2, "test/with-user/rejected");
        });
    
        it("should create api with user data and succeed when dispatch an action that does need it", async () => {
            setupBE();
            const withUserAction = createThunkWithBE_API("test/with-user", async (args, api, beApi) => {
                const testBeApi = beApi as TestAggregated;
                return testBeApi.withUser.fetchB();
            });
            const {actionReducer, store} = getStore(true);
    
            actionReducer.mockClear();
    
            await store.dispatch(withUserAction()).unwrap().catch(() => {});
            
            expect(actionReducer).toHaveBeenCalledTimes(2);
            expect(actionReducer).toHaveBeenNthCalledWith(1, "test/with-user/pending");
            expect(actionReducer).toHaveBeenNthCalledWith(2, "test/with-user/fulfilled");
        });
    
        it("should create instance with user after user is supplied to store", async () => {
            setupBE();
            const withUserAction = createThunkWithBE_API("test/with-user", async (args, api, beApi) => {
                const testBeApi = beApi as TestAggregated;
                return testBeApi.withUser.fetchB();
            });
            const {actionReducer, store} = getStore();
            
            actionReducer.mockClear();
            await store.dispatch(withUserAction()).unwrap().catch(() => {});
            expect(actionReducer).toHaveBeenNthCalledWith(2, "test/with-user/rejected");
    
            store.dispatch({ type: "login" });
    
            actionReducer.mockClear();
            await store.dispatch(withUserAction()).unwrap().catch(() => { });
            expect(actionReducer).toHaveBeenNthCalledWith(2, "test/with-user/fulfilled");
        });
    })

    describe("override api", () => {
        it("should not override api if non provided", async () => {
            const mockedApi = mockBeApi(); 
            const store = createStore();

            await store.dispatch(authActions.login({email: "em", pass:"sd"})).unwrap();

            expect(mockedApi.auth.login).toHaveBeenCalled();
        });

        it("should override api functions", async () => {
            const mockedApi = mockBeApi(); 
            const store = createStore();

            const otherLogin = jest.fn().mockResolvedValue({
                token: "ttoken", userInfo: {id: "otherId"}
            });
            store.dispatch(beApiOverridesSlice.actions.overrideApis({
                auth: {login: otherLogin},
            }))

            await store.dispatch(authActions.login({email: "em", pass:"sd"})).unwrap();

            expect(mockedApi.auth.login).toHaveBeenCalled();
        });
    })
})