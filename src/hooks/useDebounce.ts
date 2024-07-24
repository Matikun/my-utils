import { useEffect, useLayoutEffect, useRef, useState } from "react";

type DebounceHook = <T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
  deps?: any[]
) => [() => boolean | null, () => void];

const useDebounce: DebounceHook = (fn, ms, deps = []) => {
  const callbackRef = useRef(fn);
  const [active, setActive] = useState<boolean | null>(false);
  const cancel = () => setActive(null);

  useLayoutEffect(() => {
    callbackRef.current = fn;
  }, [fn]);

  useEffect(() => {
    setActive(false);
    const timeoutId = setTimeout(() => {
      setActive(true);
    }, ms);

    return () => clearTimeout(timeoutId);
  }, deps);

  useEffect(() => {
    if (active) {
      callbackRef.current();
    }
  }, [active]);

  return [() => active, cancel];
};

export default useDebounce;
