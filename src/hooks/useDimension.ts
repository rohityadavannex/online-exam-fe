import { useEffect, useState } from "react";

const useDimension = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const resizeHandler = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return { width };
};

export default useDimension;
