import vcheese from '../assets/products/v-cheese.jpg'
import vcondiments from '../assets/products/v-condiments.jpg'
import vmeat from '../assets/products/v-meat.jpg'
import vprotein from '../assets/products/v-protein.jpg'
import vsnacks from '../assets/products/v-snacks.jpg'
import vsweet from '../assets/products/v-sweet.jpg'
import { useNavigate } from 'react-router'
import type { CategoryProps } from '../interfaces'

export default function Categories({categories, setCategories}: CategoryProps) {

  const navigate = useNavigate()

  function handleCategoryClick(category: string) {
    // Update categories state (toggle logic)
    const newCategories = categories.includes(category)
      ? categories.filter(item => item !== category)  // Remove if exists
      : [...categories, category];                    // Add if not exists
    
    setCategories(newCategories);
    
    // Navigate with updated categories
    const queryString = newCategories.length > 0 ? `?categories=${newCategories.join('+')}` : '';
    navigate(`/products${queryString}`);
  }

  return (
    <div className='my-30 mx-[4.5vw]'>
      <span className='text-2xl font-bold'>Browse by Categories</span>
      <div className='flex flex-row justify-center gap-6 items-center mt-5 flex-wrap'>
        <div
        onClick={() => handleCategoryClick('cheese')}
         className='product-div'>
          <img src={vcheese} className='product-img' />
          <span className='product-span'>Vegan Cheese</span>
        </div>
        <div 
        onClick={() => handleCategoryClick('sweet')}
        className='product-div'>
          <img src={vsweet} className='product-img' />
          <span className='product-span'>Sweets</span>
        </div>
        <div
        onClick={() => handleCategoryClick('condiments')}
         className='product-div'>
          <img src={vcondiments} className='product-img' />
          <span className='product-span'>Vegan Condiments</span>
        </div>
        <div
        onClick={() => handleCategoryClick('snacks')}
         className='product-div'>
          <img src={vsnacks} className='product-img' />
          <span className='product-span'>Vegan Snacks</span>
        </div>
        <div 
        onClick={() => handleCategoryClick('protein')}
        className='product-div'>
          <img src={vprotein} className='product-img' />
          <span className='product-span'>Vegan Protein</span>
        </div>
        <div
        onClick={() => handleCategoryClick('meat')}
         className='product-div'>
          <img src={vmeat} className='product-img' />
          <span className='product-span'>Vegan Meat</span>
        </div>
      </div>
    </div>
  )
}