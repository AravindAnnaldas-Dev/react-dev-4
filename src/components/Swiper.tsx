import '../App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const App = () => {
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

  return (
    <div className="w-full py-[80px]">
      <div className="w-full max-w-[1220px] h-full px-4 m-auto">
        <div className="w-full h-full">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            onSlideChange={() => setScalings(Array(4).fill(1))}
            allowTouchMove={false}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default App;
