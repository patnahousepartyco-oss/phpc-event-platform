// state/booking/bookingSelectors.ts

import {
  useMemo,
} from "react";

import {
  useBookingStore,
} from "./bookingStore";

/*
========================================
PACKAGE
========================================
*/

export const useSelectedPackage =
  () =>
    useBookingStore(
      (state) =>
        state.selectedPackage
    );

/*
========================================
ALL ADDONS
========================================
*/

export const useBookingAddons =
  () =>
    useBookingStore(
      (state) =>
        state.addons
    );

/*
========================================
FOOD ADDONS
========================================
*/

export const useFoodAddons =
  () => {

    const addons =
      useBookingAddons();

    return useMemo(

      () =>

        addons.filter(

          (addon: any) =>

            addon.category ===
            "food"

        ),

      [addons]

    );
  };

/*
========================================
COMBO ADDONS
========================================
*/

export const useComboAddons =
  () => {

    const addons =
      useBookingAddons();

    return useMemo(

      () =>

        addons.filter(

          (addon: any) =>

            addon.category ===
            "combo"

        ),

      [addons]

    );
  };

/*
========================================
SERVICE ADDONS
========================================
*/

export const useServiceAddons =
  () => {

    const addons =
      useBookingAddons();

    return useMemo(

      () =>

        addons.filter(

          (addon: any) =>

            addon.category ===
            "service"

        ),

      [addons]

    );
  };

/*
========================================
PRICING
========================================
*/

export const useBookingPricing =
  () =>
    useBookingStore(
      (state) =>
        state.pricing
    );

export const useGrandTotal =
  () =>
    useBookingStore(
      (state) =>
        state.pricing.grandTotal
    );

/*
========================================
GUESTS
========================================
*/

export const useGuestCount =
  () =>
    useBookingStore(
      (state) =>
        state.guestCount
    );

/*
========================================
FOOD PREFERENCE
========================================
*/

export const useFoodPreference =
  () =>
    useBookingStore(
      (state) =>
        state.foodPreference
    );

/*
========================================
EVENT DETAILS
========================================
*/

export const useEventDetails =
  () => {

    const eventDate =
      useBookingStore(
        (state) =>
          state.eventDate
      );

    const eventTime =
      useBookingStore(
        (state) =>
          state.eventTime
      );

    const venue =
      useBookingStore(
        (state) =>
          state.venue
      );

    return {

      eventDate,

      eventTime,

      venue,
    };
  };

/*
========================================
ACTIONS
========================================
*/

export const useSetSelectedPackage =
  () =>
    useBookingStore(
      (state) =>
        state.setSelectedPackage
    );

export const useAddAddon =
  () =>
    useBookingStore(
      (state) =>
        state.addAddon
    );

export const useRemoveAddon =
  () =>
    useBookingStore(
      (state) =>
        state.removeAddon
    );

export const useUpdateAddonQuantity =
  () =>
    useBookingStore(
      (state) =>
        state.updateAddonQuantity
    );

export const useUpdateGuestCount =
  () =>
    useBookingStore(
      (state) =>
        state.updateGuestCount
    );

export const useSetFoodPreference =
  () =>
    useBookingStore(
      (state) =>
        state.setFoodPreference
    );

export const useSetEventDetails =
  () =>
    useBookingStore(
      (state) =>
        state.setEventDetails
    );

export const useCalculateTotals =
  () =>
    useBookingStore(
      (state) =>
        state.calculateTotals
    );

export const useResetBooking =
  () =>
    useBookingStore(
      (state) =>
        state.resetBooking
    );