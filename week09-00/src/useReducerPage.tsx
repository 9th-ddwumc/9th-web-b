import { useReducer } from "react";

interface IState {
  count: number;
}
interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
  payload?: number;
}

function reducer(state: IState, action: IAction) {
  {
    const { type, payload } = action;
    switch (type) {
      case "INCREASE": {
        return {
          ...state,
          count: state.count + (payload ?? 1),
        };
      }
      case "DECREASE": {
        return {
          ...state,
          count: state.count - 1,
        };
      }
      case "RESET_TO_ZERO": {
        return {
          ...state,
          count: 0,
        };
      }
      default:
        return state;
    }
    return state;
  }
}

export default function UseReducerPage() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <div>
        <h2>useReducer 사용</h2>
        <h3>{state.count}</h3>
        <button
          onClick={() =>
            dispatch({
              type: "INCREASE",
              payload: 3,
            })
          }
        >
          Increase
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "DECREASE",
            })
          }
        >
          Decrease
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "RESET_TO_ZERO",
            })
          }
        >
          Return to Zero
        </button>
      </div>
    </div>
  );
}
