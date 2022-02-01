import React, { useCallback } from "react";
// const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });
import styled from "styled-components";
import { rgba } from "polished";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import CarouselItem from "./CarouselItem";
import { PrevButton, NextButton } from "./CarouselButtons";

const Wraper = styled.div`
  direction: ltr;
  overflow: hidden;
  position: relative;
  .embla__container {
    display: flex;
  }
  .embla__slide {
    position: relative;
    flex: 0 0 100%;
  }
  .embla__button {
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    touch-action: manipulation;
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    fill: ${rgba("#f8f5ef", 0.6)};
    padding: 5px;
    pointer-events: all;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 2rem;
    transition: all 300ms ease-in-out;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 15%), 0 0 0 rgb(16 22 26 / 0%),
      0 0 0 rgb(16 22 26 / 0%);
  }
  .embla__button:hover {
    fill: ${({ theme }) => rgba(theme.accent, 0.8)};
  }

  .embla__button:disabled {
    cursor: default;
    opacity: 0.3;
  }

  .embla__button__svg {
    width: 100%;
    height: 100%;
  }

  .embla__button--prev {
    left: 27px;
  }

  .embla__button--next {
    right: 27px;
  }
`;

const Hero = ({ posts }) => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, speed: 5 }, [
    Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  return (
    <Wraper className="embla" ref={emblaRef}>
      <div className="embla__container">
        {posts?.slice(0, posts.length > 3 ? 3 : posts.length)?.map((post) => (
          <CarouselItem post={post} key={post?._id} />
        ))}
      </div>
      <PrevButton onClick={scrollPrev} />
      <NextButton onClick={scrollNext} />
    </Wraper>
  );
};

export default Hero;
