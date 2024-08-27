import { useLocation, useNavigate  } from "react-router-dom";

import { brainwave } from "../assets"
import ChatgptLogo from '../assets/chatgptLogoNN.png';
import { navigation } from "../constants";
import Button from "./Button"

const Header = () => {
    const pathname = useLocation();
    const navigate = useNavigate();

  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-n-8/90 
    backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm'>
        <div className='flex items-center px-8 lg:px-12 xl:px-16 max-lg:py-6'>
            <a className="block w-[19.2] xl:mr-12" href="#hero"> 
                <img src={ChatgptLogo} width={100} height={40} alt="BrainWave"/>
            </a>

            <nav className="hidden fixed top-[4rem] left-0 right-0 bottom-0
            bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent">
                <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                    {navigation.map((item) => (
                        <a 
                        key={item.id} 
                        href={item.url}
                        className={`block relative font-code text-2xl uppercase text-n-1 transition-colors 
                            hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""} px-10 py-10
                            md:py-12 lg:-mr-0.4 lg:text-lg lg:font-semibold ${item.url === pathname.hash ? "z-3 lg:text-n-1" :
                                "lg:text-n-1/50"} lg:leading-8 lg:hover:text-n-1 xl:px-19`}
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </nav>
            <a onClick={() => { navigate('/registrate'); }}
            className="button hidden mr-12 text-n-1/50 transition-colors hover:text-n-1 lg:block">
                REGISTRATE
            </a>
            <Button className="hidden lg:flex text-center justify-center " onClick={() => { navigate('/login'); }}>
                Inicia Sesion

            </Button>

        </div>
    </div>
  )
}
 
export default Header
