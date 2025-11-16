import Header from "../general/Header";
import type { CartProps } from "../interfaces";
import { Container } from '@mui/material'
import cart from '../assets/cart.png'

import { useEffect, useState } from "react";
import axios from "axios";
import type { Order } from "../interfaces";
import Footer from "../general/Footer";

import { addToCart } from "../hooks/addToCart";


export default function OrderPage({ cartShow, setCartShow }: CartProps) {

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { handleAddToCart } = addToCart()

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent closing when clicking inside the Header or Cart
    const target = e.target as HTMLElement;
    if (
      target.closest('.header') || // anything inside Header
      target.closest('.cart')      // anything inside Cart
    ) return;

    // If not inside header/cart, close it
    if (cartShow) setCartShow(false);
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://api.michellalaoh.space/api/checkout/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (ms: number) => {
    const date = new Date(ms);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading your orders...</div>;
  }

  return (
    <>
      {cartShow &&
        <div className="fixed bg-black opacity-30 h-[100vh] w-[100vw] z-150"
          onClick={handleOutsideClick}
        />}
      <div className="relative bg-green-700 lg:h-23 md:h-38 h-30">
        <Header cartShow={cartShow} setCartShow={setCartShow} />
      </div>
      <Container maxWidth='md' className="mt-7">
        <span className="font-bold text-2xl">Your Orders</span>
        {orders.length === 0 ?
          (<div className="mt-10 text-gray-500">You have no orders yet.</div>) :
          (
            orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col border-2 border-gray-200 mt-7">

                <div className="flex sm:flex-row flex-col border-b-2 border-gray-200 px-5 py-5">
                  <div className="flex sm:flex-col flex-row">
                    <span className="font-bold">Order Placed:</span>
                    <span className="sm:pl-0 pl-2">{formatDate(order.orderTimeMs)}</span>
                  </div>
                  <div className="flex sm:flex-col flex-row sm:pl-[4vw] pl-0">
                    <span className="font-bold">Total:</span>
                    <span className="sm:pl-0 pl-2">${order.totalPrice}</span>
                  </div>
                  <div className="flex sm:flex-col flex-row sm:pl-[19vw] pl-0">
                    <span className="font-bold">Order ID:</span>
                    <span className="sm:pl-0 pl-2">{order.id}</span>
                  </div>
                </div>
                {order.products.map((p) => (
                  <div
                  key={p.productId}
                  className="flex flex-row py-10 px-5 items-center">
                    <img src={`https://api.michellalaoh.space${p.image}`} 
                    className="h-30 w-30" />
                    <div className="flex sm:flex-row flex-col ml-[3vw] gap-3">
                      <div className="flex flex-col items-start  gap-3">
                        <span className="font-bold">{p.name}</span>
                        <span>Quantity: {p.quantity}</span>
                      </div>
                      <button
                      onClick={() => handleAddToCart(p.productId)}
                       className="sm:ml-[9vw] ml-0 flex flex-row bg-green-700 h-10 w-60 justify-center items-center rounded-lg hover:cursor-pointer">
                        <img src={cart} className="h-6 w-7 object-cover" />
                        <span
                        className="text-white ml-3">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}

              </div>
            ))

          )}


      </Container>
      <Footer />
    </>
  )
}