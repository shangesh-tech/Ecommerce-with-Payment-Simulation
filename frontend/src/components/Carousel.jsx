import React from "react";
import sidel1 from "../assets/1.webp";
import sidel2 from "../assets/2.webp";
import sidel3 from "../assets/3.webp";
import sidel4 from "../assets/4.jpg";
import sidel5 from "../assets/5.webp";
import sidel6 from "../assets/6.webp";

const Carousel = () => {
  return (
    <section className="flex items-center justify-center mt-3 cursor-pointer select-none">
      <div className="carousel w-full md:w-10/12">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
          <img src={sidel1} className="w-full md:w-3/12 rounded-3xl p-3" />
          <img src={sidel2} className="w-full md:w-3/12 rounded-3xl hidden md:block p-3" />
          <img src={sidel3} className="w-full md:w-3/12 rounded-3xl hidden md:block p-3" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2 mx-4" >
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
          <img src={sidel4} className="w-full md:w-3/12 rounded-3xl p-3" />
          <img src={sidel5} className="w-full md:w-3/12 rounded-3xl hidden md:block p-3" />
          <img src={sidel6} className="w-full md:w-3/12 rounded-3xl hidden md:block p-3" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2 mx-4">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
