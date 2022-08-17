// SELECT ELEMENT
const addCounterBtn = document.getElementById("addCounter");
const resetBtn = document.getElementById("reset");
const container = document.getElementById("container");
const newCountersContainer = document.getElementById("newCounter");

// InitialState
const initialState = {
    counter: [
        {
            id: 1,
            value: 0
        }
    ]
};

// ACTION IDENTIFIERS
const INCREMENT = "increment";
const DECREMENT = "decrement";
const NEW_COUNTER = "addition";
const RESET = "reset";

// ACTION CREATORS
const increment = (id, value) => {
    return {
        type: INCREMENT,
        payload: {
           id: id,
           value: value
        }
    };
};

const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: {
           id: id,
           value: value
        }
    };
};

const addCounter = (id) => {
    return {
        type: NEW_COUNTER,
        payload: {
           id: id
        }
    };
};

const reset = () => {
    return {
        type: RESET,
    };
};

// REDUCER
const countReducer = (state = initialState, action) => {
    switch(action.type){
        case INCREMENT: 
             const newIncrement = {
                ...state,
                counter: [
                    ...state.counter
                ]
             }

            const incrementCounter = newIncrement.counter.find(counter => counter.id === action.payload.id);
            incrementCounter.value = incrementCounter.value + action.payload.value;

            return newIncrement;
        case DECREMENT:
            const newDecrement = {
                ...state,
                counter: [
                    ...state.counter
                ]
            }

            const decrementCounter = newDecrement.counter.find(counter => counter.id === action.payload.id);
            decrementCounter.value = decrementCounter.value - action.payload.value;

            return newDecrement;
        case NEW_COUNTER:
            const newCounter = {
                ...state,
                counter: [
                    ...state.counter,
                    {
                        id: action.payload.id,
                        value: 0
                    }
                ]
            }

            return newCounter;
        case RESET: {
            const newReset = {
                ...state,
                counter: [
                    ...state.counter
                ]
            }

            newReset.counter.forEach(counter => counter.value = 0);
            return newReset;
        }

        default:
            return state
    }
};

// STORE
const store = Redux.createStore(countReducer);

// NEW COUNTER EVENT
addCounterBtn.addEventListener("click", () => {
    const id = Math.random() * Math.random();
    store.dispatch(addCounter(id));
    newCounterUI(id);
});

resetBtn.addEventListener("click", () => {
    store.dispatch(reset());
    CounterUI();
});

// NEW COUNTER UI
const newCounterUI = (id) => {
    const newDivElement = document.createElement('div')

    newDivElement.innerHTML = `
     <div class="bg-slate-50 p-3 w-96 text-center shadow-lg mb-4">
        <p class=" font-semibold text-2xl mt-3" id="count-${id}">0</p>
        <div class="mt-8 mb-4">
          <button class="px-4 py-1 font-semibold bg-green-600 rounded-full border text-white hover:bg-green-700" id='increment-${id}'>Increment</button>
          <button class="px-4 py-1 font-semibold bg-red-600 rounded-full border text-white  hover:bg-red-700 " id='decrement-${id}'>Decrement</button>
        </div>
      </div>
    ` 

    container.insertBefore(newDivElement, newCountersContainer);

    const randomValue = Math.round(Math.random() * 10) + 1;
    newElementHandler(id, randomValue);
};

// RENDER UI 
const updateCounterUI = (id) => {
    const currentState = store.getState();
    const allCounter = currentState.counter;
    const currentCounters = allCounter.find(counter => counter.id === id);
    const counterValue = document.getElementById(`count-${id}`);
    counterValue.innerHTML = currentCounters.value;
    
};

const CounterUI = () => {
    const currentState = store.getState();
    const allCounter = currentState.counter;
    allCounter.forEach(counter => {
        updateCounterUI(counter.id);
    });
};

// INCREMENT & DECREMENT STATE HANDLE
const newElementHandler = (id, value) => {
    const incrementBtn = document.getElementById(`increment-${id}`);
    const decrementBtn = document.getElementById(`decrement-${id}`);

    incrementBtn.addEventListener("click", () => {
        store.dispatch(increment(id, value));
        updateCounterUI(id);
    });

    decrementBtn.addEventListener("click", () => {
        store.dispatch(decrement(id, value));
        updateCounterUI(id);
    });
};

//Initial Counter 
newElementHandler(1, 1);


