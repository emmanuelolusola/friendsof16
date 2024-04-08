import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function Menu() {
  return (
    <div className="w-full h-[100dvh] py-[10px] lg:py-[20px]">
      <Head>
        <title>Friends of 16</title>
      </Head>
      <div className="bg-white fixed w-full top-0 px-[24px] lg:px-[96px] pt-[10px]">
        <div className="w-full flex justify-between items-center mt-[15px]">
          <p className="font-bold text-[18px] lg:text-[24px]">16/16</p>
          <Link href="/" className="font-normal text-[18px] lg:text-[24px]">
            Close
          </Link>
        </div>
        <hr className="mt-[20px] opacity-30" />
      </div>
      <div className="h-[80px] lg:h-[120px]"></div>
      <div className="px-[24px] lg:px-[96px] h-[82dvh] grid content-between lg:flex lg:justify-between pb-[0px]">
        <div className="lg:w-[800px] flex flex-col gap-4">
          <Link
            href="https://maps.app.goo.gl/EdXswCyELe3quRJS6?g_st=ic"
            target="_blank"
            rel="noreferrer"
            className="link-no-highlight flex gap-2 text-[18px] font-normal underline"
          >
            <Image
              src="/assets/location.svg"
              alt=""
              width={20}
              height={20}
              priority
            />
            <p className="font-normal text-[18px] lg:text-[24px]">
              16 Kofo Abayomi
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-[24px] lg:items-end">
          <Link
            href="/"
            className="font-bold text-[18px] lg:text-[24px] hover:text-[#FF3131] cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/about-16"
            className="font-bold text-[18px] lg:text-[24px] hover:text-[#FF3131] cursor-pointer"
          >
            About 16/16
          </Link>
          <Link
            href="/coworking"
            className="font-bold text-[18px] lg:text-[24px] cursor-pointer hover:text-[#FF3131]"
          >
            Co-working
          </Link>
          <div className="flex gap-0 items-center justify-start lg:items-center">
            <Link
              href="https://www.16by16.co/home/reservations "
              target="_blank"
              rel="noreferrer"
              className="link-no-highlight text-[18px] lg:text-[24px] font-bold hover:text-[#FF3131]"
            >
              Reservations
            </Link>
            <Image
              src="/assets/arrowUp.svg"
              alt=""
              width={20}
              height={20}
              priority
            />
          </div>
          <div className="link-no-highlight flex gap-0 items-center justify-start lg:items-center">
            <p className="text-[18px] lg:text-[24px] font-bold hover:text-[#FF3131] cursor-pointer">
              Contact us
            </p>
            <Image
              src="/assets/arrowUp.svg"
              alt=""
              width={20}
              height={20}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
