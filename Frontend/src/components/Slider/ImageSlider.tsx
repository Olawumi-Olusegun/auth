import { useEffect, useState } from "react";

type Props = {
    images: string[];
}

const ImageSlider = ({images}: Props) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

 const previousImage = () => {
   const nextIndex = (currentImageIndex - 1 + images.length) % images.length;
   setCurrentImageIndex(nextIndex);
 }

 const nextImage = () => {
  const nextIndex = (currentImageIndex + 1 ) % images.length;
  setCurrentImageIndex(nextIndex);
 }

 let timerIndex: any = 0;
 useEffect(() => {
  timerIndex = setInterval(() => nextImage(), 5000);
  return () => clearInterval(timerIndex);
 }, [currentImageIndex])

  return (
    <div className='relative  overflow-hidden'>
      <section className='flex justify-center items-center'>
      {images.map((image, index) => (
        <div key={index}>
          {currentImageIndex === index
          ? <img src={image}
            alt={`slide-${index + 1}`}
            key={index}
            className='w-full h-full object-contain rounded transition-all'
          />
          : null }
        </div>
      ) )}
      </section>
      <div className="absolute inset-0 flex items-center justify-between text-white text-4xl">
        <div className=" pl-4 cursor-pointer" onClick={previousImage}>Prev</div>
        <div className="pr-4 cursor-pointer" onClick={nextImage}>Next</div>
      </div>
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3 text-white text-4xl">
        {[0, 1, 2, 3, 4,].map((_, index) => <div key={index}>
        {currentImageIndex === index
        ? <div onClick={() => setCurrentImageIndex(index)} className="bg-blue-600 h-5 w-5 cursor-pointer rounded-full transition-all " /> 
        : <div onClick={() => setCurrentImageIndex(index)} className="bg-white h-3 w-3 hover:h-5 hover:w-5 transition-all cursor-pointer rounded-full" /> }
        </div>  )}
      </div>
    </div>
  )
}

export default ImageSlider