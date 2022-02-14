import { createSimpleReactiveStore } from "./connectUtils/SimpleReactiveStore";
import ReactDOM from "react-dom";
import { StoreType } from "redux-root";
import { Provider } from 'react-redux';

const store = createSimpleReactiveStore();

type CompType = (...args: any) => JSX.Element | null;

export function wrapComponentWithProviders<T extends CompType>(Comp: T, reduxStore: StoreType) {
    return (props: React.ComponentProps<T>) => (
        <div className="rtw">
            <Provider store={reduxStore}>
                <Comp {...props} />
            </Provider>
        </div>
    )
}

export function initProviders(parentNode: HTMLElement | null) {
    if (!parentNode) {
        throw new Error("there is no root for us..");
    }

    const App = () => {
        return (
            <></>
        )
    }

    ReactDOM.render(<App />, parentNode);
}