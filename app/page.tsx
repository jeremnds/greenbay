import PageContainer from "@/src/components/atoms/PageContainer";
import Spinner from "@/src/components/atoms/Spinner";
import CartUpdater from "@/src/components/organisms/CartUpdater";
import CategoriesSection from "@/src/components/organisms/CategoriesSection";
import ProductsSection from "@/src/components/organisms/ProductsSection";
import { Package, PhoneOutgoing, Sprout } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export const revalidate = 300;

export default function Home() {
  return (
    <PageContainer>
      <div className="w-full h-96 bg-slate-500 rounded-lg flex">
        <div className="pt-8 pl-8 ">
          <h1 className="font-bold text-gray-50 text-6xl tracking-tighter">
            Buy your <span className="font-bold text-green-800">dream</span>{" "}
            plant.
          </h1>
          <div className="flex mt-12 text-white gap-4 text-md">
            <div className="border-r-2 pr-4 border-white">
              <p className="font-bold text-3xl">50+</p>
              <p>Plant Species</p>
            </div>
            <div>
              <p className="font-bold text-3xl">100+</p>
              <p>Customers</p>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full  pt-8 pr-8 hidden md:block">
          <Image
            src="/hero-image.png"
            fill
            alt="Hero image of a plant"
            className="object-cover  "
          />
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <ProductsSection />
      </Suspense>

      <section className="mt-20 flex flex-col items-center gap-3">
        <h3 className="font-bold text-2xl">About us</h3>
        <p className="text-gray-700 dark:text-gray-200">
          Order now and appreciate the beauty of nature
        </p>
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-3 mt-6">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-green-800 w-32 h-32 flex justify-center items-center">
              <Sprout className="w-16 h-16 text-gray-100" />
            </div>
            <h4 className="font-semibold">Large Assortment</h4>
            <p className="text-sm text-gray-800 text-center w-96 lg:w-full dark:text-gray-200">
              We offer many different types of products with fewer variations in
              each category
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-green-800 w-32 h-32 flex justify-center items-center">
              <Package className="w-16 h-16 text-gray-100" />
            </div>
            <h4 className="font-semibold">Fast & Free Shipping</h4>
            <p className="text-sm text-gray-800 text-center w-96 lg:w-full dark:text-gray-200  ">
              4-day or less delivery time, free shipping and an expedited
              delivery option.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-green-800 w-32 h-32 flex justify-center items-center">
              <PhoneOutgoing className="text-gray-100" width={64} height={64} />
            </div>
            <h4 className="font-semibold">24/7 Support</h4>
            <p className="text-sm text-gray-800 text-center w-96 lg:w-full dark:text-gray-200">
              Answers to any business related inquiry 24/7 and in real-time.
            </p>
          </div>
        </div>
      </section>
      <Suspense fallback={<Spinner />}>
        <CategoriesSection />
      </Suspense>
      <CartUpdater />
    </PageContainer>
  );
}
