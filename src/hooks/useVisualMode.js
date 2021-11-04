import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    setMode(newMode);
    if (replace === true) {
      setHistory(prev => ([...prev.pop(), newMode]));
    } else {
      setHistory(prev => ([...prev, newMode]));
    }
  }

  function back () {
    if (history.length > 1) {
      let newHistory = [...history];
      newHistory.pop();
      setMode(history[history.length - 2]);
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}