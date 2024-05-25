import { useEffect, useState } from "react";

/**
 * A generic hook used to delay the return of an input field. It requires two props,
 * and is used to avoid making requests on every keystroke/action.
 * Ex. shared/components/QuickFilter/index.tsx
 * @param {string | number} value - The text entered in the field.
 * @param {number} delay - The time in milliseconds by which the response should be delayed.
 * @returns A string value.
 */

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancels the timeout when/if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
