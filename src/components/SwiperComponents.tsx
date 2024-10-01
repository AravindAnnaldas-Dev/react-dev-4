import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const App = () => {
  const [scalings, setScalings] = useState<number[]>(Array(4).fill(1));
  const [isDragging, setIsDragging] = useState<boolean[]>(Array(4).fill(false));
  const [startX, setStartX] = useState<number[]>(Array(4).fill(0));
  const [startY, setStartY] = useState<number[]>(Array(4).fill(0));
  const [initialX, setInitialX] = useState<number[]>(Array(4).fill(0));
  const [initialY, setInitialY] = useState<number[]>(Array(4).fill(0));
  const [initialDistance, setInitialDistance] = useState<number>(0);

  const imageRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));
  const containerRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));

  const calculateDistance = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

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

  const startDragging = (
    index: number,
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const container: any = containerRefs.current[index];
    const image: any = imageRefs.current[index];

    if (scalings[index] > 1) {
      const newDragging = [...isDragging];
      newDragging[index] = true;
      setIsDragging(newDragging);
      container.style.cursor = "grabbing";

      const matrix = new WebKitCSSMatrix(
        window.getComputedStyle(image).transform
      );
      const newInitialX = [...initialX];
      const newInitialY = [...initialY];
      newInitialX[index] = matrix.m41;
      newInitialY[index] = matrix.m42;
      setInitialX(newInitialX);
      setInitialY(newInitialY);

      if ("touches" in e) {
        const newStartX = [...startX];
        const newStartY = [...startY];
        newStartX[index] = e.touches[0].clientX;
        newStartY[index] = e.touches[0].clientY;
        setStartX(newStartX);
        setStartY(newStartY);
      } else {
        const newStartX = [...startX];
        const newStartY = [...startY];
        newStartX[index] = e.clientX;
        newStartY[index] = e.clientY;
        setStartX(newStartX);
        setStartY(newStartY);
      }
    }
  };

  const dragging = (
    index: number,
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const image: any = imageRefs.current[index];
    const container: any = containerRefs.current[index];

    if (isDragging[index] && scalings[index] > 1) {
      let deltaX: number, deltaY: number;

      if ("touches" in e) {
        deltaX = e.touches[0].clientX - startX[index];
        deltaY = e.touches[0].clientY - startY[index];
        e.preventDefault(); // Prevent scrolling while dragging
      } else {
        deltaX = e.clientX - startX[index];
        deltaY = e.clientY - startY[index];
      }

      let newX = initialX[index] + deltaX;
      let newY = initialY[index] + deltaY;

      const containerRect = container.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();

      // Calculate the max and min values for X and Y to keep the image in the viewport
      const maxX = (imageRect.width - containerRect.width) / 2;
      const minX = -(imageRect.width - containerRect.width) / 2;
      const maxY = (imageRect.height - containerRect.height) / 2;
      const minY = -(imageRect.height - containerRect.height) / 2;

      // Ensure the image doesn't move outside the container
      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      image.style.transform = `translate3d(${newX}px, ${newY}px, 0px) scale(${scalings[index]})`;
    }
  };

  const stopDragging = (index: number) => {
    const newDragging = [...isDragging];
    newDragging[index] = false;
    setIsDragging(newDragging);
    const container: any = containerRefs.current[index];
    container.style.cursor = "grab";
  };

  const handleTouchStart = (index: number, e: any) => {
    if (e.touches.length === 2) {
      setInitialDistance(calculateDistance(e.touches));
    } else if (e.touches.length === 1 && scalings[index] > 1) {
      startDragging(index, e); // Call startDragging for touch events
    }
  };

  const handleTouchMove = (index: number, e: any) => {
    if (e.touches.length === 2) {
      const newDistance = calculateDistance(e.touches);
      const scale = newDistance / initialDistance;
      zoomImage(index, Math.min(Math.max(1, scalings[index] * scale), 4));
    } else if (e.touches.length === 1 && scalings[index] > 1) {
      dragging(index, e); // Handle dragging when single touch
    }
  };

  // body overflow
  useEffect(() => {
    const allScalingsAreOne = scalings.every((scaling) => scaling === 1);
    document.body.style.overflow = allScalingsAreOne ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
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
                className="overflow-hidden !flex items-center justify-center"
              >
                <div
                  className="my_container w-full h-[380px] relative overflow-hidden border border-black"
                  ref={(el) => (containerRefs.current[index] = el)}
                  onMouseDown={(e) => startDragging(index, e)}
                  onMouseMove={(e) => dragging(index, e)}
                  onMouseUp={() => stopDragging(index)}
                  onMouseLeave={() => stopDragging(index)}
                  onTouchStart={(e) => handleTouchStart(index, e)}
                  onTouchMove={(e) => handleTouchMove(index, e)}
                  onTouchEnd={() => stopDragging(index)}
                >
                  <div
                    id="my_image"
                    ref={(el) => (imageRefs.current[index] = el)}
                    onDoubleClick={(e) => handleDoubleClick(index, e)}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url("https://cdn.prod.website-files.com/660d0573aac44e36d36a0685/6613f471ba4f485ffebf5b33_6464859eba2ea7c68218180b_Unisex%2520Lightweight%2520Hoodie.jpeg")`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      cursor: "grab",
                      transform: `scale(${scalings[index]})`,
                      transition: "all 0.2s linear",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                        color: "#ffffff",
                        userSelect: "none",
                        pointerEvents: "none",
                        fontSize: "18px",
                        fontWeight: "600",
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
