import arrow from '../assets/arrow.png'
import axios from 'axios'
import type { BestSellerItem } from '../interfaces';

import { useEffect, useRef, useState } from 'react'

export default function BestSeller() {

  const [products, setProducts] = useState<BestSellerItem[]>([]);

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const res = await axios.get('https://api.michellalaoh.space/api/bestseller')
        setProducts(res.data)
      } catch (err) {
        console.error("Failed to fetch bestseller:", err)
      }
    }

    fetchBestSeller()
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className='relative overflow-hidden'>
      <span className='block font-bold text-2xl ml-[4.5vw] mb-8'>Vegan Best Seller</span>
      <div
        ref={scrollRef}
        className='overflow-x-scroll scrollbar-hide hide-scrollbar'>
        <div className="relative flex flex-row gap-15 w-max">
          {products.map((product, index) => (
            <img
              src={`https://api.michellalaoh.space${product.image}`}
              key={index}
              className="h-60 w-60 object-cover z-10 shadow-lg shadow-black/40"
            />
          ))}
        </div>
      </div>
      <div className='absolute bg-green-700 top-[55%] h-[50%] w-full z-1' />
      <img
        onClick={scrollLeft}
        src={arrow} className='absolute z-20 h-10 w-10 left-5 top-[50%] scale-x-[-1] hover:cursor-pointer' />
      <img
        onClick={scrollRight}
        src={arrow} className='absolute z-20 h-10 w-10 right-5 top-[50%] hover:cursor-pointer' />
    </div>
  )
}