"use client";

import React, { useState } from "react";
import Image from "next/image";
import imageSrc from "@/public/pexels-torsten-kellermann-349167-955656.jpg";

const ImageMagnifier = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const xPercent = ((e.pageX - left) / width) * 100;
    const yPercent = ((e.pageY - top) / height) * 100;
    setPosition({ x: xPercent, y: yPercent });

    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={imageSrc}
        alt="Magnified Image"
        width={500}
        height={500}
        className="real-img"
        quality={100}
      />
      {showMagnifier && (
        <div
          className="absolute w-52 h-52 pointer-events-none border-2 border-white rounded-full"
          style={{
            left: `${cursorPosition.x - 100}px`,
            top: `${cursorPosition.y - 100}px`,
            backgroundImage: `url(${imageSrc.src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: "650%",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
