import { useEffect, useRef, useState } from "react";

export const useGetWindowHeight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    if (containerRef.current) {
      updateHeight();
    }

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return { containerRef, containerHeight };
};
