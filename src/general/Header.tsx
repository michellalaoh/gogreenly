import logo from '../assets/logo.png'
import cart from '../assets/cart.png'
import { Link, useNavigate } from 'react-router'
import Cart from '../cart/Cart';
import type { CartProps } from '../interfaces';
import { useState } from 'react';
import search from '../assets/search.png'
import { useCartContext } from "../context/CartContext";


export default function Header({ cartShow, setCartShow }: CartProps) {

const { fetchCart } = useCartContext();

  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();


  const doSearch = () => {
    const trimmed = searchInput.trim();

    if (trimmed === "") {
      // ✅ If empty search → go to all products
      navigate("/products");
    } else {
      const searchQuery = trimmed.split(" ").join("+");
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      doSearch();
    }
  };


  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent closing when clicking inside the Header or Cart
    const target = e.target as HTMLElement;
    if (
      target.closest('.cart')      // anything inside Cart
    ) return;

    // If not inside header/cart, close it
    if (cartShow) setCartShow(false);
  };

  return (
    <div
      onClick={handleOutsideClick}
      className='absolute z-50 flex lg:flex-row flex-col-reverse px-[3vw] lg:py-5 py-3  z-200'>
      <div className='relative flex flex-row md:w-full w-auto lg:justify-between justify-around items-center'>
        <Link to='/'><img src={logo} className='w-[18vw] h-auto hover:cursor-pointer' /></Link>
        <div className='realative lg:w-[50vw] w-[70vw] mx-[3vw] h-10'>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
          placeholder='Search for products..'
          className='bg-white rounded-3xl text-black font-bold w-full h-full pl-5'
        />
        <img
          src={search}
          className='w-7 h-7 absolute sm:right-[4vw] right-[5.3vw] top-[0.7vw]'
          onClick={doSearch}
        />
        </div>
      </div>
      <div className='flex flex-row  md:w-full w-auto justify-around items-center lg:mb-0 mb-3'>
        <Link to='/products' className='hover:cursor-pointer text-header'>Products</Link>
        <Link to='/my-order' className='hover:cursor-pointer text-header'>My Order</Link>
        <div
          onClick={() => {
            const contactSection = document.getElementById('contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' })
          }}
          className='hover:cursor-pointer text-header'>Contact</div>
        <img src={cart} className='h-10 w-auto hover:cursor-pointer'
          onClick={() => {
            setCartShow(!cartShow);
            fetchCart()
          }}
        />
      </div>
      <Cart cartShow={cartShow} setCartShow={setCartShow} />
    </div>
  )
}