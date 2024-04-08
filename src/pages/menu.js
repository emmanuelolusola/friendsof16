"use client";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function Menu() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const emailAddress = "friends@16by16.co";
  const subject = "[Subject here]";
  const body = encodeURIComponent(`Hi 16/16,`);

  const handleWhatsAppClick = () => {
    const whatsappNumber = "+2348188325714";
    const message = encodeURIComponent(`Hi 16/16,`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailClick = () => {
    const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.open(emailUrl, "_blank");
  };

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
            href="/about"
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
          <div
            className="link-no-highlight flex gap-0 items-center justify-start lg:items-center"
            onClick={toggleDrawer}
          >
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
      {isMobile ? (
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          direction="bottom"
          className="w-full px-[24px] pt-[26px] pb-[48px] overflow-y-auto"
          size={250}
        >
          <div className="w-full flex flex-col gap-[26px]">
            <div className="flex flex-col gap-4">
              <div className="flex gap-0 items-start justify-start">
                <p className="text-[18px] font-bold">Contact us</p>
                <Image
                  src="/assets/arrowUp.svg"
                  alt=""
                  width={25}
                  height={25}
                />
              </div>
              <button
                className="w-full h-[74px] text-[18px] font-bold border border-black text-black"
                onClick={handleWhatsAppClick}
              >
                WhatsApp
              </button>
              <button
                className="w-full h-[74px] text-[18px] font-bold border border-black text-black"
                onClick={handleEmailClick}
              >
                Email
              </button>
            </div>
          </div>
        </Drawer>
      ) : (
        <Modal open={isOpen} onClose={toggleDrawer} center closeIcon>
          <div className="w-[500px] flex flex-col gap-[26px] p-4">
            <div className="flex gap-[5px] items-center justify-start">
              <p className="text-[18px] lg:text-[24px] font-bold">Contact us</p>
              <Image src="/assets/arrowUp.svg" alt="" width={30} height={30} />
            </div>
            <div className="flex flex-col gap-4">
              <button
                className="w-full h-[74px] text-[18px] lg:text-[24px] font-bold border border-black text-black hover:text-[#FF3131] hover:border-[#FF3131]"
                onClick={handleWhatsAppClick}
              >
                WhatsApp
              </button>
              <button
                className="w-full h-[74px] text-[18px] lg:text-[24px] font-bold border border-black text-black hover:text-[#FF3131] hover:border-[#FF3131]"
                onClick={handleEmailClick}
              >
                Email
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
