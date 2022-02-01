import * as wsBE from "./store/workspaceBE";

export function mockFetchAll() {
    const spy = jest.spyOn(wsBE, "fetchAll").mockImplementation(() =>
        Promise.resolve([{ id: "w1", name: "www" }])
    );

    return spy;
}