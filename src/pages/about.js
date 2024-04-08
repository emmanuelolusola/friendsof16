import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function About() {
  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
      <Head>
        <title>About Friends of 16</title>
      </Head>
      <div className="w-full fixed top-0 flex justify-between items-center py-[15px] lg:pb-0 lg:pt-[30px] px-[24px] lg:px-[96px] bg-white z-10">
        <p className="font-bold text-[18px] lg:text-[24px]">16/16</p>
        <Link
          href="/menu"
          className="font-normal text-[18px] lg:text-[24px] cursor-pointer"
        >
          Menu
        </Link>
      </div>
      <div className="px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-4 mt-[100px]">
          <p className="text-[18px] lg:text-[24px] font-bold">About 16/16</p>
          <Image
            src="/assets/about.jpg"
            alt=""
            style={{ position: "relative" }}
            width={900}
            height={400}
            priority
          />
        </div>
        <p className="text-[18px] lg:text-[24px] leading-[32px] lg:leading-[42px]">
          <span className="font-bold">16/16</span> is a serene space for
          intimate experiences designed to attract and serve creatives,
          providing them a safe haven to unwind, network and be productive
          whilst enjoying exceptional amenities tailored exclusively for our
          network of Friends.
          <br />
          <br />
          Our creative hub and networking space has evolved over the years to
          become a space that marries comfort with serenity and productivity
          while upholding humility and excellence at the core of our operations.
          <br />
          <br />
          We are one part of a larger creative expression where hospitality and
          creativity meet the city of Lagos. Together, this network is a model
          of the future of the city and includes{" "}
          <span className="underline">Thai Thai</span> (a Thai food restaurant
          located in the same building as us),{" "}
          <span className="underline">hFACTOR</span> (a creative collective and
          social enterprise) and Designlab (an upcycling interior design
          studio). We invite you to step into our world as we leap into yours.
          <br />
          <br />
          Visit 16/16 to enjoy our offerings.
        </p>
        <div className="w-full flex flex-col">
          <p className="font-bold text-[18px] lg:text-[24px] w-full py-[12px] border-b border-black ">
            Co-working
          </p>
          <p className="font-bold text-[18px] lg:text-[24px] w-full py-[12px] border-b border-black ">
            Hotel accommodation
          </p>
          <p className="font-bold text-[18px] lg:text-[24px] w-full py-[12px] border-b border-black ">
            Sound room
          </p>
          <p className="font-bold text-[18px] lg:text-[24px] w-full py-[12px] border-b border-black ">
            Internet and printing
          </p>
          <p className="font-bold text-[18px] lg:text-[24px] w-full py-[12px]">
            Events
          </p>
        </div>
      </div>
    </div>
  );
}
