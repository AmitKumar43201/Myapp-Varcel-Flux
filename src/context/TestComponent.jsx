import React, {useEffect} from 'react'

function TestComponent() {
  
  useEffect( () => {
    console.log("hello")
  }, [] )

  return (
    <div>
      <h1>Test Component</h1>
    </div>
  )
}

export default TestComponent
