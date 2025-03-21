import React, { useState } from 'react'
import './array.css'
function ArrayInverse() {
  const originalArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [array, setArray] = useState(originalArray)
  const [isReversed, setIsReversed] = useState(false)

  const handleReverse = () => {
    if (isReversed) {
      setArray(originalArray)
    } else {
      setArray([...originalArray].reverse())
    }
    setIsReversed(!isReversed)
  }

  return (
    <div className='reverseTime'>
      <h2>the original one: {originalArray}</h2>
      <button
        onClick={handleReverse}
        style={{ padding: '10px', cursor: 'pointer', margin: '50px' }}
      >
        Reverse
      </button>
      <h3>
        {array.map((num, index) => (
          <span
            key={index}
            style={{
              color: isReversed
                ? num === 0
                  ? 'yellow'
                  : num % 2 === 0
                  ? 'green'
                  : 'red'
                : 'black',
              margin: '0 5px'
            }}
          >
            {num}
          </span>
        ))}
      </h3>
    </div>
  )
}

export default ArrayInverse
