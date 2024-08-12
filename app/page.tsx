import PageContainer from "@/src/components/atoms/PageContainer";
import { buttonVariants } from "@/src/components/atoms/Button";
import { cn } from "@/src/lib/utils";
import { Package, PhoneOutgoing, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <PageContainer>
      <div className="w-full h-96 bg-green-400 rounded-lg flex">
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

      <section className="mt-20 grid grid-rows-2 grid-cols-2 md:grid-cols-2  lg:grid-rows-1 lg:grid-cols-4 lg:gap-6 gap-4 ">
        <div className="flex flex-col gap-6  w-52 justify-center lg:justify-normal">
          <h3 className="font-medium text-2xl w-36">Best Selling Plants</h3>
          <p>Easiest way to healthy life by buying your favorite plants </p>
          <Link href="/products" className={cn(buttonVariants())}>
            See more &rarr;
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <div className=" h-96 bg-green-100"></div>
          <p>Natural Plants</p>
          <span>$100</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className=" h-96 bg-green-100"></div>
          <p>Natural Plants</p>
          <span>$100</span>
        </div>

        <div className="flex flex-col gap-1 ">
          <div className=" h-96 bg-green-100"></div>
          <p>Natural Plants</p>
          <span>$100</span>
        </div>
      </section>

      <section className="mt-20 flex flex-col items-center gap-3">
        <h3 className="font-bold text-2xl">About us</h3>
        <p className="text-gray-700">
          Order now and appreciate the beauty of nature
        </p>
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-3 mt-6">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-green-800 w-32 h-32 flex justify-center items-center">
              <Sprout className="w-16 h-16 text-gray-100" />
            </div>
            <h4 className="font-semibold">Large Assortment</h4>
            <p className="text-sm text-gray-800 text-center w-96 lg:w-full">
              We offer many different types of products with fewer variations in
              each category
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-green-800 w-32 h-32 flex justify-center items-center">
              <Package className="w-16 h-16 text-gray-100" />
            </div>
            <h4 className="font-semibold">Fast & Free Shipping</h4>
            <p className="text-sm text-gray-800 text-center w-96 lg:w-full">
              4-day or less delivery time, free shipping and an expedited
              delivery option.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-green-800 w-32 h-32 flex justify-center items-center">
              <PhoneOutgoing className="text-gray-100" width={64} height={64} />
            </div>
            <h4 className="font-semibold">24/7 Support</h4>
            <p className="text-sm text-gray-800 text-center w-96 lg:w-full">
              Answers to any business related inquiry 24/7 and in real-time.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-20 flex flex-col items-center  gap-3 ">
        <h3 className="font-bold text-2xl">Categories</h3>
        <p className="text-gray-700">Find what you are looking for</p>
        <div className="mt-5 pb-5 lg:pb-0 bg-green-300 h-full lg:h-96 w-full rounded-xl flex justify-center lg:items-center ">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 lg:gap-8">
            <div className="pt-12 lg:pt-0 ">
              <div className="w-52 h-52 bg-green-800"></div>
              <p className="pt-2 ">Natural Plants</p>
            </div>
            <div className="">
              <div className="w-52 h-52 bg-green-800"></div>
              <p className="pt-2 ">Plant Accessories</p>
            </div>
            <div className="">
              <div className="w-52 h-52 bg-green-800"></div>
              <p className="pt-2 ">Artificial Plants</p>
            </div>
            <Link
              href="/categories"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "text-center lg:col-start-2 mt-2 lg:mt-0"
              )}
            >
              Explore
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
