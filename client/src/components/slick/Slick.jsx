import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const Slick = ({ no, children }) => {
  const slidesToShow = Math.min(no, 4);

  const settings = {
    slidesToShow: no,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(slidesToShow, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(slidesToShow, 1),
        },
      },
    ],
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default Slick;
