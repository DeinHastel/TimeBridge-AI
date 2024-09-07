import React from 'react'
import Section from './Section'
import Heading from './Heading'
import { service1, service2, service3, check } from '../assets'
import { brainwaveServices, brainwaveServicesIcons } from '../constants'
import Generating from './Generating'

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
                        <p className="text-base leading-6 font-light mb-[3rem] text-n-3">TimeBridge desbloquea el potencial impulsado por IA</p>
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
                    <div className="relative min-h-[56rem] border border-n-1/10 rounded-3xl overflow-hidden">

                    </div>

                </div>

             </div>
        </div>
      
    </Section>
  )
}

export default Services
