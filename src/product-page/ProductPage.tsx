import Header from "../general/Header";
import { useEffect, useState } from "react";
import hamburger from '../assets/hamburger.png'
import Footer from "../general/Footer";
import type { Product } from "../interfaces";
import type { ProductPageProps } from "../interfaces";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router";
import { addToCart } from '../hooks/addToCart'

export default function ProductPage({ cartShow, setCartShow, categories, setCategories }: ProductPageProps) {

  const location = useLocation();
  const navigate = useNavigate();
  const { handleAddToCart } = addToCart();

  // Get search from URL: ?search=cheese+vegan+meat
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search"); // returns string | null

  // for search result div
  const [searchItems, setSearchItems] = useState<string>('')
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");

    if (searchValue) {
      // Replace "+" with spaces for readability
      setSearchItems(searchValue.replace(/\+/g, " "));
    } else {
      // ✅ No search param → reset to empty
      setSearchItems("");
    }
  }, [location.search]);


  function selectCategories(category: string) {
    setCategories((prev) => {
      return prev.includes(category)
        ? prev.filter(item => item !== category)  // Remove if already exists
        : [...prev, category];                    // Add if not exists
    });
  }

  const [product, setProduct] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "https://api.michellalaoh.space/api/products";

        // Build dynamic query string
        const params: string[] = [];
        if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`);
        if (categories.length > 0) params.push(`categories=${encodeURIComponent(categories.join('+'))}`);

        if (params.length > 0) url += "?" + params.join("&");

        // ✅ Update browser URL dynamically
        const queryString = params.length > 0 ? "?" + params.join("&") : "";
        navigate(`/products${queryString}`, { replace: false });

        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // ✅ Use message from backend (if exists)
          const backendMsg = error.response?.data?.message ?? "Error fetching products";
          console.error(backendMsg);
          setProduct([]); // clear list
          // Optionally, you can store backendMsg in a separate state for UI display
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
    fetchProducts();
  }, [categories, searchQuery, navigate]);


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;

  const totalPages = Math.ceil(product.length / productsPerPage);

  const paginatedProducts = product.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };



  const [showCategories, setShowCategories] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setShowCategories(false);
      } else {
        setShowCategories(true);
      }
    };
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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


  return (
    <>
      {cartShow &&
        <div className="fixed bg-black opacity-30 h-[100vh] w-[100vw] z-150"
          onClick={handleOutsideClick}
        />}
      <div className="relative bg-green-700 lg:h-23 md:h-38 h-30">
        <Header cartShow={cartShow} setCartShow={setCartShow} />
      </div>

      <div className="relative h-full w-full flex flex-row">

        <button
          className="sm:hidden absolute top-3 left-3 z-50 text-white p-2 rounded-lg shadow-md z-51"
          onClick={() => setShowCategories(!showCategories)}
        >
          {showCategories ? <img src={hamburger} className="h-5 w-auto" /> : <img src={hamburger} className="h-5 w-auto" />}
        </button>

        {showCategories && <div className="sm:relative absolute bg-white box-border sm:h-full h-[470px] w-[20vw] min-w-50 flex justify-center z-50 rounded-4xl">
          <div className="box-border h-[400px] w-full rounded-4xl mx-[1vw] my-15 border-1 border-gray-300 shadow-md flex flex-col py-5 px-5 gap-4">
            <span className="font-bold text-lg">Categories</span>
            <div className="flex flex-row items-center"
            >
              <input type="checkbox" className="h-5 w-5 accent-green-600 border-gray-300 border-3 rounded-md"
                onChange={() => selectCategories("cheese")}
                checked={categories.includes("cheese")}
              />
              <span className="ml-3">Cheese</span>
            </div>
            <div className="flex flex-row items-center"
            >
              <input type="checkbox" className="h-5 w-5 accent-green-600 border-gray-300 border-3 rounded-md"
                onChange={() => selectCategories("sweet")}
                checked={categories.includes("sweet")}
              />
              <span className="ml-3">Sweets</span>
            </div>
            <div className="flex flex-row items-center"
            >
              <input type="checkbox" className="h-5 min-w-5 accent-green-600 border-gray-300 border-3 rounded-md"
                onChange={() => selectCategories("condiments")}
                checked={categories.includes("condiments")}
              />
              <span className="ml-3">Condiments & Seasonings</span>
            </div>
            <div className="flex flex-row items-center"
            >
              <input type="checkbox" className="h-5 w-5 accent-green-600 border-gray-300 border-3 rounded-md"
                onChange={() => selectCategories("snacks")}
                checked={categories.includes("snacks")}
              />
              <span className="ml-3">Snacks</span>
            </div>
            <div className="flex flex-row items-center"
            >
              <input type="checkbox" className="h-5 w-5 accent-green-600 border-gray-300 border-3 rounded-md"
                onChange={() => selectCategories("protein")}
                checked={categories.includes("protein")}
              />
              <span className="ml-3">Protein</span>
            </div>
            <div className="flex flex-row items-center"
            >
              <input type="checkbox" className="h-5 w-5 accent-green-600 border-gray-300 border-3 rounded-md"
                onChange={() => selectCategories("meat")}
                checked={categories.includes("meat")}
              />
              <span className="ml-3">Meat</span>
            </div>
          </div>
        </div>}

        <div className="flex flex-col mt-7">
          {searchItems &&
            <div className="sm:ml-7 ml-17">
              <span>
                Result for <span className="font-bold">{searchItems}</span>
              </span>
            </div>}
          <div className='sm:ml-0 ml-10 sm:w-[80vw] w-full flex flex-row flex-wrap'>
            {paginatedProducts.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col h-75 w-50 border-1 border-gray-200 mt-5 ml-6 shadow-sm rounded-3xl items-center hover:scale-106 hover:shadow-2xl transition-transform duration-300">
                <img
                  src={`https://api.michellalaoh.space${item.image}`}
                  className="w-40 h-40 object-contain mt-5 mx-2"
                />
                <div
                  onClick={() => {
                    handleAddToCart(item.id);
                  }}
                  className="absolute h-12 w-12 border-1 border-gray-200 shadow-lg items-center justify-center rounded-4xl flex right-2 bottom-25 bg-white text-3xl text-green-600 hover:cursor-pointer hover:shadow-lg hover:scale-105">
                  <span className="absolute top-1 left-3.2">+</span>
                </div>
                <div>
                  <span className="block mt-4 mx-5 text-sm">{item.name}</span>
                  <span className="block ml-5 mt-2 text-sm font-bold">{`$${(item.price / 100).toFixed(2)}`}</span>
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className="flex flex-row w-full justify-center items-center mt-10 gap-5">
                <span
                  className="page-number cursor-pointer"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {'<'}
                </span>

                {[...Array(totalPages)].map((_, index) => (
                  <span
                    key={index}
                    className={`page-number cursor-pointer ${currentPage === index + 1 ? 'font-bold text-green-600 underline' : ''
                      }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </span>
                ))}

                <span
                  className="page-number cursor-pointer"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {'>'}
                </span>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}