import reducer from './reducer';

describe("reducer", () => {
    const initialState = {counter : 0}

    describe("When triggering an increase", () => {
        let newState;

        beforeEach(() => {
            newState = reducer(initialState, {type: 'INCREASE'});
        })

        it("should have increased the count", () => {
            expect(newState.counter).toBe(initialState.counter + 1);
        });

        it("should not have modified the original state", () => {
            expect(initialState.counter).toBe(0);
        });
    });

    describe("When triggering an unknown action", () => {
        it("should return the original state", () => {
            expect(reducer(initialState, {type: 'UNKNOWN'})).toBe(initialState);
        });
    })
})