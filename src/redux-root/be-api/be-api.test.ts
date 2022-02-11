import { AxiosInstance } from "axios";
import {BaseBackEndAPI, AggregatedBackEndAPI} from "./types";
import {registerBackendAPI, BE_API} from "./aggregator"

describe("backend api", () => {
    it("should create api from base api", () => {
        class TestAPI extends BaseBackEndAPI {
            fetchSome() {
                this.axiosInstance.get("AAA");
            }
        }

        const http = jest.fn();
        const api = new TestAPI({get: http} as unknown as AxiosInstance);
        api.fetchSome();

        expect(http).toHaveBeenCalledWith("AAA");
    });

    //can't test adding properties to the interface type :(
    it("should create aggregated api", () => {
        class TestAPIA extends BaseBackEndAPI {
            fetchA() {
                this.axiosInstance.get("AAA");
            }
        }
        class TestAPIB extends BaseBackEndAPI {
            fetchB() {
                this.axiosInstance.get("BBB");
            }
        }
        
        interface TestAggregated extends AggregatedBackEndAPI {
            apiA: TestAPIA,
            apiB: TestAPIB
        }
        //@ts-ignore
        registerBackendAPI("apiA", TestAPIA);
        //@ts-ignore
        registerBackendAPI("apiB", TestAPIB);

        const http = jest.fn();
        const api = {get: http} as unknown as AxiosInstance;
        const instance = BE_API.createInstance(api) as TestAggregated;

        expect(instance.apiA).toBeInstanceOf(TestAPIA);
        expect(instance.apiB).toBeInstanceOf(TestAPIB);

        instance.apiA.fetchA();
        instance.apiB.fetchB();

        expect(http).toHaveBeenCalledTimes(2);
    });
})