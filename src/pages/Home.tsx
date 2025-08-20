import HeroSection from "../components/HomePageComponents/HeroSection";
import WhyChooseUs from "../components/HomePageComponents/WhyChooseUs";
import Testimonials from "../components/HomePageComponents/Testimonials";
import CTABanner from "../components/HomePageComponents/CTABanner";
import Newsletter from "../components/HomePageComponents/Newsletter";
import Footer from "../components/HomePageComponents/Footer";
import FeaturedProducts from "../components/HomePageComponents/FeaturedProducts";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <Newsletter />
      <Footer />
    </>
  );
}
