import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeImages = [
  "/images/HomeImage1.png",
  "/images/HomeImage2.png",
  "/images/HomeImage3.png",
];

export default function CarouselComponent() {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      className="absolute top-0 left-0 w-full h-full z-0"
    >
      {HomeImages.map((image, index) => (
        <div key={index} className="w-full h-screen">
          <img
            src={image}
            alt="Background"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      ))}
    </Carousel>
  );
}
