
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t border-[#d2d6d3] '>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
            <p className="font-normal italic">© Thank you for accessing the website.</p>

            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href='' className='text-primary hover:scale-105 transition-all duration-300 cursor-pointer curs'>
                    <FaFacebook/>
                </a>
                <a href='' className='text-orther1 hover:scale-105 transition-all duration-300 cursor-pointer'>
                    <FaInstagram/>
                </a>
                <a href='' className='text-other2 hover:scale-105 transition-all duration-300 cursor-pointer'>
                    <FaLinkedin/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer