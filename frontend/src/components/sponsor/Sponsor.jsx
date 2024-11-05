import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import spon1 from '../../assets/banner/img1.webp'
import spon2 from '../../assets/banner/img5.webp'
import spon3 from "../../assets/banner/img3.jpg"
import spon1m from "../../assets/banner/img1_mobile.jpg"
import spon2m from "../../assets/banner/img5_mobile.png"
import spon3m from "../../assets/banner/img3_mobile.jpg"
// Custom previous arrow component
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div>
    <div>
        <p className="font-semibold font-mono text-blue-600">#Sponsor</p>
    </div>
    <div className=" flex items-center justify-end" onClick={onClick}>
      <button className="text-white bg-[#0078AD] p-3 rounded-full text-2xl mb-3 md:mb-0">
        <GrCaretPrevious />
      </button>
    </div></div>
  );
};

// Custom next arrow component
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className=" flex items-center justify-end " onClick={onClick}>
      <button className="text-white bg-[#0078AD] p-3 rounded-full text-2xl mt-3 md:mt-0">
        <GrCaretNext />
      </button>
    </div>
  );
};

export default function Sponsor() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    cssEase: "linear",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <>
    {/* md */}
    <section className="mx-32 border border-[#0078AD] p-5 my-6 rounded-lg hidden md:block">
      
      <Slider {...settings} className="mb-6" >
        <div>
        <img src={spon1} className=" w-full h-60 rounded-full" />
        
        </div>
        <div>
        <img src={spon2} className=" w-full h-60 rounded-full" />
        </div>
        <div>
        <img src={spon3} className=" w-full h-60 rounded-full" />
        </div>
      </Slider>
      
    </section>
    {/* mobile */}
    <section className=" mx-5 block md:hidden  border border-[#0078AD] p-5 my-10 rounded-lg ">
      <Slider {...settings} className="mb-6" >
        <div>
        
        <img src={spon1m} className=" w-full h-60 rounded-2xl px-1" />
        </div>
        <div>
        <img src={spon2m} className=" w-full h-60  rounded-2xl px-1" />
        </div>
        <div>
        <img src={spon3m} className=" w-full h-60  rounded-2xl px-1" />
        </div>
      </Slider>
      </section></>
  );
}
