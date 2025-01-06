import { useEffect, useRef } from "react";

function usePrevious(value: any) {
  const ref = useRef(); // Create a ref to store the previous value
  useEffect(() => {
    ref.current = value; // Update the ref with the current value
  }, [value]); // Only re-run if the value changes
  return ref.current; // Return the previous value
}

export default usePrevious;
