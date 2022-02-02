import { Workspace } from "./store/types";
import * as wsBE from "./store/workspaceBE";

export function mockFetchAll(items?: Workspace[]) {
    return jest.spyOn(wsBE, "fetchAll").mockImplementation(() =>
        Promise.resolve(items || [{ id: "w1", name: "www" }])
    );
}

export function mockFetchSelected(productId?: string) {
    return jest.spyOn(wsBE, "fetchSelectedWorkspace").mockImplementation(() =>
        Promise.resolve(productId || "w1")
    );
}

