import { useState, useRef } from "react";

export const useDragging = () => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const initialX = useRef(null);
  const initialScroll = useRef(null);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    initialX.current = event.clientX;
    initialScroll.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (event) => {
    if (!isDragging) {
      return;
    }

    const deltaX = event.clientX - initialX.current;
    containerRef.current.scrollLeft = initialScroll.current - deltaX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
