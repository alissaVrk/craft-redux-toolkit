import { EntityId } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import { SelectionProvider, useSelectionContext } from "./SelectionProvider";

describe("selection provider", () => {
    const SelectingComponent = ({ id }: { id: string }) => {
        const { selectItem } = useSelectionContext();
        return <>
            <button data-testid={`unselect_${id}`} onClick={() => selectItem(id, false, 1)} ></button>
            <button data-testid={`select_${id}`} onClick={() => selectItem(id, true, 1)} ></button>
        </>
    }

    const ShowingSelection = ({ id }: { id: string }) => {
        const renderCount = useRef(0);
        renderCount.current++;
        const { useIsSelected } = useSelectionContext();
        const isSelected = useIsSelected(id);
        return <>
            <div data-testid={`show_${id}`}>{id}_{isSelected ? "true" : "false"}</div>
            <div data-testid={`count_${id}`}>{renderCount.current}</div>
        </>
    }

    function SelectedIds({ name }: { name?: string }) {
        const { useSelectedIds } = useSelectionContext();
        const selectedIds = useSelectedIds();
        return <div data-testid={name ? `ids_${name}` : "ids"}>{selectedIds.join(",")}</div>
    }

    describe("onSelectionChanged - passed cb", () => {
        it("should call the passed cb when seleted items change - select", () => {
            const cb = jest.fn();
            const rendered = render(<SelectionProvider onSelectionChanged={cb}>
                <SelectingComponent id="1" />
            </SelectionProvider>)

            const btn = rendered.getByTestId("select_1");
            fireEvent.click(btn);

            expect(cb).toHaveBeenCalledTimes(1);
            expect(cb).toHaveBeenCalledWith("1", expect.anything(), true);
        });

        it("should call the passed cb when seleted items change - multiple", () => {
            const cb = jest.fn();
            const rendered = render(<SelectionProvider onSelectionChanged={cb}>
                <SelectingComponent id="1" />
                <SelectingComponent id="2" />
            </SelectionProvider>)

            const btn1 = rendered.getByTestId("select_1");
            fireEvent.click(btn1);
            expect(cb).toHaveBeenCalledWith("1", expect.anything(), true);
            const btn2 = rendered.getByTestId("select_2");
            fireEvent.click(btn2);

            expect(cb).toHaveBeenCalledTimes(2);
            expect(cb).toHaveBeenLastCalledWith("2", expect.anything(), true);
        });

        it("should call the passed cb when selected items change - unselect", () => {
            const cb = jest.fn();
            const rendered = render(<SelectionProvider onSelectionChanged={cb}>
                <SelectingComponent id="1" />
            </SelectionProvider>)

            const btn = rendered.getByTestId("select_1");
            fireEvent.click(btn);
            expect(cb).toHaveBeenCalledWith("1", expect.anything(), true);

            const btnUn = rendered.getByTestId("unselect_1");
            fireEvent.click(btnUn);
            expect(cb).toHaveBeenLastCalledWith("1", expect.anything(), false);
        });
    });

    describe("useIsSelected - single show select state item", () => {
        it("state should be false initially", () => {
            const rendered = render(<SelectionProvider>
                <SelectingComponent id="1" />
                <ShowingSelection id="1" />
            </SelectionProvider>)

            const comp1 = rendered.getByTestId("show_1")
            expect(comp1.textContent).toBe("1_false");
        });

        it("state should be changed to true", async () => {
            const rendered = render(<SelectionProvider>
                <SelectingComponent id="1" />
                <ShowingSelection id="1" />
            </SelectionProvider>)

            const btn = rendered.getByTestId("select_1");
            fireEvent.click(btn);

            const comp1 = rendered.getByTestId("show_1")
            expect(comp1.textContent).toBe("1_true");
        });

        it("should render only the component whose state was changed", () => {
            const rendered = render(<SelectionProvider>
                <SelectingComponent id="1" />
                <ShowingSelection id="1" />
                <ShowingSelection id="2" />
            </SelectionProvider>)

            const btn = rendered.getByTestId("select_1");
            fireEvent.click(btn);

            const count1 = rendered.getByTestId("count_1");
            const count2 = rendered.getByTestId("count_2");

            expect(count1.textContent).toBe("2");
            expect(count2.textContent).toBe("1");
        });

        it("should leave no trace when component unmounted", () => {
            const rendered = render(<SelectionProvider>
                <SelectingComponent id="1" />
                <ShowingSelection id="1" />
            </SelectionProvider>);

            rendered.rerender(<SelectionProvider>
                <SelectingComponent id="1" />
            </SelectionProvider>);

            const errorSpy = jest.spyOn(console, "error");

            const btn = rendered.getByTestId("select_1");
            fireEvent.click(btn);

            expect(errorSpy).not.toHaveBeenCalled();
        });

        it("should support only one component per itemId - lazy", () => {
            expect(() => render(<SelectionProvider>
                <ShowingSelection id="1" />
                <ShowingSelection id="1" />
            </SelectionProvider>)).toThrow("did not implement support for multiple components per itemId");
        });
    });

    describe("useSelectedIds - item showing general state", () => {
        it("should start with empty array", () => {
            const rendered = render(<SelectionProvider>
                <SelectedIds />
            </SelectionProvider>);

            const comp = rendered.getByTestId("ids")
            expect(comp.textContent).toBe("");
        });

        it("should render for item selected", () => {
            const rendered = render(<SelectionProvider>
                <SelectingComponent id="1" />
                <SelectedIds />
            </SelectionProvider>);

            const btn = rendered.getByTestId("select_1");
            fireEvent.click(btn);

            const comp = rendered.getByTestId("ids")
            expect(comp.textContent).toBe("1");
        });

        it("should remove unselected item", () => {
            const rendered = render(<SelectionProvider>
                <SelectingComponent id="1" />
                <SelectingComponent id="2" />
                <SelectedIds />
            </SelectionProvider>);

            const btn1 = rendered.getByTestId("select_1");
            fireEvent.click(btn1);
            const btn2 = rendered.getByTestId("select_2");
            fireEvent.click(btn2);

            const comp = rendered.getByTestId("ids")
            expect(comp.textContent).toBe("1,2");

            const unselect = rendered.getByTestId("unselect_1");
            fireEvent.click(unselect);

            expect(comp.textContent).toBe("2");
        });

        it("should leave no trace when component unmounted", () => {
            const rendered = render(<SelectionProvider>
                <SelectingComponent id="1" />
                <SelectedIds />
            </SelectionProvider>);

            rendered.rerender(<SelectionProvider>
                <SelectingComponent id="1" />
            </SelectionProvider>);

            const errorSpy = jest.spyOn(console, "error");

            const btn = rendered.getByTestId("select_1");
            fireEvent.click(btn);

            expect(errorSpy).not.toHaveBeenCalled();
        });

        it("should support multiple components", () => {
            const rendered = render(<SelectionProvider>
                <SelectingComponent id="1" />
                <SelectedIds name="A" />
                <SelectedIds name="B" />
            </SelectionProvider>);

            const compA = rendered.getByTestId("ids_A")
            expect(compA.textContent).toBe("");
            const compB = rendered.getByTestId("ids_B")
            expect(compB.textContent).toBe("");

            const btn = rendered.getByTestId("select_1");
            fireEvent.click(btn);

            expect(compA.textContent).toBe("1");
            expect(compB.textContent).toBe("1");
        })
    });

    describe("registerToSelectItems - select all", () => {
        it("should select all", () => {
            const cb = jest.fn();
            let handleToolbarSelection: (ids: EntityId[]) => void;
            const rendered = render(<SelectionProvider registerToSelectItems={cb => handleToolbarSelection = cb} onSelectionChanged={cb}>
                <ShowingSelection id="1" />
                <ShowingSelection id="2" />
                <SelectedIds />
            </SelectionProvider>)
            //@ts-ignore
            handleToolbarSelection(["1", "2"]);

            const comp1 = rendered.getByTestId("show_1")
            expect(comp1.textContent).toBe("1_true");
            const comp2 = rendered.getByTestId("show_2")
            expect(comp2.textContent).toBe("2_true");

            const all = rendered.getByTestId("ids");
            expect(all.textContent).toBe("1,2");
            expect(cb).not.toHaveBeenCalled();
        });

        it("should unselect all", () => {
            const cb = jest.fn();
            let handleToolbarSelection: (ids: EntityId[]) => void;
            const rendered = render(<SelectionProvider registerToSelectItems={cb => handleToolbarSelection = cb} onSelectionChanged={cb}>
                <ShowingSelection id="1" />
                <ShowingSelection id="2" />
                <SelectedIds />
                <SelectingComponent id="1" />
            </SelectionProvider>)
            const all = rendered.getByTestId("ids");

            const btn = rendered.getByTestId("select_1");
            fireEvent.click(btn);
            expect(all.textContent).toBe("1");
            cb.mockReset();

            //@ts-ignore
            handleToolbarSelection([]);

            const comp1 = rendered.getByTestId("show_1")
            expect(comp1.textContent).toBe("1_false");
            const comp2 = rendered.getByTestId("show_2")
            expect(comp2.textContent).toBe("2_false");

            expect(all.textContent).toBe("");
            expect(cb).not.toHaveBeenCalled();
        });
    });
});