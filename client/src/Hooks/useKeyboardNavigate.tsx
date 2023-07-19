import { useState, useEffect } from 'react';

export function useKeyboardNavigation<T>(
  items: T[] | undefined,
  initialIndex: number = 0,
  onEnter: (index: number) => void,
): { selectedIndex: number } {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!items) {
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
  }, [items, onEnter, selectedIndex]);

  return { selectedIndex };
}
