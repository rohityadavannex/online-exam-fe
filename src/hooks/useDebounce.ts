import { useEffect, useState } from "react";

const useDebounce = (text: string, time = 1500) => {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, time);

    return () => clearTimeout(handler);
  }, [text, time]);

  return debouncedText;
};

export default useDebounce;
