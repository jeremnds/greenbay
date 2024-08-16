"use client";

import { useCartStore } from "@/src/store/cartStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CartUpdater() {
  const { data: session } = useSession();
  const { cart, updateUserId } = useCartStore();
  useEffect(() => {
    let customerId = 1;
    if (session?.user) {
      customerId = session.user.customerId;
    }

    const needsUpdate = cart.some((item) => item.user_id !== customerId);

    if (needsUpdate) {
      updateUserId(customerId);
    }
  }, [session, cart, updateUserId]);
  return null;
}
