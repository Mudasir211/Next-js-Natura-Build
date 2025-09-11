import Image from "next/image";
import Link from "next/link";

import BestSellersComponent from "@/components/BestSellers";
import AllProducts from "@/components/AllProducts";
import HeroCarousel from "@/components/HeroCarousel";
import Categories from "@/components/Categories";
import HomeSections from "@/components/HomeSections";


export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
     <HeroCarousel/>


      {/* Categories Section */}
     {/* Categories Section */}
{/* Categories Section */}
<Categories/>


<BestSellersComponent/>

<AllProducts/>
 
<HomeSections/>

      {/* About / Mission */}
     
    </div>
  );
}
