import axios from "axios";

export const addToCart = () => {
  const handleAddToCart = async (id: string) => {
    try {
      await axios.post("https://api.michellalaoh.space/api/cart", {
        id,
        quantity: 1,
      });
      alert("✅ Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Failed to add to cart");
    }
  };

  return { handleAddToCart };
};
