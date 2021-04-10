import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const callbacRef = useRef();

  // update callback function with current render callback that has access to latest props and state
  useEffect(() => {
    callbacRef.current = callback;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      callbacRef.current && callbacRef.current();
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);
}
