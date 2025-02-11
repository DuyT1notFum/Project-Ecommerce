import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile] = useMobile()

  const [isSearchPage, setIsSearchPage] = useState(false);
  const params = useLocation()
  const searchText = params.search.slice(3)

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnchange = (e)=>{
    const value = e.target.value
    const url =`/search?q=${value}`
    navigate(url)
  }
  
  return (
    <div className=" group w-full  min-w-[300px] lg:min-w-[420px] h-12 
     rounded-lg border overflow-hidden flex items-center text-neutral-400 bg-neutral-100  
   focus-within:border-yellow-400">
      <div>
        {
          (isSearchPage && isMobile) ?
          (
            <Link to={"/"} className="flex justify-center items-center h-full p-3 
            text-neutral-500 group-focus-within:text-yellow-400 rounded-full 
             shadow-[2px_4px_6px_-1px_rgba(0,0,0,0.1),-2px_-4px_3px_rgba(0,0,0,0.08)]">
              <FaArrowLeft />
            </Link>
          ) :
          (
            <button className="flex justify-center items-center h-full p-3
             text-neutral-500 group-focus-within:text-yellow-400 ">
              <IoMdSearch size={25} />
            </button>
          )
          
        }
        
        
      </div>
      <div className="min-w-[500px] max-sm:min-w-[350px]">
        {!isSearchPage ? (
          // not in search page
          <div onClick={redirectToSearchPage}>
            <TypeAnimation
              sequence={[
                'Search "Milk"',
                1000,
                'Search "Bread"',
                1000,
                'Search "Panner"',
                1000,
                'Search "Sugar"',
                1000,
                'Search "Egg"',
                1000,
                'Search "Rice"',
                1000,
                'Search "Chips"',
                1000,
                'Search "Chocolate"',
                1000,
                'Search "Curd"',
                1000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // when search page
          <div className="w-full h-full group-hover:focus-within:border-yellow-300 ">
            <input type="text" placeholder="Search for items and more" 
            className="bg-transparent w-full outline-none text-gray-600" 
             autoFocus onChange={handleOnchange} defaultValue={searchText}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
