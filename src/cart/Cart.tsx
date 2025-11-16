import type { Cart, CartProps } from "../interfaces";
import { Link } from "react-router";
import { useCart } from "../hooks/cartFunctions";

export default function Cart({ cartShow, setCartShow }: CartProps) {

  const {
    cartItems,
    total,
    loading,
    handleIncrease,
    handleDecrease,
    handleDeleteAll,
    handleQuantityChange,
    handleCheckout
  } = useCart(cartShow, setCartShow); 

  return (
    <aside
      className={`fixed top-0 right-0 h-[100vh] w-[30vw] max-w-[400px] bg-white z-[9999] transform transition-transform duration-500 ease-in-out
          ${cartShow ? 'translate-x-0' : 'translate-x-full'}`}
      aria-hidden={!cartShow}
      onClick={(e) => e.stopPropagation()}
    >
      {cartShow &&
        <div className='fixed top-0 right-0 h-[100vh] w-100 bg-white z-10 overflow-y-scroll scrollbar-always-visible pb-20'>
          <span className="block text-black text-lg font-semibold pt-7 px-5">SHOPPING CART</span>
          <button className='absolute top-5 right-5 h-10 w-48 text-md bg-green-600 rounded-xl text-white'
            onClick={() => (setCartShow(!cartShow))}
            aria-label="Close cart"
          >X Continue Shopping</button>

          {loading ?
            <div className="text-center mt-10 text-gray-500">Load Cart...</div> :
            <>
              <div className="flex flex-col">
                {cartItems.map((item) => (
                  <div key={item.id} className="relative flex flex-row mx-10 my-10">
                    <img
                      src={`https://api.michellalaoh.space${item.image}`}
                      className="h-30 w-30 object-cover" />
                    <div className="flex flex-col ml-5 mr-10 gap-2">
                      <span>{item.name}</span>
                      <span className="font-bold">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                      <div className="flex flex-row gap-5 items-center">
                        <span onClick={() => handleDecrease(item.id)} className="hover:cursor-pointer">-</span>
                        <input type="number"
                          value={item.quantity === 0 ? "" : item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="w-10 h-10 rounded-md text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 border-gray-200" />
                        <span onClick={() => handleIncrease(item.id)} className="hover:cursor-pointer">+</span>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteAll(item.id)} className=" absolute right-1 bottom-5 hover:cursor-pointer text-3xl">X</button>
                  </div>
                ))}
              </div>

              <div className="flex flex-row justify-between mx-6 my-5">
                <span>Product Total</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
            </>
          }
          <div className="flex flex-row justify-between mx-6">
            <Link to="/cart">
              <button
                onClick={() => setCartShow(false)}
                className="bg-black text-white w-36 h-8 rounded-3xl hover:cursor-pointer">VIEW CART</button>
            </Link>
            <button
              onClick={handleCheckout}
              className="bg-black text-white w-36 h-8 rounded-3xl hover:cursor-pointer">CHECKOUT</button>
          </div>
        </div>
      }
    </aside>
  )
}