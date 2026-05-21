export function calculateRecommendedSlab(
  pax: number
) {

  if (pax <= 15) {
    return 10;
  }

  if (pax <= 25) {
    return 20;
  }

  return 30;
}

export function calculateAdditionalPax(
  pax: number,
  slab: number
) {

  return pax > slab
    ? pax - slab
    : 0;
}

export function calculatePackagePrice({

  selectedPlan,

  operationalContext,

}: any) {

  /* SAFETY */

  if (!selectedPlan) {

    return {

      slab: 0,

      additionalPax: 0,

      packagePrice: 0,

      perPlatePrice: 0,

      additionalGuestCost: 0,

      total: 0,

    };
  }

  /* CONTEXT */

  const {

    guestCount,

    activeBasePlan,

    activeExtraGuests,

    finalOperationalPax,

    foodPreference,

  } = operationalContext;

  /* RECOMMENDED SLAB */

  const slab =
    calculateRecommendedSlab(
      guestCount
    );

  /* ADDITIONAL PAX */

  const additionalPax =
    calculateAdditionalPax(

      finalOperationalPax,

      activeBasePlan

    );

  /* PACKAGE PRICE */

  const packagePrice =

    foodPreference ===
    "Veg"

      ? Number(
          selectedPlan.selling_price || 0
        )

      : Number(
          selectedPlan.selling_price || 0
        );

  /* EXTRA PLATE PRICE */

  const perPlatePrice =
    Number(
      selectedPlan.extra_plate_price || 0
    );

  /* EXTRA GUEST COST */

  const additionalGuestCost =

    additionalPax *
    perPlatePrice;

  /* FINAL TOTAL */

  const total =

    packagePrice +

    additionalGuestCost;

  return {

    slab,

    additionalPax,

    packagePrice,

    perPlatePrice,

    additionalGuestCost,

    total,

  };
}