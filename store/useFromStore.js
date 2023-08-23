import { useEffect, useState } from "react";

export default function useFromStore(store, storeCallback) {
  const [state, setState] = useState();

  const stateOfStore = store(storeCallback);

  useEffect(() => {
    setState(stateOfStore);
  }, [stateOfStore]);

  return state;
}
