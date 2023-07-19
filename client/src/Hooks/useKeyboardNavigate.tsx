import { useState, useEffect } from 'react';

export function useKeyboardNavigation<T>(
  items: T[] | undefined,
  onEnter: (index: number) => void,
): { selectedIndex: number } {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (items && items.length > 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1);
    }
  }, [items]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!items || event.isComposing) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
          break;
        case 'ArrowDown':
          setSelectedIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
          break;
        case 'Enter':
          onEnter(selectedIndex);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [items, onEnter]);

  return { selectedIndex };
}
