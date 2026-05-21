import { create } from "zustand";

interface OnboardingState {

  customerName: string;

  customerMobile: string;

  selectedPartyType: string;

  guestCount: number;

  foodPreference: string;

  eventLocation: string;

  selectedPackageId: string;

  selectedBasePlan: number | null;

  eventContext: any;

  setCustomerName: (
    value: string
  ) => void;

  setCustomerMobile: (
    value: string
  ) => void;

  setSelectedPartyType: (
    value: string
  ) => void;

  setGuestCount: (
    value: number
  ) => void;

  setFoodPreference: (
    value: string
  ) => void;

  setEventLocation: (
    value: string
  ) => void;

  setSelectedPackageId: (
    value: string
  ) => void;

  setSelectedBasePlan: (
    value: number | null
  ) => void;

  setEventContext: (
    value: any
  ) => void;

  resetOnboarding: () => void;
}

export const useOnboardingStore =

  create<OnboardingState>(

    (set) => ({

      /* =========================================
         DEFAULT STATE
      ========================================= */

      customerName: "",

      customerMobile: "",

      selectedPartyType: "",

      guestCount: 10,

      foodPreference: "Veg",

      eventLocation: "",

      selectedPackageId: "",

      selectedBasePlan: null,

      eventContext: null,

      /* =========================================
         ACTIONS
      ========================================= */

      setCustomerName:

        (value) =>

          set({

            customerName: value,

          }),

      setCustomerMobile:

        (value) =>

          set({

            customerMobile: value,

          }),

      setSelectedPartyType:

        (value) =>

          set({

            selectedPartyType: value,

          }),

      setGuestCount:

        (value) =>

          set({

            guestCount: value,

          }),

      setFoodPreference:

        (value) =>

          set({

            foodPreference: value,

          }),

      setEventLocation:

        (value) =>

          set({

            eventLocation: value,

          }),

      setSelectedPackageId:

        (value) =>

          set({

            selectedPackageId: value,

          }),

      setSelectedBasePlan:

        (value) =>

          set({

            selectedBasePlan: value,

          }),

      setEventContext:

        (value) =>

          set({

            eventContext: value,

          }),

      /* =========================================
         RESET
      ========================================= */

      resetOnboarding:

        () =>

          set({

            customerName: "",

            customerMobile: "",

            selectedPartyType: "",

            guestCount: 10,

            foodPreference: "Veg",

            eventLocation: "",

            selectedPackageId: "",

            selectedBasePlan: null,

            eventContext: null,

          }),

    })

  );