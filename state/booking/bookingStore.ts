"use client";

/*
========================================
ZUSTAND
========================================
*/

import { create } from "zustand";

import { persist } from "zustand/middleware";

/*
========================================
TYPES
========================================
*/

import {
  BookingState,
} from "./bookingTypes";

/*
========================================
PRICING ENGINE
========================================
*/

import {
  calculateBookingTotals,
} from "@/engines/pricing-engine/calculateBookingTotals";

/*
========================================
STORE
========================================
*/

export const useBookingStore =

  create<BookingState>()(

    persist(

      (set) => ({

        /*
        ========================================
        INITIAL STATE
        ========================================
        */

        selectedPackage: null,

        addons: [],

        guestCount: 0,

        foodPreference: "veg",

        eventDate: undefined,

        eventTime: undefined,

        venue: undefined,

        pricing: {

          baseAmount: 0,

          foodAmount: 0,

          comboAmount: 0,

          serviceAmount: 0,

          extraGuestAmount: 0,

          subtotal: 0,

          taxAmount: 0,

          grandTotal: 0,

        },

        /*
        ========================================
        SET PACKAGE
        ========================================
        */

        setSelectedPackage: (pkg: any) =>

          set((state) => {

          const normalizedPackage = {

  ...pkg,

  planId:
    pkg?.planId ||
    pkg?.plan_id ||
    "",

  packageId:
    pkg?.packageId ||
    pkg?.package_id ||
    "",

  name:
    pkg?.name ||
    pkg?.package_name ||
    "Package",

  description:
    pkg?.description ||
    pkg?.package_description ||
    "",

  basePrice:
    Number(
      pkg?.basePrice ||
      pkg?.selling_price ||
      pkg?.base_price ||
      pkg?.package_price ||
      0
    ),

  includedGuests:
    Number(
      pkg?.includedGuests ||
      pkg?.included_guests ||
      0
    ),

  additionalPlateCost:
    Number(
      pkg?.additionalPlateCost ||
      pkg?.additional_plate_cost ||
      pkg?.extra_plate_price ||
      0
    ),

  foodType:
    pkg?.foodType ||
    pkg?.food_type ||
    "Veg",

};

            /*
            ====================================
            ADDON FILTERS
            ====================================
            */

            const foodAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.category === "food"

              );

            const comboAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.category === "combo"

              );

            const serviceAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.category === "service"

              );

            /*
            ====================================
            RECALCULATE
            ====================================
            */

            const pricing =

              calculateBookingTotals({

                selectedPackage:
                  normalizedPackage,

                foodAddons,

                comboAddons,

                serviceAddons,

                guestCount:
                  state.guestCount,

              });

            return {

              selectedPackage:
                normalizedPackage,

              pricing,

            };

          }),

        /*
        ========================================
        ADD ADDON
        ========================================
        */

        addAddon: (addon) =>

          set((state) => {

            const existingAddon =

              state.addons.find(

                (a: any) =>

                  a.id === addon.id

              );

            let updatedAddons = [];

            /*
            ====================================
            UPDATE EXISTING
            ====================================
            */

            if (existingAddon) {

              updatedAddons =

                state.addons.map(

                  (a: any) => {

                    if (
                      a.id === addon.id
                    ) {

                      const quantity =

                        a.quantity +

                        addon.quantity;

                      return {

                        ...a,

                        quantity,

                        totalPrice:

                          quantity *

                          a.unitPrice,

                      };

                    }

                    return a;

                  }

                );

            }

            /*
            ====================================
            NEW ADDON
            ====================================
            */

            else {

              updatedAddons = [

                ...state.addons,

                addon,

              ];

            }

            /*
            ====================================
            FILTERS
            ====================================
            */

            const foodAddons =

              updatedAddons.filter(

                (addon: any) =>

                  addon.category === "food"

              );

            const comboAddons =

              updatedAddons.filter(

                (addon: any) =>

                  addon.category === "combo"

              );

            const serviceAddons =

              updatedAddons.filter(

                (addon: any) =>

                  addon.category === "service"

              );

            /*
            ====================================
            RECALCULATE
            ====================================
            */

            const pricing =

              calculateBookingTotals({

                selectedPackage:
                  state.selectedPackage,

                foodAddons,

                comboAddons,

                serviceAddons,

                guestCount:
                  state.guestCount,

              });

            return {

              addons:
                updatedAddons,

              pricing,

            };

          }),

        /*
        ========================================
        REMOVE ADDON
        ========================================
        */

        removeAddon: (addonId) =>

          set((state) => {

            const updatedAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.id !== addonId

              );

            const foodAddons =

              updatedAddons.filter(

                (addon: any) =>

                  addon.category === "food"

              );

            const comboAddons =

              updatedAddons.filter(

                (addon: any) =>

                  addon.category === "combo"

              );

            const serviceAddons =

              updatedAddons.filter(

                (addon: any) =>

                  addon.category === "service"

              );

            const pricing =

              calculateBookingTotals({

                selectedPackage:
                  state.selectedPackage,

                foodAddons,

                comboAddons,

                serviceAddons,

                guestCount:
                  state.guestCount,

              });

            return {

              addons:
                updatedAddons,

              pricing,

            };

          }),

        /*
        ========================================
        UPDATE QUANTITY
        ========================================
        */

        updateAddonQuantity:

          (
            addonId,
            quantity
          ) =>

            set((state) => {

              const updatedAddons =

                state.addons.map(

                  (addon: any) => {

                    if (
                      addon.id === addonId
                    ) {

                      return {

                        ...addon,

                        quantity,

                        totalPrice:

                          quantity *

                          addon.unitPrice,

                      };

                    }

                    return addon;

                  }

                );

              const foodAddons =

                updatedAddons.filter(

                  (addon: any) =>

                    addon.category === "food"

                );

              const comboAddons =

                updatedAddons.filter(

                  (addon: any) =>

                    addon.category === "combo"

                );

              const serviceAddons =

                updatedAddons.filter(

                  (addon: any) =>

                    addon.category === "service"

                );

              const pricing =

                calculateBookingTotals({

                  selectedPackage:
                    state.selectedPackage,

                  foodAddons,

                  comboAddons,

                  serviceAddons,

                  guestCount:
                    state.guestCount,

                });

              return {

                addons:
                  updatedAddons,

                pricing,

              };

            }),

        /*
        ========================================
        GUEST COUNT
        ========================================
        */

        updateGuestCount: (count) =>

          set((state) => {

            const foodAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.category === "food"

              );

            const comboAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.category === "combo"

              );

            const serviceAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.category === "service"

              );

            const pricing =

              calculateBookingTotals({

                selectedPackage:
                  state.selectedPackage,

                foodAddons,

                comboAddons,

                serviceAddons,

                guestCount:
                  count,

              });

            return {

              guestCount: count,

              pricing,

            };

          }),

        /*
        ========================================
        FOOD PREFERENCE
        ========================================
        */

        setFoodPreference:

          (preference) =>

            set({

              foodPreference:
                preference,

            }),

        /*
        ========================================
        EVENT DETAILS
        ========================================
        */

        setEventDetails:

          (details) =>

            set({

              ...details,

            }),

        /*
        ========================================
        RECALCULATE
        ========================================
        */

        calculateTotals: () =>

          set((state) => {

            const foodAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.category === "food"

              );

            const comboAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.category === "combo"

              );

            const serviceAddons =

              state.addons.filter(

                (addon: any) =>

                  addon.category === "service"

              );

            const pricing =

              calculateBookingTotals({

                selectedPackage:
                  state.selectedPackage,

                foodAddons,

                comboAddons,

                serviceAddons,

                guestCount:
                  state.guestCount,

              });

            return {

              pricing,

            };

          }),

        /*
        ========================================
        RESET
        ========================================
        */

        resetBooking: () =>

          set({

            selectedPackage: null,

            addons: [],

            guestCount: 0,

            foodPreference: "veg",

            eventDate: undefined,

            eventTime: undefined,

            venue: undefined,

            pricing: {

              baseAmount: 0,

              foodAmount: 0,

              comboAmount: 0,

              serviceAmount: 0,

              extraGuestAmount: 0,

              subtotal: 0,

              taxAmount: 0,

              grandTotal: 0,

            },

          }),

      }),

      /*
      ========================================
      PERSIST CONFIG
      ========================================
      */

      {

        name:
          "phpc-booking-session",

        partialize: (state) => ({

          selectedPackage:
            state.selectedPackage,

          addons:
            state.addons,

          guestCount:
            state.guestCount,

          foodPreference:
            state.foodPreference,

          pricing:
            state.pricing,

          eventDate:
            state.eventDate,

          eventTime:
            state.eventTime,

          venue:
            state.venue,

        }),

      }

    )

  );