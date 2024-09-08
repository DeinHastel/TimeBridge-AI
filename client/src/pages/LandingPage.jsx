import '../Landing.css';
import ButtonGradient from '../assets/svg/ButtonGradient'
import Benefits from '../components/Benefits';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import Roadmap from '../components/Roadmap';
import Services from '../components/Services';

export function LandingPage() {
    return(
        <>
            <h1 className='text-[4.8rem]  font-bold underline'></h1>
            <div className="pt-[7.6rem] lg:pt-[8.4rem] overflow-hidden">
                <Header/>
                <Hero/>
                <Benefits/>
                <Services/>
                <Pricing/>
                <Roadmap/>
                <Footer/>
            </div>
            <ButtonGradient/>
            

        </>
    )

}