"use client";

import {
  useMemo,
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

/*
========================================
ONBOARDING STORE
========================================
*/

import {

  useOnboardingStore,

} from "@/state/onboarding/onboardingStore";

/*
========================================
BOOKING STORE
========================================
*/

import {

  useBookingStore,

} from "@/state/booking/bookingStore";

/*
========================================
PRICING SUMMARY
========================================
*/

import PricingSummary
from "@/modules/bookings/summary/PricingSummary";

/*
========================================
LAYOUT
========================================
*/

import LuxurySection
from "@/components/ui/layout/LuxurySection";

import {

  SectionTitle,

  BodyText,

} from "@/components/ui/typography/Typography";

/*
========================================
FORMATTER
========================================
*/

function formatPrice(
  value: number
) {

  return Math.round(

    Number(value || 0)

  ).toLocaleString(
    "en-IN"
  );
}

/*
========================================
COMPONENT
========================================
*/

export default function BookingSummaryPage() {

  /*
  ========================================
  ROUTER
  ========================================
  */

  const router =
    useRouter();

  /*
  ========================================
  STORE
  ========================================
  */

  const {

    selectedPackage,

    addons,

    guestCount,

    pricing,

  } = useBookingStore();

  /*
  ========================================
  EVENT CONTEXT
  ========================================
  */

  const {

    eventContext,

  } = useOnboardingStore();

  /*
  ========================================
  EMPTY STATE
  ========================================
  */

  const hasBooking =

    selectedPackage &&
    guestCount > 0;

  /*
  ========================================
  UPDATE LEAD STAGE
  ========================================
  */

  useEffect(() => {

    async function updateStage() {

      try {

        const leadId =

          eventContext?.lead?.lead_id;

        if (!leadId) {

          return;
        }

        await fetch(

          "/api/update-lead-stage",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              leadId,

              leadStage:
                "summary_viewed",

            }),

          }

        );

      } catch (error) {

        console.error(

          "Lead stage update failed:",

          error

        );
      }
    }

    updateStage();

  }, [eventContext]);

  /*
  ========================================
  FOOD ADDONS
  ========================================
  */

  const selectedFoodAddons =
    useMemo(() => {

      return addons.filter(

        (addon: any) =>

          addon.category ===
          "food"

      );

    }, [addons]);

  /*
  ========================================
  COMBO ADDONS
  ========================================
  */

  const selectedComboAddons =
    useMemo(() => {

      return addons.filter(

        (addon: any) =>

          addon.category ===
          "combo"

      );

    }, [addons]);

  /*
  ========================================
  SERVICE ADDONS
  ========================================
  */

  const selectedServiceAddons =
    useMemo(() => {

      return addons.filter(

        (addon: any) =>

          addon.category ===
          "service"

      );

    }, [addons]);

  /*
  ========================================
  EMPTY STATE UI
  ========================================
  */

  if (!hasBooking) {

    return (

      <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center px-6">

        <div className="max-w-xl text-center">

          <SectionTitle>

            No Active Booking Found

          </SectionTitle>

          <BodyText className="mt-4 text-[#6B7280]">

            Your celebration summary will appear here once you begin planning your experience.

          </BodyText>

          <button

            onClick={() => {

              router.push("/");
            }}

            className="
              mt-8
              bg-[#7A0019]
              text-white
              px-8
              py-4
              rounded-full
              font-semibold
              tracking-[2px]
              uppercase
              text-sm
            "

          >

            Start Planning

          </button>

        </div>

      </div>

    );
  }

  /*
  ========================================
  RENDER
  ========================================
  */

  return (

    <div className="min-h-screen bg-[#F8F4EE]">

      {/* =====================================
          HEADER
      ===================================== */}

      <LuxurySection className="pb-0">

        <div className="flex items-center justify-between gap-6 flex-wrap">

          <div>

            <p className="uppercase tracking-[4px] text-[#A67C52] text-xs font-semibold">

              Booking Review

            </p>

            <SectionTitle className="mt-4">

              Your Celebration Summary

            </SectionTitle>

          </div>

          <button

            onClick={() => {

              router.back();
            }}

            className="
              border
              border-[#D7B98C]
              text-[#7A0019]
              px-6
              py-3
              rounded-full
              text-sm
              font-semibold
              tracking-[2px]
              uppercase
              bg-white
            "

          >

            Back To Workspace

          </button>

        </div>

      </LuxurySection>

      {/* =====================================
          SUMMARY
      ===================================== */}

      <div className="max-w-5xl mx-auto px-4 pb-40">

        <PricingSummary

          guestCount={
            guestCount
          }

          selectedPackage={
            selectedPackage
          }

          pricing={
            pricing
          }

          addons={
            addons
          }

        />

      </div>

      {/* =====================================
          BOTTOM CTA BAR
      ===================================== */}

      <div

        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50

          bg-white/95

          backdrop-blur-xl

          border-t
          border-[#E7D7C6]

          px-4
          py-4
        "

      >

        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">

          {/* TOTAL */}

          <div>

            <p className="text-xs uppercase tracking-[3px] text-[#A67C52] font-semibold">

              Estimated Total

            </p>

            <p className="text-2xl font-bold text-[#7A0019] mt-1">

              ₹

              {

                formatPrice(

                  pricing?.grandTotal || 0

                )

              }

            </p>

          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-3 flex-wrap">

            <button

              className="
                border
                border-[#D7B98C]

                bg-white

                text-[#7A0019]

                px-6
                py-4

                rounded-full

                text-sm
                font-semibold

                tracking-[2px]
                uppercase
              "

            >

              Save Plan

            </button>

            <button

              className="
                bg-[#7A0019]

                text-white

                px-8
                py-4

                rounded-full

                text-sm
                font-semibold

                tracking-[2px]
                uppercase
              "

            >

              Request Callback

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}