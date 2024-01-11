
import image1 from './../../assets/fn1.jpg';
import image2 from './../../assets/fn2.jpg';
import image3 from './../../assets/fn3.jpg';
import image4 from './../../assets/fn4.jpg';
import image5 from './../../assets/fn5.jpg';
import ImageSlider from './ImageSlider';


const Slider = () => {

    const images = [image1, image2, image3, image4, image5];

  return (
    <div className='flex items-center justify-center h-screen'>
        <div className="max-h-[375px] w-[700px] p-2 md:p-0" >
            <ImageSlider images={images} />
        </div>
    </div>
  )
}

export default Slider