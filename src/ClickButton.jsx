import React, { useRef, useEffect, useState } from "react";

export function Canvas() {
  const canvasRef = useRef(null);
  const [fillColor, setFillColor] = useState("red");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = fillColor;
    ctx.fillRect(10, 10, 50, 50);

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [fillColor]);

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= 10 && x <= 60 && y >= 10 && y <= 60) {
      setFillColor(fillColor === "red" ? "green" : "red");
    }
  };

  return <canvas ref={canvasRef} width={300} height={300} />;
}
