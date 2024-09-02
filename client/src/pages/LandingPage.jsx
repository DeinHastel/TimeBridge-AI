import '../Landing.css';
import ButtonGradient from '../assets/svg/ButtonGradient'
import Button from '../components/Button';
import Header from '../components/Header';
import Hero from '../components/Hero';

export function LandingPage() {
    return(
        <>
            <h1 className='text-[4.8rem]  font-bold underline'></h1>
            <div className="pt-[7.6rem] lg:pt-[8.4rem] overflow-hidden">
                <Header/>
                <Hero/>
            </div>
            <ButtonGradient/>
            

        </>
    )

}