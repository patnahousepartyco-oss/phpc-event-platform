// state/booking/bookingTypes.ts

/*
========================================
ADDONS
========================================
*/

export interface SelectedAddon {

  id: string;

  name: string;

  category:
    | "food"
    | "service"
    | "combo";

  quantity: number;

  unitPrice: number;

  totalPrice: number;

  /*
  ========================================
  OPTIONAL
  ========================================
  */

  comboType?:
    | "static"
    | "custom";

  /*
  ========================================
  RAW OBJECTS
  ========================================
  */

  rawAddon?: any;

  rawCombo?: any;

  /*
  ========================================
  CUSTOM COMBO
  ========================================
  */

  customFood?: any;

  customServices?: any[];

  /*
  ========================================
  STATIC COMBO
  ========================================
  */

  regularTotal?: number;

  savings?: number;
}

/*
========================================
PACKAGE
========================================
*/

export interface SelectedPackage {

  planId: string;

  packageId: string;

  name: string;

  description?: string;

  basePrice: number;

  includedGuests: number;

  additionalPlateCost: number;

  recommended?: boolean;
}

/*
========================================
PRICING
========================================
*/

export interface BookingPricing {

  /*
  ========================================
  PACKAGE
  ========================================
  */

  baseAmount: number;

  /*
  ========================================
  FOOD
  ========================================
  */

  foodAmount: number;

  /*
  ========================================
  COMBOS
  ========================================
  */

  comboAmount: number;

  /*
  ========================================
  SERVICES
  ========================================
  */

  serviceAmount: number;

  /*
  ========================================
  GUESTS
  ========================================
  */

  extraGuestAmount: number;

  /*
  ========================================
  TOTALS
  ========================================
  */

  subtotal: number;

  taxAmount: number;

  grandTotal: number;
}

/*
========================================
EVENT DETAILS
========================================
*/

export interface EventDetails {

  eventDate?: string;

  eventTime?: string;

  venue?: string;
}

/*
========================================
BOOKING STATE
========================================
*/

export interface BookingState {

  /*
  ========================================
  CORE BOOKING
  ========================================
  */

  selectedPackage:
    | SelectedPackage
    | null;

  addons: SelectedAddon[];

  guestCount: number;

  foodPreference:
    | "veg"
    | "nonveg"
    | "both";

  /*
  ========================================
  EVENT DETAILS
  ========================================
  */

  eventDate?: string;

  eventTime?: string;

  venue?: string;

  /*
  ========================================
  PRICING
  ========================================
  */

  pricing: BookingPricing;

  /*
  ========================================
  PACKAGE ACTIONS
  ========================================
  */

  setSelectedPackage: (
    pkg: SelectedPackage
  ) => void;

  /*
  ========================================
  ADDON ACTIONS
  ========================================
  */

  addAddon: (
    addon: SelectedAddon
  ) => void;

  removeAddon: (
    addonId: string
  ) => void;

  updateAddonQuantity: (

    addonId: string,

    quantity: number

  ) => void;

  /*
  ========================================
  GUEST ACTIONS
  ========================================
  */

  updateGuestCount: (
    count: number
  ) => void;

  /*
  ========================================
  FOOD ACTIONS
  ========================================
  */

  setFoodPreference: (

    preference:
      | "veg"
      | "nonveg"
      | "both"

  ) => void;

  /*
  ========================================
  EVENT ACTIONS
  ========================================
  */

  setEventDetails: (
    details: EventDetails
  ) => void;

  /*
  ========================================
  PRICING ACTIONS
  ========================================
  */

  calculateTotals: () => void;

  /*
  ========================================
  RESET
  ========================================
  */

  resetBooking: () => void;
}