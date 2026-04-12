// Combined Example (REAL INTERVIEW LEVEL)

import { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Child</button>;
});

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Child clicked");
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      <Child onClick={handleClick} />
    </>
  );
}

// ⚠️ Most Important Insight

// 👉 These only work properly together

// React.memo alone ❌
// useCallback alone ❌
// Combined ✅