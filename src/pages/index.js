"use client";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { events } from "@/queries/auth";
import { useState, useEffect } from "react";
import moment from "moment";

export default function Home() {
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");

  const currentMoment = moment(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    const fetchData = async (data) => {
      try {
        setLoading(true);
        const res = await events(data);
        setEventsList(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function getDefaultDate() {
    const event = eventsList[0];
    if (event) {
      const StartDate = getDate(event.StartDate);
      const EndDate = getDate(event.EndDate);
      if (StartDate === EndDate) {
        setCurrentTitle(StartDate);
      } else setCurrentTitle(`${StartDate} - ${EndDate}`);
    }
  }

  useEffect(() => {
    getDefaultDate();
  }, [eventsList]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = eventsList.map((item, index) => {
        const element = document.getElementById(item.ID);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            index,
            inView: rect.top >= 0 && rect.bottom <= window.innerHeight,
          };
        } else {
          return {
            index,
            inView: false,
          };
        }
      });

      const inViewElement = elements.find((item) => item.inView);

      if (inViewElement !== undefined) {
        setActiveIndex(inViewElement.index);
        const StartDate = getDate(eventsList[inViewElement.index].StartDate);
        const EndDate = getDate(eventsList[inViewElement.index].EndDate);
        if (StartDate === EndDate) {
          setCurrentTitle(StartDate);
        } else setCurrentTitle(`${StartDate} - ${EndDate}`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [eventsList]);

  function sortedEventsList(events) {
    const currentTimestamp = Date.now();

    function compareStartDate(eventA, eventB) {
      const startDateA = new Date(eventA.startDate);
      const startDateB = new Date(eventB.startDate);

      if (startDateA < currentTimestamp) {
        return 1;
      } else if (startDateB < currentTimestamp) {
        return -1;
      } else {
        return startDateA - startDateB;
      }
    }

    const sortedEvents = events.sort(compareStartDate);
    return sortedEvents;
  }

  const sortedEvents = sortedEventsList(eventsList);

  return (
    <main className="w-full h-full py-[10px] lg:py-[20px]">
      <Head>
        <title>Friends of 16</title>
        <link
          rel="icon"
          type="image/svg"
          href="/assets/Logo.svg"
          sizes="16x16"
        />
        <meta name="title" content="Friends of 16" />
        <meta
          name="description"
          content="16/16 is a serene space for intimate experiences designed to attract and serve creatives"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://friendsof16.vercel.app/" />
        <meta property="og:title" content="Friends of 16" />
        <meta
          property="og:description"
          content="16/16 is a serene space for intimate experiences designed to attract and serve creatives"
        />
        <meta
          property="og:image"
          content="https://friendsof16.vercel.app/assets/SEOImage.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://friendsof16.vercel.app/"
        />
        <meta property="twitter:title" content="Friends of 16" />
        <meta
          property="twitter:description"
          content="16/16 is a serene space for intimate experiences designed to attract and serve creatives"
        />
        <meta
          property="twitter:image"
          content="https://friendsof16.vercel.app/assets/SEOImage.png"
        />
      </Head>
      <div className="w-full fixed top-0 flex justify-between items-center py-[15px] lg:pb-0 lg:pt-[30px] px-[24px] lg:px-[96px] bg-white z-50">
        <p className="font-bold text-[18px] lg:text-[24px]">16/16</p>
        <Link href="/" className="font-normal text-[18px] lg:text-[24px]">
          Menu
        </Link>
      </div>
      <div className="w-full h-[100dvh] py-[50px] lg:py-[100px] flex flex-col justify-end items-center gap-[22dvh] lg:gap-[18vh]">
        <Image
          src="/assets/gif.gif"
          alt=""
          width={100}
          height={100}
          priority
          unoptimized
          className="w-[100px] lg:w-[150px]"
        />
        <div className="flex flex-col items-center gap-10 lg:gap-20">
          <p className="text-[18px] lg:text-[24px] text-center px-[32px]">
            {" "}
            16/16 is a serene space for
            <br /> intimate experiences designed
            <br /> to attract and serve creatives
          </p>
          <Image
            src="/assets/chevron-down.svg"
            alt=""
            width={20}
            height={20}
            priority
          />
        </div>
      </div>
      <div className="bg-white sticky justify-center w-full top-4 lg:top-10 pt-[10px] lg:pt-[5px] px-[24px] lg:px-[96px] z-40">
        <div className="w-full flex justify-between items-center mt-[40px]">
          <p className="font-bold text-[18px] lg:text-[24px]">Calendar</p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            {currentTitle}
          </p>
        </div>
        <hr className="mt-[20px] opacity-30" />
      </div>
      {loading ? (
        <div className="w-full text-center p-[40px]">
          <div className="font-normal text-[18px] lg:text-[24px]">
            Loading...
          </div>
        </div>
      ) : eventsList.length === 0 ? (
        <div className="w-full text-center p-[40px]">
          <div className="font-normal text-[18px] lg:text-[24px]">
            No events available
          </div>
        </div>
      ) : (
        sortedEvents.map((event, index) => (
          <div
            className="mt-[30px] lg:mt-[60px] lg:w-[600px] px-[24px] lg:px-0 flex flex-col gap-4 lg:gap-4 pb-[20px] lg:pb-0 lg:mx-auto"
            key={index}
            id={event.ID}
          >
            <p className="font-bold text-[18px] lg:text-[24px]">{event.Name}</p>
            <img
              src={event.Poster[0].url}
              alt=""
              style={{ position: "relative" }}
              fill="true"
              priority="true"
            />

            {currentMoment.isSameOrBefore(event.EndDate)}
            {event.RSVP === true && currentMoment.isAfter(event.EndDate) ? (
              <Link
                href={`/event/${event.ID}`}
                className="w-full h-[66px] border border-[#0a0a0a] bg-white text-[#0A0A0A] text-[18px] lg:text-[24px] font-bold flex justify-center items-center"
              >
                RSVP
              </Link>
            ) : currentMoment.isSameOrBefore(event.EndDate) ? (
              <div className="w-full h-[66px] border border-[#FF3131] text-[#FF3131] text-[18px] lg:text-[24px] font-bold flex justify-center items-center">
                Closed
              </div>
            ) : (
              <div className="w-full h-[66px] border border-[#e1e1e1] text-[#bebebe] text-[18px] lg:text-[24px] font-bold flex justify-center items-center">
                Sold out
              </div>
            )}
          </div>
        ))
      )}
    </main>
  );
}

function getDate(dateString) {
  if (!dateString) return;
  const dateObject = new Date(dateString);
  const todayObject = new Date();
  const dayIndex = dateObject.getDay();
  const date = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const month = MONTHS[monthIndex];
  const day = DAYS[dayIndex];
  if (
    date === todayObject.getDate() &&
    monthIndex === todayObject.getMonth() &&
    dateObject.getFullYear() === todayObject.getFullYear()
  ) {
    return "Today";
  }
  return `${day}, ${month} ${date}`;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
