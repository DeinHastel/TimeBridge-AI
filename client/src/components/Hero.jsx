import { curve, heroBackground, robot } from "../assets"
import Section from "./Section"
import Button from "./Button"

const Hero = () => {
  return (
    <Section className="pt-[19rem] -mt-[8rem]" 
    crosses 
    crossesOffset="lg:translate-y-[8rem]"
    CustomPaddings
    id="hero"
    
    >
        <div className="container relative">
            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 
            lg:mb:[6rem]">
                <h1 className="h1 mb-6">
                    Explora la IA Chateando con
                    <span className="inline-block relative">
                        TimeBridge 
                        <img 
                            src={curve} 
                            className="pt-3 absolute top-full left-0 w-full xl:-mt-2"
                            width={624}
                            height={28}
                            alt="Curve" 
                        />
                    </span>
                </h1>
                <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 pt-2">Desata el poder de la IA con TimeBridge.
                    Mejora tu productivdad Con TimeBridge, la aplicacion abierta para IA 
                </p>
                <Button href="/pricing" white>
                    Comienza
                </Button>
            </div>
            <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
                <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
                    <div className="relative bg-n-8 rounded-[1rem]">
                        <div className="h-[1.1rem] bg-n-10 rounded-t-[0.9rem]"/>
                        <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] 
                        lg:aspect-[1024/490]">
                            <img 
                            src={robot} 
                            className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] 
                            lg:-translate-y-[23%]"
                            width={1024}
                            height={490}
                            alt="IA" />
                        </div>
                    </div>
                </div>
                <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top[46%] 
                md:w-[138%] lg:-top-[104%]">
                    <img
                    src={heroBackground}
                    className="w-full"
                    width={1440}
                    height={1800}
                    alt="hero"
                    />
                </div>
            </div>
        </div>
    </Section>
  )
}

export default Hero
