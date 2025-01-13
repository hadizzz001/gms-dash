
"use client"

import { useState, useEffect } from 'react';

function MyComponent() {
  // Initialize state with null
  const [myObject, setMyObject] = useState(null);

  // Effect to log the updated state
  useEffect(() => {
    console.log('myObject:', myObject);
  }, [myObject]);

  // Function to set the state with an object
  const setObject = () => {
    // Create the object you want to set
    const newObj = { key1: 'value1', key2: 'value2' };

    // Set the state with the new object
    setMyObject(newObj);
  };

  return (
    <div>
      {myObject ? (
        <>
          <p>{myObject.key1}</p>
          <p>{myObject.key2}</p>
        </>
      ) : (
        <p>Object is null. Click the button to set it.</p>
      )}

      <button onClick={setObject}>Set Object</button>
    </div>
  );
}

export default MyComponent;
