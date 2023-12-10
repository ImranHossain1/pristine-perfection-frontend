import Image from "next/image";
import React from "react";
import Heading from "../Heading/Heading";
import gallery1 from "../../../asset/image/gallery1.webp";
import gallery2 from "../../../asset/image/gallery2.webp";
import gallery3 from "../../../asset/image/gallery3.webp";
import gallery4 from "../../../asset/image/gallery4.webp";
import gallery5 from "../../../asset/image/gallery5.webp";
const GallerySection = () => {
  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery1,
    gallery1,
    gallery1,
    gallery1,
  ];

  return (
    <div>
      <Heading label="Gallery" subLabel="Makeup" />
      <div className="carousel w-full rounded">
        {images?.map((img: any, index: number) => (
          <div key={index} className="carousel-item">
            <Image src={img} alt="" width={300} height={300} className="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
