import React from 'react'
import Section from './Section'
import Heading from './Heading'
import { service1, service2, service3, check } from '../assets'
import { brainwaveServices, brainwaveServicesIcons } from '../constants'
import Generating from './Generating'
import {PhotoChatMessage, Gradient, VideoBar, VideoChatMessage} from "./design/Services";

const Services = () => {
  return (
    <Section id="how-to-use">
        <div className="container">
            <Heading
            className="text-center" 
            title="AI generativa para programadores"
            text="TimeBridge desbloque el potencial de las Aplicaciones de la AI"
             />

             <div className="relative">
                <div className='relative z-1 flex items-center h-[60rem] mb-5 p-12 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[74rem]'>
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
                        <img
                        className="w-full h-full object-cover md:object-right"
                        width={800}
                        height={730} 
                        alt='Smartest AI'
                        src={service1}
                        />
                    </div>
                    <div className="relative z-1 max-w-[24rem] ml-auto">
                        <h4 className='h4 mb-4'>IA Audaz</h4>
                        <p className="text-base leading-6 font-light mb-[3rem] text-n-3">
                            TimeBridge desbloquea el potencial impulsado por IA
                        </p>
                        <ul className='text-lg leading-6 font-light'>
                            {brainwaveServices.map((item, index) => (
                                <li key={index} className="flex items-start py-4 border-t border-n-7 ">
                                    <img 
                                    src={check} 
                                    alt=""
                                    width={24}
                                    height={24}
                                     />
                                    <p className="ml-4">{item}</p>

                                </li>
                            ))}
                        </ul>
                    </div>
                    <Generating 
                    className="absolute left-4 right-4 bottom-4 border-n-1/10 border 
                    lg:left-1/2 lg:right-6 lg:bottom-6 lg:-translate-x-1/2 
                    xl:left-1/2 xl:right-8 xl:bottom-8 xl:-translate-x-1/2 "/>
                </div>

                <div className="relative z-1 grid gap-5 lg:grid-cols-2 xl:grid-cols-2">
                    <div className="relative min-h-[56rem] 
                    border border-n-1/10 rounded-3xl overflow-hidden">
                    <div className='absolute inset-0 '>
                        <img 
                        src={service2} 
                        className="h-full w-full object-cover"
                        width={630}
                        height={750}
                        alt="robot" />
                    </div>
                    <div className="absolute inset-0 flex flex-col 
                    justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15 xl:p-15">
                        <h4 className='h4 mb-4'>Optimizacion IA</h4>
                        <p className="text-lg leading-6 font-light mb-[3rem] text-n-3">
                            Mejora automaticamente tu codigo usando nuestra
                            aplicion de inteligencia artficial. Pruebalo ahora mismo!
                        </p>
                    </div>

                    <PhotoChatMessage/>
                    </div>

                    <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem] xl:min-h-[46rem]">
                        <div className="py-12 px-4 xl:px-8">
                            <h4 className="h4 mb-4 ">Generacion de codigo</h4>
                            <p className="text-lg leading-6 font-light mb-[2rem] text-n-3">
                                La generacion de codigo Python con IA
                                mas poderosa apoyada con ChatGpt.
                                Cuantas cosas podras crear? Proximamente
                            </p>

                            <ul className="flex items-center justify-between">
                                {brainwaveServicesIcons.map((item, index) =>(
                                    <li
                                    key={index} 
                                    className={`rounded-2xl flex items-center justify-center 
                                    ${index === 2 ? 'w-[3rem] h-[3rem] p-[0.1rem] bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]' :
                                        'flex w-10 h-10 bg-n-6 md:w-[3.6rem] md:h-[3.6rem]'
                                    }`}
                                    >
                                        <div className={index === 2 ?
                                        'flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]' :
                                        ''}>
                                            <img
                                            width={24}
                                            height={24} 
                                            src={item} 
                                            alt={item} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative h-[30rem] bg-n-8 rounded-xl overflow-hidden md:h-[35rem]">
                            <img 
                            src={service3}
                            className="w-full h-full object-cover"
                            width={520}
                            height={400}
                            alt="Scary robot" 
                            />

                            <VideoChatMessage/>
                        </div>
                    </div>
                </div>
                <Gradient/>
             </div>
        </div>
      
    </Section>
  )
}

export default Services
