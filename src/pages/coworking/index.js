"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { COWORKING } from "@/utils/nocode";
import { coworking } from "../../queries/auth";
import moment from "moment";
import Drawer from "react-modern-drawer";
import Select from "react-dropdown-select";
import "react-modern-drawer/dist/index.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const getNextValidCoworkingDay = (date) => {
  const nextDay = moment(date).add(1, "day");
  const dayOfWeek = nextDay.day();
  if (dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 1) {
    return getNextValidCoworkingDay(nextDay);
  }
  return nextDay;
};

let today = moment();

if (today.day() === 0 || today.day() === 6 || today.day() === 1) {
  today = getNextValidCoworkingDay(today);
}

const firstCoworkingDay = today;
const secondCoworkingDay = getNextValidCoworkingDay(firstCoworkingDay);

const coworkingDays = [
  firstCoworkingDay.format("MM/DD/YYYY"),
  secondCoworkingDay.format("MM/DD/YYYY"),
];

export default function Coworking() {
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

  const [selectedHour, setSelectedHour] = useState(COWORKING[0].hours[0]);

  const [selectedDay, setSelectedDay] = useState(coworkingDays[0]);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    setPhone(inputPhone);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(inputValue));
  };

  const handleTimeChange = (values) => {
    setSelectedHour(values.map((v) => v.value));

    const price = values.length * 75;
    setTotalPrice(price);
  };

  const handleButtonClick = async () => {
    const data = {
      Email: email,
      Name: name,
      Event: "Co-working",
      Date: selectedDay,
      Amount: null,
      "Time Slot": selectedHour,
      "Paid with": null,
      Type: "co-working",
      "Payment Reference": null,
      Phone: phone,
    };
    try {
      setLoading(true);
      const res = await coworking(data);
      console.log(res);
      setLoading(false);

      navigate(
        `/booked-coworking?email=${email}&name=${name}&time=${selectedHour}&day=${selectedDay}&type=${"coworking"}&phone=${phone}`
      );
    } catch (error) {
      setLoading(false);
      error;
    }
  };

  return (
    <div className="w-full h-[100dvh] lg:h-full py-[10px] lg:py-[20px]">
      <div className="w-full fixed top-0 flex justify-between items-center py-[15px] lg:pb-0 lg:pt-[30px] px-[24px] lg:px-[96px] bg-white z-10">
        <p className="font-bold text-[18px] lg:text-[24px]">16/16</p>
        <Link
          className="font-normal text-[18px] lg:text-[24px] cursor-pointer"
          href="/menu"
        >
          Menu
        </Link>
      </div>
      <div className="h-[80px] lg:h-[100px]"></div>
      <div className="h-[85dvh] lg:h-full px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto grid grid-col content-between gap-4 lg:gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-[18px] lg:text-[24px] font-bold">
            Co-working at 16/16
          </p>
          <Image
            src="/assets/image.png"
            alt=""
            width={900}
            height={400}
            priority
          />
          <div className="w-full flex flex-col">
            <p className="font-normal text-[18px] lg:text-[24px] w-full py-[12px] border-b border-black ">
              What's included
            </p>
            <p className="font-bold text-[18px] lg:text-[24px] w-full py-[12px] border-b border-black ">
              Communal seating
            </p>
            <p className="font-bold text-[18px] lg:text-[24px] w-full py-[12px]">
              Extra high stools by the bar
            </p>
          </div>
        </div>

        <button
          className="w-full h-[66px] bg-[#0a0a0a] text-[#ffffff] text-[18px] lg:text-[24px] font-bold mb-[10px]"
          onClick={toggleDrawer}
        >
          Book
        </button>
      </div>
      {isMobile ? (
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="bottom"
          className="w-full px-[24px] pt-[26px] pb-[48px] overflow-y-auto"
          size={560}
        >
          <div className="w-full flex flex-col gap-[26px]">
            <p className="text-[18px] font-bold">Book co-working</p>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Day</p>
              <div className="flex items-center gap-1">
                {coworkingDays.map((day) => (
                  <button
                    key={day}
                    className={`px-[12px] py-[10px] border w-full h-[56px] text-[#0A0A0A] ${
                      day === selectedDay
                        ? "border-2 border-[#0a0a0a] text-[20px]"
                        : "border-[#0a0a0a50] text-[18px]"
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {getDate(day)}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Time</p>
              <Select
                placeholder="Select time"
                options={COWORKING[0].hours.map((time) => ({
                  value: time,
                  label: time,
                }))}
                onChange={(values) => setSelectedHour(values[0].value)}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                color="black"
                contentRenderer={() => {
                  return <div>{[selectedHour]}</div>;
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Name</p>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Email Address</p>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Phone Number</p>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            {loading ? (
              <button
                disabled
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Please wait
              </button>
            ) : (
              <button
                disabled={
                  !isEmailValid || !name || !selectedDay || !selectedHour
                }
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Book
              </button>
            )}
          </div>
        </Drawer>
      ) : (
        <Modal open={isOpen} onClose={toggleDrawer} center closeIcon>
          <div className="w-[700px] flex flex-col gap-[26px] p-8">
            <p className="text-[18px] lg:text-[24px] font-bold">
              Book co-working
            </p>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] lg:text-[24px] font-normal">Day</p>
              <div className="flex items-center gap-4">
                {coworkingDays.map((day) => (
                  <button
                    key={day}
                    className={`px-[12px] py-[10px] border w-full h-[64px] text-[#0A0A0A] ${
                      day === selectedDay
                        ? "border-2 border-[#0a0a0a] text-[20px] lg:text-[28px]"
                        : "border-[#0a0a0a50] text-[18px] lg:text-[24px]"
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {getDate(day)}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] lg:text-[24px] font-normal">Time</p>
              <Select
                placeholder="Select time"
                options={COWORKING[0].hours.map((time) => ({
                  value: time,
                  label: time,
                }))}
                onChange={(values) => setSelectedHour(values[0].value)}
                className="w-full h-[64px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] lg:text-[24px] px-[12px] py-[10px] placeholder-[18px]"
                color="black"
                contentRenderer={() => {
                  return <div>{[selectedHour]}</div>;
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] lg:text-[24px] font-normal">Name</p>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full h-[64px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] lg:text-[24px] px-[12px] py-[10px]"
              />
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] lg:text-[24px] font-normal">
                Email Address
              </p>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full h-[64px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] lg:text-[24px] px-[12px] py-[10px]"
              />
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] lg:text-[24px] font-normal">
                Phone Number
              </p>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full h-[64px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] lg:text-[24px] px-[12px] py-[10px]"
              />
            </div>
            {loading ? (
              <button
                disabled
                className="w-full h-[74px] text-[18px] lg:text-[24px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Please wait
              </button>
            ) : (
              <button
                disabled={
                  !isEmailValid || !name || !selectedDay || !selectedHour
                }
                className="w-full h-[74px] text-[18px] lg:text-[24px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Book
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

function getDate(dateString) {
  if (!dateString) return;
  const dateObject = new Date(dateString);
  const todayObject = new Date();
  const tomorrowObject = new Date(todayObject);
  tomorrowObject.setDate(tomorrowObject.getDate() + 1);
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
  } else if (
    date === tomorrowObject.getDate() &&
    monthIndex === tomorrowObject.getMonth() &&
    dateObject.getFullYear() === tomorrowObject.getFullYear()
  ) {
    return "Tomorrow";
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
