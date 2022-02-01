import * as wsBE from "./workspaceBE";

export function mockFetchAll() {
    const spy = jest.spyOn(wsBE, "fetchAll").mockImplementation(() =>
        Promise.resolve([{ id: "w1" }])
    );

    return spy;
}