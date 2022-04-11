import { useEffect, useRef } from 'react';

function useEffectOnlyOnUpdate(callback, dependencies) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback(dependencies);
    } else {
      didMount.current = true;
    }
  }, [callback, dependencies]);
}

export default useEffectOnlyOnUpdate;
