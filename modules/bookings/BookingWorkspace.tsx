"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import BookingContainer
from "./layout/BookingContainer";

import BookingHeader
from "./layout/BookingHeader";

import PackageHero
from "./sections/PackageHero";

import PackageOverview
from "./sections/PackageOverview";

import PackageMenu
from "./sections/PackageMenu";

import FoodAddons
from "./sections/FoodAddons";

import ServiceAddons
from "./sections/ServiceAddons";

import ComboAddons
from "./sections/ComboAddons";

/*
========================================
BOOKING STORE
========================================
*/

import {

  useSelectedPackage,

  useBookingPricing,

  useFoodAddons,

  useComboAddons,

  useServiceAddons,

  useGuestCount,

} from "@/state/booking/bookingSelectors";

/*
========================================
PROPS
========================================
*/

interface Props {

  packageMenu: any[];

  selectedMenuItems: any;

  setSelectedMenuItems: any;

  foodAddons: any[];

  addonMappings: any[];

  operationalContext: any;

  runtimeContext: any;

  serviceAddons: any[];

  combos: any[];
}

/*
========================================
COMPONENT
========================================
*/

export default function BookingWorkspace({

  packageMenu,

  selectedMenuItems,

  setSelectedMenuItems,

  foodAddons,

  addonMappings,

  operationalContext,

  serviceAddons,

  combos,

}: Props) {

  const router =
    useRouter();

  /*
  ========================================
  MOBILE MENU
  ========================================
  */

  const [
    showMobileMenu,
    setShowMobileMenu,
  ] = useState(false);

  /*
  ========================================
  SECTION REFS
  ========================================
  */

  const overviewRef =
    useRef<HTMLDivElement>(null);

  const menuRef =
    useRef<HTMLDivElement>(null);

  const foodRef =
    useRef<HTMLDivElement>(null);

  const serviceRef =
    useRef<HTMLDivElement>(null);

  const comboRef =
    useRef<HTMLDivElement>(null);

  const summaryRef =
    useRef<HTMLDivElement>(null);

  /*
  ========================================
  SCROLL HANDLER
  ========================================
  */

  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement | null>
  ) => {

    ref.current?.scrollIntoView({

      behavior: "smooth",

      block: "center",

    });

    setShowMobileMenu(false);

  };

  /*
  ========================================
  STORE SELECTORS
  ========================================
  */

  const selectedPackage: any =
  useSelectedPackage();

  const pricing =
    useBookingPricing();

  const selectedFoodAddons =
    useFoodAddons();

  const selectedComboAddons =
    useComboAddons();

  const selectedServiceAddons =
    useServiceAddons();

  const guestCount =
    useGuestCount();

  /*
  ========================================
  PACKAGE VALUES
  ========================================
  */

  const packageName =

    selectedPackage?.name ||

    selectedPackage?.package_name ||

    "Celebration Experience";

  const packageDescription =

    selectedPackage?.description ||

    selectedPackage?.package_description ||

    "";

  /*
  ========================================
  NORMALIZED TOTAL
  ========================================
  */

  const normalizedBaseAmount =

    pricing?.baseAmount > 0

      ?

      pricing.baseAmount

      :

      Number(

        selectedPackage?.basePrice ||

        selectedPackage?.selling_price ||

        selectedPackage?.package_price ||

        0

      );

  const normalizedGrandTotal =

    normalizedBaseAmount +

    Number(pricing?.foodAmount || 0) +

    Number(pricing?.comboAmount || 0) +

    Number(pricing?.serviceAmount || 0) +

    Number(pricing?.extraGuestAmount || 0) +

    Number(pricing?.taxAmount || 0);

  /*
  ========================================
  PACKAGE IMAGE
  ========================================
  */

  const imageSrc =
    useMemo(() => {

      if (
        packageName ===
        "Celebration Pack"
      ) {

        return "/packages/celebration-pack.jpg";
      }

      if (
        packageName ===
        "Family Fiesta"
      ) {

        return "/packages/family-fiesta.jpg";
      }

      if (
        packageName ===
        "Little Stars"
      ) {

        return "/packages/little-stars.jpg";
      }

      return "/packages/chill-and-celebrate.jpg";

    }, [packageName]);

  /*
  ========================================
  TOTAL SELECTED
  ========================================
  */

  const totalSelections =

    selectedFoodAddons.length +

    selectedComboAddons.length +

    selectedServiceAddons.length;

  /*
  ========================================
  RENDER
  ========================================
  */

  return (

    <BookingContainer>

      {/* ========================================
          HEADER
      ======================================== */}

      <BookingHeader

        title="Customize Your Celebration"

        subtitle="Fine tune your curated event experience with personalized menus, premium addons, and celebration enhancements."

      />

      {/* ========================================
          LAYOUT
      ======================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          lg:gap-8
          mt-6
          lg:mt-10
        "
      >

        <div className="space-y-5 lg:space-y-8">

          {/* HERO */}

          <PackageHero

            imageSrc={imageSrc}

            packageName={packageName}

            tagline={packageDescription}

          />

          {/* OVERVIEW */}

          <div ref={overviewRef}>

            <PackageOverview

              selectedPackage={
                selectedPackage
              }

              activeBasePlan={
                operationalContext.activeBasePlan
              }

              activeExtraGuests={
                operationalContext.activeExtraGuests
              }

            />

          </div>

          {/* MENU */}

          <div ref={menuRef}>

            <PackageMenu

              packageMenu={
                packageMenu || []
              }

              foodPreference={
                "Veg"
              }

              selectedMenuItems={
                selectedMenuItems || {}
              }

              setSelectedMenuItems={
                setSelectedMenuItems
              }

            />

          </div>

          {/* FOOD ADDONS */}

          <div ref={foodRef}>

            <FoodAddons

              foodAddons={
                foodAddons || []
              }

              addonMappings={
                addonMappings || []
              }

              operationalContext={
                operationalContext
              }

            />

          </div>

          {/* SERVICE ADDONS */}

          <div ref={serviceRef}>

            <ServiceAddons

              serviceAddons={
                serviceAddons || []
              }

            />

          </div>

          {/* COMBO ADDONS */}

          <div ref={comboRef}>

            <ComboAddons

              combos={
                combos || []
              }

              foodAddons={
                foodAddons || []
              }

              serviceAddons={
                serviceAddons || []
              }

              addonMappings={
                addonMappings || []
              }

              operationalContext={
                operationalContext
              }

            />

          </div>

        </div>

      </div>

      {/* ========================================
          FLOATING SUMMARY CTA
      ======================================== */}

      <button

        onClick={() => {

          router.push(
            "/bookings/summary"
          );

        }}

        className="
          fixed
          bottom-6
          left-1/2
          -translate-x-1/2
          z-50

          w-[92%]
          max-w-[520px]

          bg-[#5C0A18]/95
          backdrop-blur-xl

          text-white

          rounded-full

          px-5
          py-4

          shadow-[0_12px_40px_rgba(0,0,0,0.22)]

          border
          border-white/10

          flex
          items-center
          justify-between
          gap-4
        "

      >

        {/* LEFT */}

        <div className="min-w-0 text-left">

          <p className="text-[9px] uppercase tracking-[2px] text-white/50">

            Estimated Total

          </p>

          <div className="flex items-center gap-2 mt-1">

            <p className="text-lg font-bold leading-none truncate">

              ₹

              {

                Math.round(
                  normalizedGrandTotal
                ).toLocaleString("en-IN")

              }

            </p>

          </div>

          <p className="text-[10px] text-white/60 mt-1">

            {totalSelections}
            {" "}
            selected

          </p>

        </div>

        {/* RIGHT */}

        <div
          className="
            shrink-0

            bg-white
            text-[#5C0A18]

            px-4
            py-3

            rounded-full

            text-[11px]
            font-semibold

            uppercase
            tracking-[2px]

            whitespace-nowrap
          "
        >

          View Summary

        </div>

      </button>

      {/* ========================================
          MOBILE FLOATING MENU
      ======================================== */}

      <button

        onClick={() =>
          setShowMobileMenu(true)
        }

        className="
          xl:hidden
          fixed
          bottom-24
          right-5
          z-50

          bg-[#6A0017]
          text-white

          px-5
          py-3

          rounded-full

          shadow-[0_10px_30px_rgba(0,0,0,0.25)]

          border
          border-white/10

          text-sm
          font-semibold
        "

      >

        ☰ Menu

      </button>

      {/* ========================================
          MOBILE MENU SHEET
      ======================================== */}

      {showMobileMenu && (

        <div
          className="
            xl:hidden
            fixed
            inset-0
            z-[60]

            bg-black/50
            backdrop-blur-sm
          "
        >

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0

              bg-white

              rounded-t-[28px]

              p-6

              space-y-4

              shadow-2xl
            "
          >

            {/* TOP */}

            <div className="flex items-center justify-between">

              <div>

                <h3
                  className="
                    text-lg
                    font-bold
                    text-[#6A0017]
                  "
                >

                  Workspace Menu

                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >

                  Jump to any section

                </p>

              </div>

              <button

                onClick={() =>
                  setShowMobileMenu(false)
                }

                className="
                  h-10
                  w-10
                  rounded-full
                  bg-gray-100
                  text-lg
                  font-semibold
                "

              >

                ✕

              </button>

            </div>

            {/* LINKS */}

            <div className="space-y-3 pt-2">

              <button

                onClick={() =>
                  scrollToSection(
                    overviewRef
                  )
                }

                className="
                  w-full
                  text-left
                  px-4
                  py-4
                  rounded-2xl
                  bg-[#F8F4EE]
                  text-[#6A0017]
                  font-semibold
                "

              >

                Package Overview

              </button>

              <button

                onClick={() =>
                  scrollToSection(
                    menuRef
                  )
                }

                className="
                  w-full
                  text-left
                  px-4
                  py-4
                  rounded-2xl
                  bg-[#F8F4EE]
                  text-[#6A0017]
                  font-semibold
                "

              >

                Food Menu

              </button>

              <button

                onClick={() =>
                  scrollToSection(
                    foodRef
                  )
                }

                className="
                  w-full
                  text-left
                  px-4
                  py-4
                  rounded-2xl
                  bg-[#F8F4EE]
                  text-[#6A0017]
                  font-semibold
                "

              >

                Food Addons

              </button>

              <button

                onClick={() =>
                  scrollToSection(
                    serviceRef
                  )
                }

                className="
                  w-full
                  text-left
                  px-4
                  py-4
                  rounded-2xl
                  bg-[#F8F4EE]
                  text-[#6A0017]
                  font-semibold
                "

              >

                Service Addons

              </button>

              <button

                onClick={() =>
                  scrollToSection(
                    comboRef
                  )
                }

                className="
                  w-full
                  text-left
                  px-4
                  py-4
                  rounded-2xl
                  bg-[#F8F4EE]
                  text-[#6A0017]
                  font-semibold
                "

              >

                Combo Experiences

              </button>

            </div>

          </div>

        </div>

      )}

    </BookingContainer>

  );

}