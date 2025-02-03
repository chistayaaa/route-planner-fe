export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
): (...args: T) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: T) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
