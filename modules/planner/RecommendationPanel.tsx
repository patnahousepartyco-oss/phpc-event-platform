"use client";

import {

  useOnboardingStore,

} from "@/state/onboarding/onboardingStore";

import {

  validateMobile,

} from "@/utils/validateMobile";

import {

  buildEventContext,

} from "@/engines/context-engine/buildEventContext";

import { useState } from "react";

import { useRouter }
from "next/navigation";

import {

  getRecommendationPlan,

} from "@/engines/recommendation-engine/getRecommendationPlan";

import {

  useSetSelectedPackage,

} from "@/state/booking/bookingSelectors";

interface Props {

  canContinue: boolean;

  recommendedPackage: any;

  selectedParty: any;

  guestCount: number;

  selectedBasePlan:
    number | null;

  selectedFoodPreference: string;

  activeBasePlan:
    number;

  activeExtraGuests:
    number;

  setSelectedBasePlan: (
  value: number | null
) => void;

  isUserSelected?: boolean;
}

export default function RecommendationPanel({

  canContinue,

  recommendedPackage,

  selectedParty,

  guestCount,

  selectedBasePlan,

  setSelectedBasePlan,

  selectedFoodPreference,

  activeBasePlan,

  activeExtraGuests,

  isUserSelected,

}: Props) {

  /*
  ========================================
  ROUTER
  ========================================
  */

  const router =
    useRouter();

  /*
  ========================================
  BOOKING STORE
  ========================================
  */

  const setSelectedPackage =
    useSetSelectedPackage();

  /*
  ========================================
  ONBOARDING STORE
  ========================================
  */

  const {

    customerName,

    customerMobile,

    selectedPartyType,

    foodPreference,

    setSelectedPackageId,

    setSelectedBasePlan:
      setOnboardingBasePlan,

    setEventContext,

  } = useOnboardingStore();

  /*
  ========================================
  LOCAL STATE
  ========================================
  */

  const [

    showAlternativeOptions,

    setShowAlternativeOptions,

  ] = useState(false);

  /*
  ========================================
  OPERATIONAL SELECTION
  ========================================
  */

  const [
    selectedOperationalType,
    setSelectedOperationalType,
  ] = useState<
    "recommended" | "alternate"
  >("recommended");

  /*
  ========================================
  RECOMMENDATION ENGINE
  ========================================
  */

  const recommendation =
    getRecommendationPlan(
      guestCount
    );

  /*
  ========================================
  CURRENT ACTIVE PLAN
  ========================================
  */

  const currentBasePlan =
    selectedOperationalType ===
    "alternate"

      ? recommendation
          .alternateBasePlan

      : activeBasePlan;

  const currentExtraGuests =
    selectedOperationalType ===
    "alternate"

      ? recommendation
          .alternateExtraGuests

      : activeExtraGuests;

  /*
  ========================================
  CARD STATES
  ========================================
  */

  const isRecommendedSelected =
    selectedOperationalType ===
    "recommended";

  const isAlternateSelected =
    selectedOperationalType ===
    "alternate";

  /*
  ========================================
  CONTINUE FLOW
  ========================================
  */

  const handleContinue =
    async () => {

      if (!canContinue)
        return;

      /*
======================================
MOBILE VALIDATION
======================================
*/

const mobileValidation =

  validateMobile(
    customerMobile
  );

if (!mobileValidation.valid) {

  alert(
    mobileValidation.reason
  );

  return;
}

      /*
      ======================================
      NORMALIZE PACKAGE
      ======================================
      */

      const normalizedPackage = {

        planId:
          String(
            recommendedPackage?.plan_id || ""
          ),

        packageId:
          String(
            recommendedPackage?.package_id || ""
          ),

        name:

          recommendedPackage?.package_name ||

          recommendedPackage?.name ||

          "Package",

        description:

          recommendedPackage?.description || "",

        basePrice:

          Number(

            recommendedPackage?.selling_price ||

            recommendedPackage?.basePrice ||

            0

          ),

        includedGuests:
          Number(
            currentBasePlan || 0
          ),

        additionalPlateCost:

          Number(

            recommendedPackage?.additional_plate_cost ||

            recommendedPackage?.additionalPlateCost ||

            0

          ),

        recommended:
          true,
      };

      /*
      ======================================
      BOOKING STORE HYDRATION
      ======================================
      */

      setSelectedPackage(
        normalizedPackage
      );

      /*
      ======================================
      ONBOARDING STORE UPDATE
      ======================================
      */

      setSelectedPackageId(

        String(
          recommendedPackage?.package_id || ""
        )

      );

      setSelectedBasePlan(
        currentBasePlan
      );

      setOnboardingBasePlan(
        currentBasePlan
      );

      /*
      ======================================
      BUILD EVENT CONTEXT
      ======================================
      */

      /*
======================================
CREATE LEAD
======================================
*/

const leadResponse =
  await fetch(

    "/api/create-lead",

    {

      method: "POST",

      headers: {

        "Content-Type":
          "application/json",

      },

      body: JSON.stringify({

  /*
  ======================================
  CUSTOMER
  ======================================
  */

  customerName,

  customerMobile,

  /*
  ======================================
  EVENT
  ======================================
  */

  partyType:
    selectedPartyType,

  guestCount,

  foodPreference,

  /*
  ======================================
  PACKAGE
  ======================================
  */

  recommendedPackageId:

    recommendedPackage?.package_id ||

    recommendedPackage?.packageId ||

    "",

  recommendedPackageName:

    recommendedPackage?.package_name ||

    recommendedPackage?.name ||

    "",

  /*
  ======================================
  OPERATIONAL
  ======================================
  */

  selectedBasePlan:
    currentBasePlan,

})

    }

  );

const leadData =
  await leadResponse.json();

/*
======================================
FAILED
======================================
*/

if (!leadData.success) {

  alert(
    "Unable to continue planning right now."
  );

  return;
}

      const runtimeContext =

        buildEventContext({

          /*
          ====================================
          LEAD
          ====================================
          */

         customerName,

customerMobile,

customerId:
  leadData.customer_id,

leadId:
  leadData.lead_id,

          /*
          ====================================
          EVENT
          ====================================
          */

          partyType:
            selectedPartyType,

          guestCount,

          /*
          ====================================
          PREFERENCES
          ====================================
          */

          foodPreference,

          /*
          ====================================
          RECOMMENDATION
          ====================================
          */

          recommendedPackage:

            recommendedPackage,

          /*
          ====================================
          ACTIVE RUNTIME
          ====================================
          */

          selectedPackage:
            normalizedPackage,

          selectedPlan: {

            basePlan:
              currentBasePlan,

            extraGuests:
              currentExtraGuests,

          },

        });

      /*
      ======================================
      SAVE RUNTIME CONTEXT
      ======================================
      */

      setEventContext(
        runtimeContext
      );

      /*
      ======================================
      NAVIGATION
      ======================================
      */

      router.push(

        `/bookings?packageId=${recommendedPackage?.package_id}&guestCount=${guestCount}&basePlan=${
          currentBasePlan
        }&foodPreference=${selectedFoodPreference}`

      );

    };

  /*
  ========================================
  PACKAGE IMAGE
  ========================================
  */

  const imageSrc =

    recommendedPackage?.package_name ===
    "Celebration Pack"

      ?

      "/packages/celebration-pack.jpg"

      :

      recommendedPackage?.package_name ===
      "Family Fiesta"

      ?

      "/packages/family-fiesta.jpg"

      :

      recommendedPackage?.package_name ===
      "Little Stars"

      ?

      "/packages/little-stars.jpg"

      :

      "/packages/chill-and-celebrate.jpg";

  /*
  ========================================
  STORYTELLING CONTENT
  ========================================
  */

  const recommendationStoryMap: any = {

    "Celebration Pack": {

      title:
        "Perfect for intimate celebrations at home.",

      description:

        "Designed for small family celebrations without the hassle of banquet bookings, restaurant chaos or vendor coordination.",

      bullets: [

        "Elegant home setup experience",

        "Curated celebration food",

        "Smooth managed execution",

        "Celebration cake arrangement",

      ],

    },

    "Family Fiesta": {

      title:
        "Perfect for warm family gatherings.",

      description:

        "A balanced celebration experience for families who want a professionally managed setup without the stress of arranging everything themselves.",

      bullets: [

        "Family-friendly food planning",

        "Comfortable gathering setup",

        "Smooth celebration coordination",

        "Ideal for all age groups",

      ],

    },

    "Little Stars": {

      title:
        "Designed for joyful kids celebrations.",

      description:

        "Playful and colorful birthday experiences designed to make kids celebrations exciting, memorable and stress-free for parents.",

      bullets: [

        "Kids-friendly decorations",

        "Fun celebration atmosphere",

        "Safe and organized setup",

        "Memorable birthday moments",

      ],

    },

    "Chill & Celebrate": {

      title:
        "A cozy café-style celebration at home.",

      description:

        "Designed for stylish house parties with curated café-style food, elegant decor, relaxed seating vibes and effortless hosting for your closest people.",

      bullets: [

        "Curated café-inspired food experience",

        "Elegant aesthetic home setup",

        "Relaxed lounge atmosphere",

        "Perfect for intimate gatherings",

      ],

    },

  };

  /*
  ========================================
  ACTIVE STORY
  ========================================
  */

  const activeStory =

    recommendationStoryMap[
      recommendedPackage?.package_name
    ] ||

    recommendationStoryMap[
      "Celebration Pack"
    ];

  return (

    <section className="pb-8">

      <div
        className="
          bg-[#6A0017]
          rounded-[18px]
          overflow-hidden
          border
          border-[#8D1C33]
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        "
      >

        {/* TOP */}

        <div
          className="
            px-4
            md:px-5
            pt-5
            md:pt-6
          "
        >

          <div className="flex items-start justify-between gap-4">

            <div>

              <p
                className="
                  uppercase
                  tracking-[3px]
                  text-[10px]
                  text-yellow-300
                  font-semibold
                "
              >

                {isUserSelected
                  ? "Your Selected Package"
                  : "Recommended For You"}

              </p>

              <h2
                className="
                  text-xl
                  md:text-2xl
                  font-black
                  text-white
                  mt-3
                  leading-tight
                "
              >

                {recommendedPackage?.package_name}

              </h2>

            </div>

            <div
              className="
                shrink-0
                px-4
                py-2
                rounded-full
                bg-white/10
                border
                border-white/10
                text-white
                text-sm
                font-semibold
              "
            >

              {currentBasePlan}
              {" "}
              Pax

            </div>

          </div>

        </div>

        {/* MAIN GRID */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[380px_1fr]
            gap-0
            mt-5
          "
        >

          {/* IMAGE SIDE */}

          <div
            className="
              px-5
              md:px-7
              pb-5
            "
          >

            <div
              className="
                relative
                overflow-hidden
                rounded-[22px]
                h-[260px]
                md:h-[360px]
              "
            >

              <img
                src={imageSrc}
                alt={recommendedPackage?.package_name}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/50
                  via-black/10
                  to-transparent
                "
              />

            </div>

          </div>

          {/* CONTENT SIDE */}

          <div
            className="
              bg-white/[0.06]
              border-t
              lg:border-t-0
              lg:border-l
              border-white/10
              px-5
              md:px-7
              py-5
              md:py-6
            "
          >

            {/* STORY */}

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-white/10
                  border
                  border-white/10
                  text-yellow-300
                  text-xs
                  font-semibold
                "
              >

                Curated Recommendation

              </div>

              <h3
                className="
                  text-xl
                  md:text-2xl
                  font-black
                  text-white
                  leading-tight
                  mt-5
                "
              >

                {activeStory.title}

              </h3>

              <p
                className="
                  text-white/80
                  text-sm
                  md:text-base
                  leading-7
                  mt-5
                "
              >

                {activeStory.description}

              </p>

            </div>

            {/* BULLETS */}

            <div className="space-y-4 mt-5">

              {activeStory.bullets.map((item: string) => (

                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      h-6
                      w-6
                      rounded-full
                      bg-yellow-400
                      text-black
                      flex
                      items-center
                      justify-center
                      text-xs
                      font-bold
                      shrink-0
                    "
                  >

                    ✓

                  </div>

                  <p
                    className="
                      text-white/90
                      text-sm
                    "
                  >

                    {item}

                  </p>

                </div>

              ))}

            </div>

            {/* WHY THIS PACKAGE */}

            <div
              className="
                mt-7
                rounded-[18px]
                bg-black/10
                border
                border-white/10
                p-5
              "
            >

              <p
                className="
                  text-yellow-300
                  text-xs
                  uppercase
                  tracking-[3px]
                  font-semibold
                "
              >

                Why This Package?

              </p>

              <div className="space-y-5 mt-5">

                <div>

                  <p
                    className="
                      text-yellow-300
                      text-[10px]
                      uppercase
                      tracking-[3px]
                      font-semibold
                    "
                  >

                    Experience

                  </p>

                  <p
                    className="
                      text-white
                      text-sm
                      leading-6
                      mt-2
                    "
                  >

                    {recommendedPackage?.tagline}

                  </p>

                </div>

                <div>

                  <p
                    className="
                      text-yellow-300
                      text-[10px]
                      uppercase
                      tracking-[3px]
                      font-semibold
                    "
                  >

                    Includes

                  </p>

                  <p
                    className="
                      text-white/90
                      text-sm
                      leading-6
                      mt-2
                    "
                  >

                    {recommendedPackage?.what_includes}

                  </p>

                </div>

                <div>

                  <p
                    className="
                      text-yellow-300
                      text-[10px]
                      uppercase
                      tracking-[3px]
                      font-semibold
                    "
                  >

                    Guest Planning

                  </p>

                  <p
                    className="
                      text-white/90
                      text-sm
                      leading-6
                      mt-2
                    "
                  >

                    Selected operational plan:
                    {" "}

                    {currentBasePlan}
                    {" "}
                    guests

                    {currentExtraGuests > 0 &&
                      ` + ${currentExtraGuests} additional guests.`}

                  </p>

                </div>

              </div>

            </div>

            {/* PLAN OPTIONS */}

            {recommendation.showAlternate && (

              <div
                className="
                  mt-6
                  rounded-[18px]
                  bg-white/5
                  border
                  border-white/10
                  overflow-hidden
                "
              >

                <button

                  onClick={() =>
                    setShowAlternativeOptions(
                      !showAlternativeOptions
                    )
                  }

                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-5
                    py-4
                    text-left
                  "

                >

                  <div>

                    <p
                      className="
                        text-yellow-300
                        text-[10px]
                        uppercase
                        tracking-[3px]
                        font-semibold
                      "
                    >

                      Plan Options

                    </p>

                    <p
                      className="
                        text-white/60
                        text-xs
                        mt-1
                      "
                    >

                      Switch operational guest plan

                    </p>

                  </div>

                  <span className="text-xl text-white">

                    {showAlternativeOptions
                      ? "−"
                      : "+"}

                  </span>

                </button>

                {showAlternativeOptions && (

                  <div
                    className="
                      border-t
                      border-white/10
                      px-5
                      py-4
                      space-y-4
                    "
                  >

                    {/* RECOMMENDED OPTION */}

                    <div
                      className={`
                        rounded-[16px]
                        border
                        p-4
                        transition-all
                        ${
                          isRecommendedSelected
                            ? "border-yellow-400 bg-yellow-400/10"
                            : "border-white/10 bg-white/5"
                        }
                      `}
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p
                            className="
                              text-yellow-300
                              text-[10px]
                              uppercase
                              tracking-[3px]
                              font-semibold
                            "
                          >

                            Recommended

                          </p>

                          <p
                            className="
                              text-white
                              text-sm
                              font-semibold
                              mt-2
                            "
                          >

                            {activeBasePlan}
                            {" "}
                            Pax

                            {activeExtraGuests > 0 &&
                              ` + ${activeExtraGuests} Guests`}

                          </p>

                        </div>

                        <button

                          onClick={() => {

                            setSelectedOperationalType(
                              "recommended"
                            );

                          }}

                          className={`
                            px-4
                            py-2
                            rounded-full
                            text-xs
                            font-semibold
                            transition-all
                            ${
                              isRecommendedSelected
                                ? "bg-yellow-400 text-black"
                                : "bg-white/10 text-white"
                            }
                          `}

                        >

                          {isRecommendedSelected
                            ? "Selected"
                            : "Select"}

                        </button>

                      </div>

                    </div>

                    {/* ALTERNATE OPTION */}

                    <div
                      className={`
                        rounded-[16px]
                        border
                        p-4
                        transition-all
                        ${
                          isAlternateSelected
                            ? "border-yellow-400 bg-yellow-400/10"
                            : "border-white/10 bg-white/5"
                        }
                      `}
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p
                            className="
                              text-yellow-300
                              text-[10px]
                              uppercase
                              tracking-[3px]
                              font-semibold
                            "
                          >

                            Alternative

                          </p>

                          <p
                            className="
                              text-white
                              text-sm
                              font-semibold
                              mt-2
                            "
                          >

                            {
                              recommendation
                                .alternateBasePlan
                            }
                            {" "}
                            Pax

                            {recommendation
                              .alternateExtraGuests > 0 &&
                              ` + ${recommendation.alternateExtraGuests} Guests`}

                          </p>

                        </div>

                        <button

                          onClick={() => {

                            setSelectedOperationalType(
                              "alternate"
                            );

                          }}

                          className={`
                            px-4
                            py-2
                            rounded-full
                            text-xs
                            font-semibold
                            transition-all
                            ${
                              isAlternateSelected
                                ? "bg-yellow-400 text-black"
                                : "bg-white/10 text-white"
                            }
                          `}

                        >

                          {isAlternateSelected
                            ? "Selected"
                            : "Select"}

                        </button>

                      </div>

                    </div>

                  </div>

                )}

              </div>

            )}

            {/* CTA */}

            <button

              onClick={handleContinue}

              disabled={!canContinue}

              className={`

                w-full
                rounded-full
                py-3
                text-sm
                font-semibold
                transition-all
                mt-7

                ${

                  canContinue

                    ?

                    "bg-yellow-400 text-black hover:scale-[1.01]"

                    :

                    "bg-gray-300 text-gray-500 cursor-not-allowed"

                }

              `}

            >

              Continue Planning

            </button>

          </div>

        </div>

      </div>

    </section>

  );

}