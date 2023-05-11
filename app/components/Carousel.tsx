"use client";
import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import Categories from "./nav/Categories";
import { TfiArrowCircleLeft } from "react-icons/tfi";
interface CarouselProps extends PropsWithChildren {
  vertical?: boolean;
  increment?: number;
  className?: string;
}
const Carousel: React.FC<CarouselProps> = ({
  className,
  vertical,
  increment = 185,
}) => {
  const [currentPos, setCurrentPos] = useState(0);
  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArrow, setRightArrow] = useState(true);
  const sliderWidth: any = useRef(null);
  const childref: any = useRef(null);

  useEffect(() => {
    childref.current.style.transform = `translateX(${-currentPos}px)`;
    if (currentPos === 0) {
      setTimeout(() => {
        setLeftArrow(false);
      }, 200);
    }
    if (
      currentPos ===
      childref.current.scrollWidth - sliderWidth.current?.clientWidth
    ) {
      setTimeout(() => {
        setRightArrow(false);
      }, 200);
    } else {
      setTimeout(() => {
        setRightArrow(true);
        setLeftArrow(true);
      }, 100);
    }
    console.log(currentPos);
  }, [currentPos]);

  const move = (direction: string) => {
    if (direction === "left") {
      setCurrentPos((cur) => {
        if (cur - increment <= 0) return 0;
        console.log("something");
        return cur - increment;
      });
    } else {
      setCurrentPos((cur) => {
        const rightWall =
          childref.current.scrollWidth - sliderWidth.current.clientWidth;
        console.log(cur + increment);
        if (cur + increment >= rightWall) return rightWall;
        return cur + increment;
      });
    }
  };
  return (
    <div
      className={`${className} md:px-16 xl:px-24 max-w-[2520px] flex ${
        vertical ? "flex-column" : "flex-row"
      }
      items-center
    `}
    >
      {leftArrow && (
        <TfiArrowCircleLeft
          size={45}
          onClick={() => move("left")}
          className="z-1 cursor-pointer rounded-full bg-white translate"
        />
      )}
      <div className="overflow-hidden" ref={sliderWidth}>
        <Categories ref={childref} />
      </div>

      {rightArrow && (
        <TfiArrowCircleLeft
          onClick={() => move("right")}
          size={45}
          className="z-1 cursor-pointer rounded-full bg-white translate"
          style={{ transform: "rotateY(180deg)" }}
        />
      )}
    </div>
  );
};

export default Carousel;
