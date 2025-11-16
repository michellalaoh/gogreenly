import Banner from './Banner';
import BestSeller from './BestSeller';
import Categories from './Categories';
import Footer from '../general/Footer';
import VeganFacts from './VeganFacts';

import type { ProductPageProps } from '../interfaces';

export default function HomePage({ cartShow, setCartShow, categories, setCategories }: ProductPageProps) {

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {

    const target = e.target as HTMLElement;
    if (
      target.closest('.header') ||
      target.closest('.cart')
    ) return;

    // Close if clicked outside
    if (cartShow) setCartShow(false);
  };

  return (
    <div
    onClick={handleOutsideClick}>
    {cartShow && <div className="fixed bg-black opacity-30 h-[100vh] w-[100vw] z-150"/>}
      <Banner cartShow={cartShow} setCartShow={setCartShow} />
      <Categories categories={categories} setCategories={setCategories} />
      <BestSeller />
      <VeganFacts />
      <Footer />
    </div>
  )
}