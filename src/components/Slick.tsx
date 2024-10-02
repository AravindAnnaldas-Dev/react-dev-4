import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slick = () => {
  const [scalings, setScalings] = useState<number[]>(Array(4).fill(1));

  const imageRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));
  const containerRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));

  const zoomImage = (index: number, scale: number) => {
    const image = imageRefs.current[index];
    if (!image) return;
    const newScalings = [...scalings];
    newScalings[index] = scale;
    setScalings(newScalings);
    image.style.transform = `translate3d(0px, 0px, 0px) scale(${scale})`;
  };

  const handleDoubleClick = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const image = imageRefs.current[index];
    if (!image) return;

    const rect = image.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const newScaling =
      scalings[index] === 1 ? 2 : scalings[index] === 2 ? 4 : 1;

    image.style.transformOrigin = `${(offsetX / rect.width) * 100}% ${
      (offsetY / rect.height) * 100
    }%`;
    zoomImage(index, newScaling);
  };

  // body overflow
  useEffect(() => {
    const allScalingsAreOne = scalings.every((scaling) => scaling === 1);
    document.body.style.overflow = allScalingsAreOne ? 'auto' : 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [scalings]);

  const settings = {
    dots: true, // For pagination
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3, // Default slides per view
    slidesToScroll: 1,
    swipe: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Slides per view at 1024px
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          spaceBetween: 50, // Space between slides (note: you might need custom CSS for this)
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Slides per view at 768px
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1, // Slides per view at 640px
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: () => setScalings(Array(4).fill(1)), // Trigger on slide change
  };

  return (
    <div className="w-full py-[80px]">
      <div className="w-full max-w-[1220px] h-full px-4 m-auto">
        <div className="w-full h-full">
          <Slider {...settings}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="my_container"
                  style={{
                    border: '1px solid black',
                    width: '100%',
                    height: '380px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  ref={(el) => (containerRefs.current[index] = el)}
                >
                  <div
                    id="my_image"
                    ref={(el) => (imageRefs.current[index] = el)}
                    onDoubleClick={(e) => handleDoubleClick(index, e)}
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url("https://cdn.prod.website-files.com/660d0573aac44e36d36a0685/6613f471ba4f485ffebf5b33_6464859eba2ea7c68218180b_Unisex%2520Lightweight%2520Hoodie.jpeg")`,
                      backgroundSize: '100% 100%',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      cursor: 'grab',
                      transformOrigin: 'center center',
                      transform: `scale(${scalings[index]})`,
                      transition:
                        'transform 0.2s linear, transform-origin 0.1s linear',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        color: '#ffffff',
                        userSelect: 'none',
                        pointerEvents: 'none',
                        fontSize: '18px',
                        fontWeight: '600',
                      }}
                    >
                      Dynamic data
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Slick;
