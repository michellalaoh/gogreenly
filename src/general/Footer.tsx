import logo from '../assets/logo.png'
import fb from '../assets/fb.png'
import x from '../assets/x.png'
import ig from '../assets/ig.webp'

export default function Footer() {
  return (
    <div id='contact' className="mt-50 flex lg:flex-row flex-col justify-around bg-gray-300 px-[2vw] py-[3vw] gap-10 lg:h-100 h-auto">
      <div className='flex md:flex-row flex-col lg:justify-between justify-around lg:w-[68vw] w-full'>
        <div className="flex flex-col md:max-w-90 w-full md:px-0 px-10 pb-10">
          <img src={logo} className='w-50' />
          <span className='block my-3'>GoGreenly is a one-stop shopping destination for all vegan products. Shop now to get the highest quality animal-free & cruelty-free products.</span>
          <span className='mb-1 hover:cursor-pointer'>
            Email: <span className="underline ml-2">info@GoGreenly.com</span>
          </span>
          <span className='hover:cursor-pointer'>Phone:
            <span className='underline ml-2'>(847) 986-8606</span>
          </span>
          <div className='flex flex-row mt-3 gap-3'>
            <img src={fb} className='hover:cursor-pointer' />
            <img src={ig} className='hover:cursor-pointer' />
            <img src={x} className='hover:cursor-pointer' />
          </div>
        </div>
        <div className='flex flex-row lg:w-[33vw] md:w-[50vw] w-full lg:justify-between justify-around'>
          <div className='flex flex-col h-full justify-between'>
            <span className='font-bold text-lg'>Resources</span>
            <span className='hover:cursor-pointer'>About Us</span>
            <span className='hover:cursor-pointer'>Contact</span>
            <span className='hover:cursor-pointer'>FAQ</span>
            <span className='hover:cursor-pointer'>Shipping Policy</span>
            <span className='hover:cursor-pointer'>Return Policy</span>
            <span className='hover:cursor-pointer'>Privacy Policy</span>
            <span className='hover:cursor-pointer'>Blog</span>
            <span className='hover:cursor-pointer'>Newsletter</span>
          </div>
          <div className='flex flex-col h-full justify-between'>
            <span className='font-bold text-lg'>Most Popular</span>
            <span className='hover:cursor-pointer'>Companion Animal Products</span>
            <span className='hover:cursor-pointer'>New Products</span>
            <span className='hover:cursor-pointer'>SALE Products</span>
            <span className='hover:cursor-pointer'>Cheese Alternatives</span>
            <span className='hover:cursor-pointer'>Meat Alternatives</span>
            <span className='hover:cursor-pointer'>Candy & Sweets</span>
            <span className='hover:cursor-pointer'>Gift Certificates</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col h-full gap-6 lg:px-0 px-10'>
        <span className='font-bold text-lg'>NEWSLETTER</span>
        <span>Join our good news mailing list.</span>
        <input
          placeholder='Enter your email adress'
          className='bg-white h-10 pl-5 rounded-3xl' />
        <button className='bg-amber-500 hover:cursor-pointer h-10 rounded-3xl'>SUBSCRIBE</button>
      </div>
    </div>
  )
}