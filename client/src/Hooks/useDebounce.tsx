import { useRef } from 'react';

const useDebounce = (callback: () => void, delay: number) => {
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

  const dispatchDebounce = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    const newTimer = setTimeout(() => {
      callback();
    }, delay);
    debounceTimer.current = newTimer;
  };
  return dispatchDebounce;
};
export default useDebounce;
