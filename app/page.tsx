"use client";

import { useEffect, useState } from "react";

import HomeHeader from "@/modules/home/layout/HomeHeader";

import HeroSection from "@/modules/home/sections/HeroSection";

import RecommendationStoryPanel from "@/modules/home/sections/RecommendationStoryPanel";

import RecommendationPanel from "@/modules/planner/RecommendationPanel";

import PackageCarousel from "@/modules/planner/PackageCarousel";

import {
  fetchPackages,
  fetchPartyTypes,
  fetchPlans,
} from "@/services/api";

import {
  getRecommendationPlan,
} from "@/engines/recommendation-engine/getRecommendationPlan";

import {
  buildEventContext,
} from "@/engines/context-engine/buildEventContext";

import {
  useOnboardingStore,
} from "@/state/onboarding/onboardingStore";

export default function Home() {

  /* =================================================
     API DATA
  ================================================= */

  const [packages, setPackages] =
    useState<any[]>([]);

  const [plans, setPlans] =
    useState<any[]>([]);

  const [partyTypes, setPartyTypes] =
    useState<any[]>([]);

  /* =================================================
     STORE
  ================================================= */

  const {

    customerName,
    setCustomerName,

    customerMobile,
    setCustomerMobile,

    selectedPartyType,
    setSelectedPartyType,

    guestCount,
    setGuestCount,

    foodPreference,
    setFoodPreference,

    eventLocation,
    setEventLocation,

    selectedPackageId,
    setSelectedPackageId,

    selectedBasePlan,
    setSelectedBasePlan,

    setEventContext,

  } = useOnboardingStore();

  /* =================================================
     LOAD DATA
  ================================================= */

  useEffect(() => {

    async function loadData() {

      try {

        const [
          packageData,
          plansData,
          partyTypeData,
        ] = await Promise.all([

          fetchPackages(),
          fetchPlans(),
          fetchPartyTypes(),

        ]);

        setPackages(
          Array.isArray(packageData)
            ? packageData
            : []
        );

        setPlans(
          Array.isArray(plansData)
            ? plansData
            : []
        );

        setPartyTypes(
          Array.isArray(partyTypeData)
            ? partyTypeData
            : []
        );

      } catch (error) {

        console.error(
          "DATA LOAD ERROR:",
          error
        );

      }

    }

    loadData();

  }, []);

  /* =================================================
     RESET PLAN ON GUEST CHANGE
  ================================================= */

  useEffect(() => {

    setSelectedBasePlan(null);

  }, [guestCount]);

  /* =================================================
     PARTY TYPE
  ================================================= */

  const selectedParty =

    partyTypes.find(

      (party) =>

        party.party_type ===
        selectedPartyType

    );

  /* =================================================
     AUTO RECOMMENDED PACKAGE
  ================================================= */

  const autoRecommendedPackage =

    packages.find(

      (pkg) =>

        pkg.package_name ===
        selectedParty?.recommended_package

    );

  /* =================================================
     ACTIVE PACKAGE
  ================================================= */

  const activePackage =

    selectedPackageId

      ?

      packages.find(

        (pkg) =>

          pkg.package_id ===
          selectedPackageId

      )

      :

      autoRecommendedPackage;

  /* =================================================
     RECOMMENDATION ENGINE
  ================================================= */

  const recommendation =

    getRecommendationPlan(
      guestCount
    );

  const activeBasePlan =

    selectedBasePlan ||

    recommendation.recommendedBasePlan;

  const activeExtraGuests =

    guestCount > activeBasePlan

      ?

      guestCount -
      activeBasePlan

      :

      0;

  /* =================================================
     VALIDATION
  ================================================= */

  const canContinue =

    customerName.trim().length > 1 &&

    customerMobile.trim().length === 10 &&

    selectedPartyType.trim().length > 0 &&

    guestCount > 0 &&

    foodPreference.trim().length > 0 &&

    eventLocation.trim().length > 2;

  /* =================================================
     BUILD EVENT CONTEXT
  ================================================= */

  useEffect(() => {

    if (!activePackage)
      return;

    const context =

      buildEventContext({

        customerName,

        customerMobile,

        partyType:
          selectedPartyType,

        guestCount,

        foodPreference,

        eventLocation,

        recommendedPackage:
          activePackage,

      });

    setEventContext(
      context
    );

  }, [

    customerName,
    customerMobile,
    selectedPartyType,
    guestCount,
    foodPreference,
    eventLocation,
    activePackage,
    setEventContext,

  ]);

  return (

    <main className="min-h-screen bg-[#F8F4EE]">

      {/* =================================================
         HEADER
      ================================================= */}

      <HomeHeader />

      {/* =================================================
         HERO
      ================================================= */}

      <HeroSection

        leftContent={

          <div className="max-w-[520px]">

            {/* TAGLINE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                border
                border-[#D4B483]
                bg-white
                text-[#7A1022]
                text-[11px]
                font-semibold
                shadow-sm
              "
            >

              <span>✨</span>

              <span>
                Easiest way to host great house party
              </span>

            </div>

            {/* HEADLINE */}

            <h1
              className="
                mt-4
                text-[34px]
                md:text-[42px]
                leading-[1.05]
                font-bold
                tracking-tight
                text-[#5C0A18]
              "
            >

              From food to setup,
              everything managed
              so you can just celebrate
              at home.

            </h1>

            {/* SUPPORT */}

            <p
              className="
                mt-4
                text-[15px]
                leading-7
                text-[#5B6475]
                max-w-[480px]
              "
            >

              Professionally managed home celebration
              experiences for birthdays, family gatherings
              and house parties starting from just 10 guests.

            </p>

            {/* TRUST CHIPS */}

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-2
              "
            >

              {[
                "Curated Packages",
                "Managed Setup",
                "Transparent Pricing",
                "Starting From 10 Guests",
              ].map((item) => (

                <div
                  key={item}
                  className="
                    px-3
                    py-1.5
                    rounded-full
                    bg-white
                    border
                    border-[#E7D6BE]
                    text-[#5C0A18]
                    text-[11px]
                    font-semibold
                    shadow-sm
                  "
                >

                  {item}

                </div>

              ))}

            </div>

            

          </div>

        }

        rightContent={

          <div className="space-y-3">

            {/* =================================================
               PLANNER CARD
            ================================================= */}

            <div
              className="
                bg-white
                rounded-[22px]
                border
                border-[#E7D6BE]
                p-4
                md:p-5
                shadow-sm
              "
            >

              {/* TOP */}

              <div className="flex items-start justify-between gap-4 flex-wrap">

                <div>

                  <h2
                    className="
                      text-[28px]
                      md:text-[34px]
                      font-bold
                      leading-tight
                      text-[#5C0A18]
                    "
                  >

                    Plan Your Celebration

                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-[#5B6475]
                    "
                  >

                    Get your curated recommendation instantly.

                  </p>

                </div>

                {/* FOOD TOGGLE */}

                <div
                  className="
                    flex
                    items-center
                    bg-[#F6EFE5]
                    border
                    border-[#E7D6BE]
                    rounded-full
                    p-1
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      setFoodPreference("Veg")
                    }
                    className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
                      foodPreference === "Veg"
                        ? "bg-green-600 text-white shadow-sm"
                        : "text-[#5C0A18]"
                    }`}
                  >

                    Veg

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFoodPreference("Non-Veg")
                    }
                    className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
                      foodPreference === "Non-Veg"
                        ? "bg-red-600 text-white shadow-sm"
                        : "text-[#5C0A18]"
                    }`}
                  >

                    Non-Veg

                  </button>

                </div>

              </div>

              {/* FORM */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                  mt-5
                "
              >

                {/* NAME */}

                <div>

                  <label
                    className="
                      block
                      mb-2
                      text-sm
                      font-semibold
                      text-[#5C0A18]
                    "
                  >

                    Your Name

                  </label>

                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) =>
                      setCustomerName(
                        e.target.value
                      )
                    }
                    placeholder="Enter your name"
                    className="
                      w-full
                      h-11
                      rounded-[14px]
                      border
                      border-[#D7BE97]
                      px-4
                      text-[14px]
                      font-medium
                      text-[#5C0A18]
                      placeholder:text-[#A8A29E]
                      bg-white
                      outline-none
                      transition-all
                      focus:border-[#7A1022]
                      focus:ring-2
                      focus:ring-[#7A1022]/10
                    "
                  />

                </div>

                {/* MOBILE */}

                <div>

                  <label
                    className="
                      block
                      mb-2
                      text-sm
                      font-semibold
                      text-[#5C0A18]
                    "
                  >

                    Mobile Number

                  </label>

                  <input
                    type="tel"
                    value={customerMobile}
                    onChange={(e) =>
                      setCustomerMobile(
                        e.target.value
                      )
                    }
                    placeholder="Enter mobile number"
                    className="
                      w-full
                      h-11
                      rounded-[14px]
                      border
                      border-[#D7BE97]
                      px-4
                      text-[14px]
                      font-medium
                      text-[#5C0A18]
                      placeholder:text-[#A8A29E]
                      bg-white
                      outline-none
                      transition-all
                      focus:border-[#7A1022]
                      focus:ring-2
                      focus:ring-[#7A1022]/10
                    "
                  />

                </div>

                {/* PARTY TYPE */}

                <div>

                  <label
                    className="
                      block
                      mb-2
                      text-sm
                      font-semibold
                      text-[#5C0A18]
                    "
                  >

                    Party Type

                  </label>

                  <select
                    value={selectedPartyType}
                    onChange={(e) =>
                      setSelectedPartyType(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      h-11
                      rounded-[14px]
                      border
                      border-[#D7BE97]
                      px-4
                      text-[14px]
                      font-medium
                      text-[#5C0A18]
                      bg-white
                      appearance-none
                      outline-none
                      transition-all
                      focus:border-[#7A1022]
                      focus:ring-2
                      focus:ring-[#7A1022]/10
                    "
                  >

                    <option value="">
                      Select Party Type
                    </option>

                    {partyTypes.map((party) => (

                      <option
                        key={party.party_type}
                        value={party.party_type}
                      >

                        {party.party_type}

                      </option>

                    ))}

                  </select>

                </div>

                {/* GUEST COUNT */}

                <div>

                  <label
                    className="
                      block
                      mb-2
                      text-sm
                      font-semibold
                      text-[#5C0A18]
                    "
                  >

                    Number of Guests

                  </label>

                  <input
                    type="number"
                    value={guestCount}
                    onChange={(e) =>
                      setGuestCount(
                        Number(e.target.value)
                      )
                    }
                    className="
                      w-full
                      h-11
                      rounded-[14px]
                      border
                      border-[#D7BE97]
                      px-4
                      text-[14px]
                      font-medium
                      text-[#5C0A18]
                      bg-white
                      outline-none
                      transition-all
                      focus:border-[#7A1022]
                      focus:ring-2
                      focus:ring-[#7A1022]/10
                    "
                  />

                </div>

                {/* LOCATION */}

                <div className="md:col-span-2">

                  <label
                    className="
                      block
                      mb-2
                      text-sm
                      font-semibold
                      text-[#5C0A18]
                    "
                  >

                    Event Location

                  </label>

                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) =>
                      setEventLocation(
                        e.target.value
                      )
                    }
                    placeholder="Enter locality or area"
                    className="
                      w-full
                      h-11
                      rounded-[14px]
                      border
                      border-[#D7BE97]
                      px-4
                      text-[14px]
                      font-medium
                      text-[#5C0A18]
                      placeholder:text-[#A8A29E]
                      bg-white
                      outline-none
                      transition-all
                      focus:border-[#7A1022]
                      focus:ring-2
                      focus:ring-[#7A1022]/10
                    "
                  />

                </div>

              </div>

            </div>

            {/* =================================================
               RECOMMENDATION PANEL
            ================================================= */}

            

            {/* MOBILE STORY PANEL */}



          </div>

        }

      />

      {/* =================================================
   FULL WIDTH RECOMMENDATION WORKSPACE
================================================= */}

{activePackage && (

  <section className="pb-8">

    <div className="max-w-[1180px] mx-auto px-4 md:px-6">

      <RecommendationPanel

        canContinue={
          Boolean(
            customerName &&
            customerMobile &&
            selectedPartyType &&
            guestCount &&
            eventLocation
          )
        }

        recommendedPackage={
          activePackage
        }

        selectedParty={
          selectedPartyType
        }

        guestCount={
          guestCount
        }

        selectedBasePlan={
          selectedBasePlan
        }

        selectedFoodPreference={
          foodPreference
        }

        activeBasePlan={
          activeBasePlan
        }

        activeExtraGuests={
          activeExtraGuests
        }

        setSelectedBasePlan={
  (value) =>
    setSelectedBasePlan(value)
}

        isUserSelected={
  Boolean(selectedPackageId)
}

      />

    </div>

  </section>

)}

      {/* =================================================
         PACKAGE SECTION
      ================================================= */}

      <section className="pb-12">

        <div className="max-w-[1180px] mx-auto px-4 md:px-6">

          <div
            className="
              bg-white
              rounded-[22px]
              border
              border-[#E7D6BE]
              p-4
              md:p-5
            "
          >

            <div className="mb-7">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  rounded-full
                  border
                  border-[#D4B483]
                  bg-[#FFF8EE]
                  text-[#7A1022]
                  text-[11px]
                  font-semibold
                "
              >

                Curated Celebration Experiences

              </div>

              <h2
                className="
                  text-[28px]
                  md:text-[36px]
                  font-bold
                  text-[#5C0A18]
                  mt-4
                  leading-tight
                "
              >

                Professionally managed home celebrations
                for every gathering.

              </h2>

              <p
                className="
                  text-[#6B7280]
                  mt-3
                  text-sm
                  md:text-[15px]
                  leading-6
                  max-w-2xl
                "
              >

                Explore curated party experiences designed
                for birthdays, family gatherings and
                house celebrations starting from just
                10 guests.

              </p>

            </div>

            <PackageCarousel

              packages={
                packages
              }

              plans={
                plans
              }

              foodPreference={
                foodPreference
              }

              selectedPackageId={
                selectedPackageId
              }

              recommendedPackage={
                autoRecommendedPackage
              }

              onSelectPackage={
                setSelectedPackageId
              }

            />

          </div>

        </div>

      </section>

    </main>

  );

}