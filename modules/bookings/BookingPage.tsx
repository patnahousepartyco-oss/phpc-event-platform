"use client";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

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
API
========================================
*/

import {

  fetchMasterData,

} from "@/services/api";

/*
========================================
BOOKING STORE
========================================
*/

import {

  useSetSelectedPackage,

  useUpdateGuestCount,

  useSetFoodPreference,

  useCalculateTotals,

} from "@/state/booking/bookingSelectors";

/*
========================================
BOOKING STORE STATE
========================================
*/

import {

  useBookingStore,

} from "@/state/booking/bookingStore";

/*
========================================
WORKSPACE
========================================
*/

import BookingWorkspace
  from "./BookingWorkspace";

/*
========================================
COMPONENT
========================================
*/

export default function BookingPage() {

  /*
  ========================================
  ROUTER
  ========================================
  */

  const router =
    useRouter();

  /*
  ========================================
  URL PARAMS
  ========================================
  */

  const searchParams =
    useSearchParams();

  const packageId =
    searchParams.get(
      "packageId"
    );

  const guestCount =
    Number(

      searchParams.get(
        "guestCount"
      ) || 0

    );

  const basePlan =
    Number(

      searchParams.get(
        "basePlan"
      ) || 0

    );

  const foodPreference =

    searchParams.get(
      "foodPreference"
    ) || "Veg";

  /*
  ========================================
  ONBOARDING STORE
  ========================================
  */

  const {

    eventContext,

  } = useOnboardingStore();

  /*
  ========================================
  BOOKING STORE
  ========================================
  */

  const {

    selectedPackage:
      persistedPackage,

  } = useBookingStore();

  /*
  ========================================
  PROTECT ROUTE
  ========================================
  */

  useEffect(() => {

    if (!eventContext) {

      router.push("/");

    }

  }, [

    eventContext,

    router,

  ]);

  /*
  ========================================
  STORE ACTIONS
  ========================================
  */

  const setSelectedPackage =
    useSetSelectedPackage();

  const updateGuestCount =
    useUpdateGuestCount();

  const setFoodPreference =
    useSetFoodPreference();

  const calculateTotals =
    useCalculateTotals();

  /*
  ========================================
  MASTER DATA
  ========================================
  */

  const [

    packages,

    setPackages

  ] = useState<any[]>([]);

  const [

    plans,

    setPlans

  ] = useState<any[]>([]);

  const [

    menuItems,

    setMenuItems

  ] = useState<any[]>([]);

  const [

    foodAddons,

    setFoodAddons

  ] = useState<any[]>([]);

  const [

    addonMappings,

    setAddonMappings

  ] = useState<any[]>([]);

  const [

    serviceAddons,

    setServiceAddons

  ] = useState<any[]>([]);

  const [

    combos,

    setCombos

  ] = useState<any[]>([]);

  /*
  ========================================
  ACTIVE PACKAGE
  ========================================
  */

  const [

    selectedPackage,

    setSelectedPackageState

  ] = useState<any>(null);

  /*
  ========================================
  MENU STATE
  ========================================
  */

  const [

    selectedMenuItems,

    setSelectedMenuItems

  ] = useState<any>({});

  /*
  ========================================
  LOADING
  ========================================
  */

  const [

    isLoading,

    setIsLoading

  ] = useState(true);

  /*
  ========================================
  LOAD MASTER DATA
  ========================================
  */

  useEffect(() => {

    async function loadData() {

      try {

        /*
        ====================================
        START LOADING
        ====================================
        */

        setIsLoading(true);

        /*
        ====================================
        MASTER FETCH
        ====================================
        */

        const masterData =
          await fetchMasterData();

        /*
        ====================================
        EXTRACT DATASETS
        ====================================
        */

        const packagesData =
          masterData?.packages || [];

        const plansData =
          masterData?.plans || [];

        const menuData =
          masterData?.packageMenu || [];

        const foodAddonData =
          masterData?.foodAddons || [];

        const addonMappingData =
          masterData?.addonMappings || [];

        const serviceAddonData =
          masterData?.serviceAddons || [];

        const comboData =
          masterData?.combos || [];

        /*
        ====================================
        STORE RAW DATA
        ====================================
        */

        setPackages(
          packagesData
        );

        setPlans(
          plansData
        );

        setMenuItems(
          menuData
        );

        setFoodAddons(
          foodAddonData
        );

        setAddonMappings(
          addonMappingData
        );

        setServiceAddons(
          serviceAddonData
        );

        setCombos(
          comboData
        );

        /*
        ====================================
        SESSION CONTINUITY
        ====================================

        DO NOT REINITIALIZE IF:

        - Same package
        - Same persisted session
        - User navigated back

        ====================================
        */

        const isSameSession =

          persistedPackage &&

          String(
            persistedPackage?.packageId
          )

          ===

          String(packageId);

        /*
        ====================================
        REUSE SESSION
        ====================================
        */

       if (isSameSession) {

  /*
  ==================================
  REUSE PERSISTED PACKAGE
  ==================================
  */

  setSelectedPackageState(
    persistedPackage
  );

  /*
  ==================================
  RESTORE RUNTIME
  ==================================
  */

  updateGuestCount(
    guestCount
  );

  setFoodPreference(
    foodPreference
  );

  /*
  ==================================
  RECALCULATE
  ==================================
  */

  setTimeout(() => {

    calculateTotals();

  }, 0);

}

        /*
        ====================================
        MATCH PACKAGE
        ====================================
        */

        const matchedPackage =

          packagesData.find(

            (pkg: any) =>

              String(
                pkg.package_id
              )

              ===

              String(
                packageId
              )

          );

        /*
        ====================================
        INITIALIZE STORE
        ====================================
        */

        if (matchedPackage) {

          /*
          ==================================
          MATCH PLAN
          ==================================
          */

          const matchedPlan =

            plansData.find(

              (plan: any) =>

                String(
                  plan.package_id
                )

                ===

                String(
                  packageId
                )

                &&

                Number(
                  plan.included_pax
                )

                ===

                Number(
                  basePlan
                )

                &&

                String(
                  plan.food_type
                ).toLowerCase()

                ===

                String(
                  foodPreference
                ).toLowerCase()

            );

          /*
          ==================================
          FALLBACK PLAN
          ==================================
          */

          const fallbackPlan =

            plansData.find(

              (plan: any) =>

                String(
                  plan.package_id
                )

                ===

                String(
                  packageId
                )

            );

          /*
          ==================================
          FINAL PLAN
          ==================================
          */

          const finalPlan =

            matchedPlan ||

            fallbackPlan;

          /*
          ==================================
          PACKAGE OBJECT
          ==================================
          */

          const packageObject = {

            ...matchedPackage,

            planId:

              finalPlan?.plan_id ||

              "",

            packageId:

              matchedPackage?.package_id ||

              "",

            name:

              matchedPackage.package_name ||

              matchedPackage.name ||

              "",

            description:

              matchedPackage.description ||

              "",

            includedGuests:
              Number(
                basePlan
              ),

            basePrice:

              Number(

                finalPlan?.selling_price ||

                0

              ),

            additionalPlateCost:

              Number(

                finalPlan?.extra_plate_price ||

                0

              ),

            foodType:

              finalPlan?.food_type ||

              foodPreference,

          };

          /*
          ==================================
          STORE
          ==================================
          */

          setSelectedPackage(
            packageObject
          );

          setSelectedPackageState(
            packageObject
          );
        }

        /*
        ====================================
        GUESTS
        ====================================
        */

        updateGuestCount(
          guestCount
        );

        /*
        ====================================
        FOOD PREF
        ====================================
        */

        setFoodPreference(
          foodPreference
        );

        /*
        ====================================
        RECALCULATE
        ====================================
        */

        setTimeout(() => {

          calculateTotals();

        }, 0);

      } catch (error) {

        console.error(

          "Booking page load error:",

          error

        );

      } finally {

        /*
        ====================================
        COMPLETE LOADING
        ====================================
        */

        setIsLoading(false);
      }
    }

    /*
    ======================================
    ONLY LOAD IF CONTEXT EXISTS
    ======================================
    */

    if (eventContext) {

      loadData();

    }

  }, [

    packageId,

    guestCount,

    basePlan,

    foodPreference,

    eventContext,

    setSelectedPackage,

    updateGuestCount,

    setFoodPreference,

    calculateTotals,

  ]);

  /*
  ========================================
  PACKAGE MENU
  ========================================
  */

  const selectedPackageMenu =
    useMemo(() => {

      return menuItems.filter(

        (item: any) =>

          String(
            item.package_id
          )

          ===

          String(
            packageId
          )

      );

    }, [

      menuItems,

      packageId,

    ]);

  /*
  ========================================
  OPERATIONAL CONTEXT
  ========================================
  */

  const operationalContext =
    useMemo(() => ({

      guestCount,

      activeBasePlan:
        basePlan,

      activeExtraGuests:

        guestCount > basePlan

          ?

          guestCount - basePlan

          :

          0,

      finalOperationalPax:
        guestCount,

      foodPreference,

    }), [

      guestCount,

      basePlan,

      foodPreference,

    ]);

  /*
  ========================================
  HYDRATED RUNTIME CONTEXT
  ========================================
  */

  const runtimeContext =
    useMemo(() => {

      if (!eventContext)
        return null;

      return {

        ...eventContext,

        /*
        ==================================
        RAW DATASETS
        ==================================
        */

        packages,

        plans,

        foodAddons,

        addonMappings,

        serviceAddons,

        combos,

        /*
        ==================================
        ACTIVE RUNTIME
        ==================================
        */

        selectedPackage,

        selectedPlan: {

          basePlan,

          extraGuests:

            guestCount > basePlan

              ?

              guestCount - basePlan

              :

              0,

        },

      };

    }, [

      eventContext,

      packages,

      plans,

      foodAddons,

      addonMappings,

      serviceAddons,

      combos,

      selectedPackage,

      basePlan,

      guestCount,

    ]);

  /*
  ========================================
  LOADING STATE
  ========================================
  */

  if (

    !eventContext ||

    isLoading

  ) {

    return (

      <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-[#7A0019] border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-6 text-[#7A0019] font-semibold tracking-[3px] uppercase text-sm">

            Preparing Your Party

          </p>

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

    <BookingWorkspace

      packageMenu={
        selectedPackageMenu
      }

      selectedMenuItems={
        selectedMenuItems
      }

      setSelectedMenuItems={
        setSelectedMenuItems
      }

      foodAddons={
        foodAddons
      }

      addonMappings={
        addonMappings
      }

      serviceAddons={
        serviceAddons
      }

      combos={
        combos
      }

      operationalContext={
        operationalContext
      }

      runtimeContext={
        runtimeContext
      }

    />

  );
}