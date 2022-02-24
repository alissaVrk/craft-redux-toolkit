import { createSimpleReactiveStore } from "./connectUtils/SimpleReactiveStore";
import ReactDOM from "react-dom";
import { StoreType } from "redux-root";
import { Provider } from 'react-redux';
import { itemSelectionContext } from "features/craft-items";
import { ContextListener, LinkProvider } from "./connectUtils/contextSync";
import { SelectionProviderWithNG } from "./apis/itemsSelection";


const store = createSimpleReactiveStore();

type CompType = (...args: any) => JSX.Element | null;

export function wrapComponentWithProviders<T extends CompType>(Comp: T, reduxStore: StoreType) {
    return (props: React.ComponentProps<T>) => (
        <div className="rtw">
            <Provider store={reduxStore}>
                <LinkProvider 
                    context={itemSelectionContext.SelectionContext} 
                    defaultContextValue={itemSelectionContext.defaultValue}
                    path="itemSelection"
                    simpleStore={store}
                >
                    <Comp {...props} />
                </LinkProvider>
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
            <SelectionProviderWithNG>
                <ContextListener 
                    context={itemSelectionContext.SelectionContext} 
                    path="itemSelection"
                    simpleStore={store}
                />
            </SelectionProviderWithNG>
        )
    }

    ReactDOM.render(<App />, parentNode);
}