import { createSimpleReactiveStore } from "./SimpleReactiveStore";
import ReactDOM from "react-dom";

const store = createSimpleReactiveStore();

type CompType = (...args: any) => JSX.Element | null;

export function wrapComponentWithProviders<T extends CompType>(Comp: T) {
    return (props: React.ComponentProps<T>) => (
        <div className="rtw">
            <Comp {...props} />
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