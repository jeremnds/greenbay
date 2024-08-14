import { useEffect, useState } from "react";
import { StoreApi, UseBoundStore } from "zustand";

const useHydratedStore = <T, F>(
  useStore: UseBoundStore<StoreApi<T>>,
  selector: (state: T) => F
): F | undefined => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [data, setData] = useState<F>();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const storeData = useStore(selector);

  useEffect(() => {
    if (hasHydrated) {
      setData(storeData);
    }
  }, [hasHydrated, storeData]);

  return data;
};

export default useHydratedStore;
