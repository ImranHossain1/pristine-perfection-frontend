import Image from "next/image";
import React from "react";
import Heading from "../Heading/Heading";

const GallerySection = () => {
  const images = [
    "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702335590/h8132vr1lkwmp9qdj4kh.jpg",
    "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702335661/uamluxvdttawvl89rmdj.jpg",
    "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702335730/tqqicavt27njbiwi5zu8.jpg",
    "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702335810/xopstcc71amwfw9xwj66.jpg",
    "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702335841/ipcdaprqyozww7zou7id.jpg",
    "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702335841/ipcdaprqyozww7zou7id.jpg",
    "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702335841/ipcdaprqyozww7zou7id.jpg",
    "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702335841/ipcdaprqyozww7zou7id.jpg",
    "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702335841/ipcdaprqyozww7zou7id.jpg",
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
