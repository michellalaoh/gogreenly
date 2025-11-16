import Header from "../general/Header"
import type { CartProps } from "../interfaces"
import bin from '../assets/bin.png'
import { useCart } from "../hooks/cartFunctions"
import Footer from "../general/Footer";

export default function CartPage({ cartShow, setCartShow }: CartProps) {

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

  const {
    cartItems,
    total,
    loading,
    handleIncrease,
    handleDecrease,
    handleDeleteAll,
    handleQuantityChange,
    handleCheckout
  } = useCart(cartShow, setCartShow); // cartShow = true here

  return (
    <>
      {cartShow &&
        <div className="fixed bg-black opacity-30 h-[100vh] w-[100vw] z-150"
          onClick={handleOutsideClick}
        />}
      <div className="relative bg-green-700 lg:h-23 md:h-38 h-30">
        <Header cartShow={cartShow} setCartShow={setCartShow} />
      </div>
      {loading ? <div className="text-center mt-10 text-gray-500">Load Cart...</div> :
        <div className="flex flex-col mt-10 items-center mx-[2vw]">
          <span className="font-bold text-4xl mb-5">My Cart</span>
          <div className="flex flex-col w-full items-between">
            <div className="flex flex-row w-full items-center justify-evenly bg-green-600 h-10">
              <span className="sm:w-[48vw] w-[33vw]  text-white font-bold">PRODUCT</span>
              <span className="text-white font-bold w-[6vw] text-center">QTY</span>
              <span className="text-white font-bold">PRICE</span>
              <span className="text-white font-bold">TOTAL</span>
            </div>
            {cartItems.map((item) => (

              <div className="flex flex-row mt-10 items-center justify-between mx-[2vw]">
                <img src={`https://api.michellalaoh.space${item.image}`} className="w-[10vw] h-30 object-contain mr-2" />
                <span className="w-[37vw]">{item.name}</span>
                <div className="flex flex-row mx-2">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="bg-green-600 w-10 h-10 text-white text-xl font-bold rounded-md hover:cursor-pointer">-</button>
                  <input type="number"
                  value={item.quantity === 0 ? "" : item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                   className="w-15 h-10 rounded-md mx-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 border-gray-200" />
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="bg-green-600 w-10 h-10 text-white text-xl font-bold rounded-md hover:cursor-pointer">+</button>
                </div>
                <span>${((item.price) / 100).toFixed(2)}</span>
                <span className="mx-3">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                <img
                  onClick={() => handleDeleteAll(item.id)}
                  src={bin} className="h-5 w-5 hover:cursor-pointer" />
              </div>
            ))}
            <div className="flex flex-row mt-20 w-full justify-end pr-5">
              <span className="font-bold text-green-600">Order Subtotal</span>
              <span className="pl-50 font-bold text-green-600">${(total / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-end mt-10 mr-10">
              <span
              onClick={handleCheckout} className="flex justify-center items-center text-white text-xl bg-green-500 h-12 w-50 rounded-lg hover:cursor-pointer">Checkout</span>
            </div>
          </div>
        </div>
      }
      <Footer />
    </>
  )
}