import animal1 from '../assets/animal1.jpeg'
import animal2 from '../assets/animal2.webp'
import animal3 from '../assets/animal3.jpg'
import animal4 from '../assets/animal4.jpg'
import logo from '../assets/logo.png'

export default function VeganFacts() {

  const text: string = 'Spread Love - Choose Vegan - Keep Peace - '

  return (
    <div className="relative pt-40 pb-40 mb-200">
      <div className='absolute md:h-[110%] h-[70%] w-full bg-green-700 z-0 top-0' />
      <div className='relative flex md:flex-row flex-col pb-60 z-50 '>
        <div className='md:w-[50%] w-[100%]'>
          <span className='block mx-[5vw] text-4xl font-bold text-white'>Why Choose Vegan</span>
          <p className='my-5 mx-[5vw] text-xl text-gray-200 md:pr-12 md:pb-10 pr-0 pb-0'>There are so many benefits to a vegan diet. We know it can seem daunting if you’ve spent your life relying on animal-derived products. We understand the questions that might be running through your head. Will I have to eat bland food forever? Will I get all the nutrients I need? Will it cost me lots of money? Why go vegan?! Well, lucky for you, we’re here to help.</p>
        </div>
        <div className='relative md:w-[50%] w-[100%]'>
          <img src={animal2} className='absolute w-[25vw] right-10 md:-top-10 top-5' />
          <img src={animal1} className='absolute w-[25vw] lg:right-[24vw] md:right-[18vw] left-[5vw]  lg:top-40 md:top-45 md:top-48 top-5' />
          <div className='absolute flex justify-center items-center h-53 w-53 rounded-full sm:top-0 top-25 lg:right-[40vw] md:right-[30vw] sm:right-[35vw] right-[30vw] bg-green-200'
          >
            <img src={logo} className='absolute h-auto w-30' />
            <div className='absolute w-full h-full left-0 top-0'
              style={{
                animation: 'rotateText 10s linear infinite'
              }}>
              {text.split('').map((char, i) => {
                const rotate = i * 8.7; // adjust angle between letters
                return (
                  <span
                    key={i}
                    style={{
                      transform: `rotate(${rotate}deg) `,
                      fontSize: '15px',
                      transformOrigin: '0 100px'
                    }}
                    className='absolute w-full h-full left-26.5 top-1.5'
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='relative flex md:flex-row flex-col md:items-stretch items-center z-50'>
        <div className='md:absolute relative md:-top-50 sm:top-0 top-22 flex md:flex-col flex-col-reverse md:w-[50%] w-[100%] mx-[5vw] md:max-w-[40vw] max-w-[80vw] rounded-4xl overflow-hidden'>
          <img src={animal3} className='md:w-[40vw] w-[80vw] object-cover' />
          <div className='bg-green-200 px-5 pb-5'>
            <span className='block text-4xl my-5'>Help Stop Animal Cruelty</span>
            <p className='text-xl'>Another of the main reasons to go vegan is to show care and respect for the wonderful creatures we live alongside. We all know that a diet laden with animal products means the violent killing of animals. And despite all the amazing vegan alternatives now available, this continues to be the norm.</p>
          </div>
        </div>
        <div className='md:absolute relative lg:top-[0.8vw] md:-top-[20vw] sm:-top-10 mt-30 right-[1vw] flex flex-col md:w-[50%] w-[100%] mx-[5vw] md:max-w-[40vw] max-w-[80vw] rounded-4xl overflow-hidden'>
          <div className='bg-green-200 px-5 pb-5'>
            <span className='block text-4xl my-5'>We Need To Care For The Environment</span>
            <p className='text-xl'>It’s no secret that our planet is under immense pressure. Agriculture plays a big role in climate change, producing around a quarter of the world’s greenhouse gas emissions.
              And this is largely due to the meat and dairy industries, which create around 14.5% of all global greenhouse gas emissions. Forests and other important ecosystems are continually destroyed to make way for agriculture.</p>
          </div>
          <img src={animal4} className='md:w-[40vw] max-w-[80vw] object-cover' />
        </div>
      </div>
    </div>
  )
}