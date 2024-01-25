import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from './counterSlice'

export function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  let amount = 0


  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <input type="text" onChange={(event) => amount=event.target.value}/>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(amount))}
        >
          incrementByAmount
        </button>
      </div>
    </div>
  )
}