import { useRef, useEffect } from 'react';

const useEffectOnlyOnce = (callback, dependencies, condition) => {
  const calledOnce = useRef(false);

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    if (condition(dependencies)) {
      callback(dependencies);

      calledOnce.current = true;
    }
  }, [callback, condition, dependencies]);
};

export default useEffectOnlyOnce;
