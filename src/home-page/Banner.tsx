import banner from '../assets/banner.webp'

import { useState, useEffect } from "react";
import Header from '../general/Header';
import type { CartProps } from '../interfaces';

export default function Banner({cartShow, setCartShow}:CartProps) {

  const [fadeOut, setFadeOut] = useState(false);
  const [fadeOut2, setFadeOut2] = useState(false);

  // Fade-out control (sequentially later)
  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1000);   // Fade out Div 1 after 3s
    const timer2 = setTimeout(() => setFadeOut2(true), 1500);  // Fade out Div 2 after 4s
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);


  return (
    <div className='relative w-full max-h-screen overflow-hidden z-200'>
      <div className='sm:h-4 h-2 sm:bg-green-700 bg-green-500' />
      <Header cartShow={cartShow} setCartShow={setCartShow} />
      <img src={banner} className=' object-cover w-full h-full z-0 brightness-50' />
      <div className='absolute inset-0 sm:top-4 top-2 bottom-0 bg-gradient-to-b from-black/85 to-transparent z-1' />

      <div className='absolute sm:top-[30%] top-[40%]  w-[100%] z-50 px-[2vw] flex flex-col'>
        <div className='relative h-full w-full flex flex-col'>

          {/* Div 1 */}
          <div
            className={`animate__animated ${fadeOut ? "animate__fadeOutRight" : "animate__fadeInLeft"
              } absolute bg-green-700 h-full sm:w-[65%] md:w-[58%] lg:w-[50%] w-[80%] z-10`}
          />

          {/* Div 2 */}
          <div
            className={`animate__animated ${fadeOut2 ? "animate__fadeOutRight" : "animate__fadeInLeft animate__delay-0-5s"
              } absolute bg-green-500 h-full sm:w-[65%] md:w-[58%] lg:w-[50%] w-[80%] z-20`}
          />

          <div className='flex flex-col animate__animated animate__fadeInLeft animate__delay-0-5s z-30'>
            <div className="flex items-center z-20">
              <div className="h-[2px] bg-green-700 w-[5vw] mr-[1vw]" />
              <span className="text-white italic font-semibold text-lg tracking-wider text-shadow">Your Vegan Marketplace</span>
            </div>
            <span className='text-banner text-shadow z-20'>
              Compassion
            </span>
            <span className='text-banner text-shadow z-20'>
              meets
            </span>
            <span className='text-banner text-shadow z-20'>
              Innovation
            </span>
            <span className='text-gray-300 text-shadow z-20'>1000+ vegan food products throughout Indonesia</span>
          </div>

        </div>
      </div>
    </div>
  )
}