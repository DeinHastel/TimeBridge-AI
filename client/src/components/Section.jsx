import SectionSvg from "../assets/svg/SectionSvg";

const Section = ({
    className,
    id,
    crosses,
    crossesOffset,
    CustomPaddings,
    children
}) => {
  return (
    <div
    id={id} 
    className={`relative ${CustomPaddings || `py-16 lg:py-25 xl:py-32 ${crosses ? "lg:py-51 xl:py-64" : "" }
    ${className || ''}`}`}>
        
        {children}

        <div className='hidden absolute top-0 left-8 w-[0.20rem] h-full bg-stroke-1 pointer-events-none 
        md:block lg:left-12 xl:left-10' />
        <div className='hidden absolute top-0 right-8 w-[0.20rem] h-full bg-stroke-1 pointer-events-none 
        md:block lg:right-12 xl:right-10' />

        {crosses &&(
            <>
                <div 
                className={` hidden absolute top-0 left-12 right-12 h-0.4 bg-stroke-1 
                ${crossesOffset && crossesOffset} pointer-events-none lg:block xl:left-16 right-16`}
                />
                <SectionSvg crossesOffset={crossesOffset} />

            </>
        )}
      
    </div>
  )
}

export default Section
