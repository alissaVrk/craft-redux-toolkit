// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

type Selector = {memoizedResultFunc: {clearCache:() => void}}
jest.mock("axios");
jest.mock("@reduxjs/toolkit", () => {
    const actual = jest.requireActual("@reduxjs/toolkit");
    const selectors: Selector[] = [];
    function forTestCreateSelector(...args: Parameters<typeof actual.createSelector>) {
        const selector = actual.createSelector(...args);
        selectors.push(selector);
        return selector;
    }

    function clearAll(){
        selectors.forEach(sel => sel.memoizedResultFunc.clearCache())
    }

    return {
        ...jest.requireActual("@reduxjs/toolkit"),
        createSelector: forTestCreateSelector,
        clearAll: () => {
            clearAll();
        }
    };
})

import toolkit from "@reduxjs/toolkit";

beforeEach(() => {
    //@ts-ignore
    toolkit.clearAll();
})