import { useEffect, useState, useCallback, Dispatch, SetStateAction } from 'react';

interface KeyboardNavigationParams {
  maxIndex: number;
  // onEnter: () => void;
  getKeyword: (index: number) => string;
}

interface KeyboardNavigationReturn {
  focusIndex: number;
  isAutoSearch: boolean;
  autoSearchKeyword: string;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  setIsAutoSearch: Dispatch<SetStateAction<boolean>>;
}

function useKeyboardNavigation({
  maxIndex,
  // onEnter,
  getKeyword,
}: KeyboardNavigationParams): KeyboardNavigationReturn {
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [isAutoSearch, setIsAutoSearch] = useState<boolean>(false);
  const [autoSearchKeyword, setAutoSearchKeyword] = useState<string>('');

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        // case 'Enter':
        //   onEnter();
        //   break;
        case 'ArrowDown':
          setIsAutoSearch(true);
          setFocusIndex((prevIndex) => (prevIndex < maxIndex - 1 ? prevIndex + 1 : prevIndex));
          setAutoSearchKeyword(getKeyword(focusIndex + 1));
          break;
        case 'ArrowUp':
          setFocusIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
          setAutoSearchKeyword(getKeyword(focusIndex - 1));
          break;
        case 'Escape':
          setAutoSearchKeyword('');
          setIsAutoSearch(false);
          break;
        default:
          break;
      }
    },
    [maxIndex, getKeyword, focusIndex],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return { focusIndex, isAutoSearch, autoSearchKeyword, setFocusIndex, setIsAutoSearch };
}

export default useKeyboardNavigation;
