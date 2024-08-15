"use client";

import { useCartStore } from "@/src/store/cartStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CartUpdater() {
  const { data: session } = useSession();
  const { cart, updateUserId } = useCartStore();
  useEffect(() => {
    if (session?.user?.customerId && cart.length > 0) {
      const currentUserId = cart[0]?.user_id;
      if (currentUserId !== session.user.customerId) {
        updateUserId(session.user.customerId);
      }
    }
  }, [session, cart, updateUserId]);

  return null;
}
