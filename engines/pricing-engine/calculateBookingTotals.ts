// engines/pricing-engine/calculateBookingTotals.ts

/*
========================================
ENGINES
========================================
*/

import {

  calculateComboTotal,

} from "@/engines/combo-engine/calculateComboTotal";

import {

  calculateServiceAddonTotal,

} from "@/engines/service-addon-engine/calculateServiceAddon";

/*
========================================
PARAMS
========================================
*/

interface Params {

  selectedPackage: any;

  foodAddons: any[];

  comboAddons: any[];

  serviceAddons: any[];

  guestCount: number;
}

/*
========================================
MASTER BOOKING PRICING ENGINE
========================================
*/

export function calculateBookingTotals({

  selectedPackage,

  foodAddons,

  comboAddons,

  serviceAddons,

  guestCount,

}: Params) {

  /*
  ========================================
  EMPTY STATE
  ========================================
  */

  if (!selectedPackage) {

    return {

      baseAmount: 0,

      foodAmount: 0,

      comboAmount: 0,

      serviceAmount: 0,

      extraGuestAmount: 0,

      subtotal: 0,

      taxAmount: 0,

      grandTotal: 0,
    };
  }

  /*
  ========================================
  BASE PACKAGE
  ========================================
  */

  const baseAmount =

  Number(

    selectedPackage.basePrice ||

    selectedPackage.selling_price ||

    0

  );

  /*
  ========================================
  FOOD ADDONS
  ========================================
  */

  const foodAmount =

    foodAddons.reduce(

      (
        total: number,
        addon: any
      ) => {

        /*
        ====================================
        STORED TOTAL
        ====================================
        */

        if (
          addon.totalPrice !==
          undefined
        ) {

          return (

            total +

            Number(
              addon.totalPrice || 0
            )

          );
        }

        /*
        ====================================
        FALLBACK
        ====================================
        */

        return (

          total +

          Number(
            addon.unitPrice || 0
          )

        );

      },

      0

    );

  /*
  ========================================
  COMBO TOTALS
  ========================================
  */

  const comboAmount =

    comboAddons.reduce(

      (
        total: number,
        combo: any
      ) => {

        /*
        ====================================
        STORED COMBO TOTAL
        ====================================
        */

        if (
          combo.totalPrice !==
          undefined
        ) {

          return (

            total +

            Number(
              combo.totalPrice || 0
            )

          );
        }

        /*
        ====================================
        RAW COMBO RECALCULATION
        ====================================
        */

        const pricing =

          calculateComboTotal(

            combo.rawCombo ||

            combo

          );

        return (

          total +

          Number(
            pricing.comboPrice || 0
          )

        );

      },

      0

    );

  /*
  ========================================
  SERVICE TOTALS
  ========================================
  */

  const serviceAmount =

    serviceAddons.reduce(

      (
        total: number,
        addon: any
      ) => {

        /*
        ====================================
        STORED SERVICE TOTAL
        ====================================
        */

        if (
          addon.totalPrice !==
          undefined
        ) {

          return (

            total +

            Number(
              addon.totalPrice || 0
            )

          );
        }

        /*
        ====================================
        RAW SERVICE RECALCULATION
        ====================================
        */

        const pricing =

          calculateServiceAddonTotal(

            addon.rawAddon ||

            addon,

            addon.quantity || 1

          );

        return (

          total +

          Number(
            pricing.total || 0
          )

        );

      },

      0

    );

  /*
  ========================================
  EXTRA GUESTS
  ========================================
  */
console.log(

  "PRICING ENGINE",

  {

    guestCount,

    includedGuests:
      selectedPackage?.includedGuests,

    basePrice:
      selectedPackage?.basePrice,

    additionalPlateCost:
      selectedPackage?.additionalPlateCost,

  }

);

  const extraGuests = Math.max(

    guestCount -

    Number(
      selectedPackage.includedGuests || 0
    ),

    0

  );

  /*
  ========================================
  EXTRA GUEST COST
  ========================================
  */

  const extraGuestAmount =

    extraGuests *

    Number(
      selectedPackage.additionalPlateCost || 0
    );

  /*
  ========================================
  SUBTOTAL
  ========================================
  */

  const subtotal =

    baseAmount +

    foodAmount +

    comboAmount +

    serviceAmount +

    extraGuestAmount;

  /*
  ========================================
  GST
  ========================================
  */

  const taxAmount =

    subtotal * 0.18;

  /*
  ========================================
  GRAND TOTAL
  ========================================
  */

  const grandTotal =

    subtotal + taxAmount;

  /*
  ========================================
  FINAL OUTPUT
  ========================================
  */

  return {

    baseAmount,

    foodAmount,

    comboAmount,

    serviceAmount,

    extraGuestAmount,

    subtotal,

    taxAmount,

    grandTotal,
  };
}