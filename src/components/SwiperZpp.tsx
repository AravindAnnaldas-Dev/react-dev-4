import '../App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useState } from 'react';

const SwiperZpp = () => {
  const [scale, setScale] = useState(1);

  const handleDoubleClick = (zoomOut: any, resetTransform: any) => {
    if (scale === 1) {
      setScale(2); // Zoom in to 2x
    } else if (scale === 2) {
      setScale(4); // Zoom in to 4x
    } else {
      setScale(1); // Reset to original scale
      resetTransform();
      zoomOut(2);
    }
  };

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
            allowTouchMove={false}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 40 },
              1024: { slidesPerView: 3, spaceBetween: 50 },
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
                >
                  <TransformWrapper minScale={1} maxScale={4} initialScale={1}>
                    {({ zoomOut, resetTransform }) => (
                      <TransformComponent>
                        <div
                          id="my_image"
                          style={{
                            width: '380px',
                            height: '380px',
                            backgroundImage: `url("https://cdn.prod.website-files.com/660d0573aac44e36d36a0685/6613f471ba4f485ffebf5b33_6464859eba2ea7c68218180b_Unisex%2520Lightweight%2520Hoodie.jpeg")`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            cursor: 'grab',
                          }}
                          onDoubleClick={() =>
                            handleDoubleClick(zoomOut, resetTransform)
                          }
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
                      </TransformComponent>
                    )}
                  </TransformWrapper>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SwiperZpp;
