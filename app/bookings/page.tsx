"use client";

import dynamic from "next/dynamic";

/*
========================================
DYNAMIC BOOKING PAGE
========================================
*/

const BookingPage = dynamic(

  () => import("@/modules/bookings/BookingPage"),

  {

    ssr: false,

    loading: () => (

      <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-[#7A0019] border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-6 text-[#7A0019] font-semibold tracking-[3px] uppercase text-sm">

            Preparing Your Party

          </p>

        </div>

      </div>

    ),

  }

);

/*
========================================
PAGE
========================================
*/

export default function Page() {

  return <BookingPage />;

}