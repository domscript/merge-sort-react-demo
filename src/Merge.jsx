import React, { useRef, useState, useEffect } from "react";

export function MergeSortVisualizer() {
  const canvasRef = useRef(null);
  const [values, setValues] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const koeff = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the values as rectangles
    const width = canvas.width / values.length;
    values.forEach((value, index) => {
      ctx.fillStyle = `hsl(${(360 * value) / values.length / koeff}, 86%, 64%)`;
      ctx.fillRect(index * width, 0, width, value);
    });
  }, [values]);

  const shuffle = () => {
    // create a shuffled array of values
    setValues(
      Array.from({ length: 10 }, (_, index) => (index + 1) * koeff).sort(
        () => Math.random() - 0.5
      )
    );
  };

  const mergeSort = async (array) => {
    setIsSorting(true);

    // base case: if the array has length 1, it is already sorted
    if (array.length <= 1) return array;

    // split the array into two halves
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // sort the left and right halves
    const sortedLeft = await mergeSort(left);
    const sortedRight = await mergeSort(right);

    // merge the sorted halves
    const merged = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < sortedLeft.length && rightIndex < sortedRight.length) {
      if (sortedLeft[leftIndex] < sortedRight[rightIndex]) {
        merged.push(sortedLeft[leftIndex]);
        leftIndex++;
      } else {
        merged.push(sortedRight[rightIndex]);
        rightIndex++;
      }
    }
    // add any remaining values from the left or right halves
    merged.push(...sortedLeft.slice(leftIndex));
    merged.push(...sortedRight.slice(rightIndex));

    // update the values state with the merged array
    setValues(merged);

    // pause for visualization
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSorting(false);
    return merged;
  };

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
      <br />
      <button onClick={shuffle} disabled={isSorting}>
        Shuffle
      </button>
      <button onClick={() => mergeSort(values)} disabled={isSorting}>
        Sort
      </button>
    </div>
  );
}
