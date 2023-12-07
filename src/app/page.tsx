import Navbar from "@/components/ui/Navbar/Navbar";
import FeaturedSection from "@/components/ui/HomePageSection/FeaturedSection";
import Banner from "@/components/ui/HomePageSection/Banner";
import React from "react";
import MakeupBlog from "@/components/ui/HomePageSection/MakeupBlog";
import GallerySection from "@/components/ui/HomePageSection/GallerySection";
import FAQSection from "@/components/ui/HomePageSection/FAQSection";
import ReviewSection from "@/components/ui/HomePageSection/ReviewSection";
import CapsuleBanner from "@/components/ui/HomePageSection/CapsuleBanner";

const MainPage = () => {
  return (
    <div>
      <Navbar sidebar={true} />
      <div className="pt-32 md:pt-36 lg:pt-44 max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
        <div className="lg:mb-32 mb-12">
          <Banner />
        </div>
        <div className="lg:my-32 my-12">
          <FeaturedSection />
        </div>
        <div className="lg:my-32 my-12">
          <CapsuleBanner />
        </div>
        <div className="lg:my-32 my-12">
          <MakeupBlog />
        </div>
        <div className="lg:my-32 my-12">
          <GallerySection />
        </div>
        <div className="lg:my-32 my-12">
          <FAQSection />
        </div>
        <div className="lg:my-32 my-12">
          <ReviewSection />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
