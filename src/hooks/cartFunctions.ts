import { useState, useEffect, useRef } from "react";
import type { Cart } from "../interfaces";
import axios from "axios";
import { useNavigate } from "react-router";

export const useCart = (cartShow: boolean, setCartShow: (val: boolean) => void) => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const fetchCart = async () => {
    try {
      const res = await axios.get("https://api.michellalaoh.space/api/cart");
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (cartShow) {
      fetchCart();
    } else{
      setLoading(false)
    }
  }, [cartShow]);

  

  const handleIncrease = async (id: string) => {
    await axios.post('https://api.michellalaoh.space/api/cart', { id, quantity: 1 });
    fetchCart();
  };

  const handleDecrease = async (id: string) => {
    await axios.delete(`https://api.michellalaoh.space/api/cart/${id}`);
    fetchCart();
  };

  const handleDeleteAll = async (id: string) => {
    await axios.delete(`https://api.michellalaoh.space/api/cart/${id}?all=1`);
    fetchCart();
  };

  const debounceTimers = useRef<{ [id: string]: ReturnType<typeof setTimeout> }>({});

  const handleQuantityChange = async (id: string, newQty: string) => {
    // update local UI immediately
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: newQty === "" ? 0 : parseInt(newQty, 10) }
          : item
      )
    );

    // clear any previous timer for this item
    if (debounceTimers.current[id]) {
      clearTimeout(debounceTimers.current[id]);
    }

    // set new timer: wait 1s before updating backend
    debounceTimers.current[id] = setTimeout(async () => {
      let quantity = parseInt(newQty, 10);
      if (isNaN(quantity) || quantity < 1) {
        quantity = 1; // fallback after 1s
      }

      try {
        // use /set for direct quantity update
        await axios.post("https://api.michellalaoh.space/api/cart/set", { id, quantity });
        fetchCart();
      } catch (err) {
        console.error("Error updating quantity:", err);
      }
    }, 1000);

  };



  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);


  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        alert("🛒 Your cart is empty!");
        return;
      }

      const res = await axios.post("https://api.michellalaoh.space/api/checkout/checkout");

      if (res.status === 200) {
        alert("✅ Order placed successfully!");
        setCartShow(false);

        navigate("/my-order");
        fetchCart()
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Checkout failed. Please try again.");
    }
  };

  return {
    cartItems,
    loading,
    total,
    fetchCart,
    handleIncrease,
    handleDecrease,
    handleDeleteAll,
    handleQuantityChange,
    handleCheckout
  }
}