import { useLocation, useNavigate  } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets"
import ChatgptLogo from '../assets/chatgptLogoNN.png';
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from '../assets/svg/MenuSvg';
import { HamburgerMenu } from './design/Header';
import { useState } from "react";


const Header = () => {
    const pathname = useLocation();
    const navigate = useNavigate();

    const [openNavigation, setOpenNavigation] = useState(false);

    const toggleNavigation = () => {
        if(openNavigation){
            setOpenNavigation(false);
            enablePageScroll()
        } else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    };

    const handleClick = () => {
        if(!openNavigation) return;
        
        enablePageScroll()
        setOpenNavigation(false);
    }

  return (
    <div className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm
    ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"}`}>

        <div className='flex items-center px-8 lg:px-12 xl:px-16 max-lg:py-6'>
            <a className="block w-[20rem] xl:mr-12 z-50" href="#hero"> 
                <img src={ChatgptLogo} width={100} height={40} alt="BrainWave"/>
            </a>

            <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[4rem] left-0 right-0 bottom-0
            bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent z-40`}>

                <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                    {navigation.map((item) => (
                        <a 
                        key={item.id} 
                        href={item.url}
                        onClick={handleClick}
                        className={`block relative font-code text-2xl uppercase text-n-1 transition-colors 
                            hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""} px-10 py-10
                            md:py-12 lg:-mr-0.4 lg:text-lg lg:font-semibold ${item.url === pathname.hash ? "z-3 lg:text-n-1" :
                                "lg:text-n-1/50"} lg:leading-8 lg:hover:text-n-1 xl:px-19`}
                        >
                            {item.title}
                        </a>
                    ))}

                </div>
                <HamburgerMenu/>
            </nav>

            <a onClick={() => { navigate('/registrate'); }}
            className="button hidden mr-12 text-n-1/50 transition-colors hover:text-n-1 lg:block">
                REGISTRATE
            </a>
            <Button className="hidden lg:flex text-center justify-center " onClick={() => { navigate('/login'); }}>
                Inicia Sesion

            </Button>

            <Button className="ml-auto lg:hidden z-50" px="px-5" 
            onClick={toggleNavigation}>
                <MenuSvg openNavigation={openNavigation}/>


            </Button>

        </div>
    </div>
  )
}
 
export default Header
