export function getRecommendationPlan(
  guestCount: number
) {

  /* 0–10 */

  if (guestCount <= 10) {

    return {

      recommendedBasePlan: 10,

      recommendedExtraGuests: 0,

      alternateBasePlan: null,

      alternateExtraGuests: 0,

      showAlternate: false,
    };
  }

  /* 11–15 */

  if (guestCount <= 15) {

    return {

      recommendedBasePlan: 10,

      recommendedExtraGuests:
        guestCount - 10,

      alternateBasePlan: null,

      alternateExtraGuests: 0,

      showAlternate: false,
    };
  }

  /* 16–20 */

  if (guestCount >= 16 &&
    guestCount <= 19) {

    return {

      recommendedBasePlan: 20,

      recommendedExtraGuests: 0,

      alternateBasePlan: 10,

      alternateExtraGuests:
        guestCount - 10,

      showAlternate: true,
    };
  }

  /* 21–25 */

  if (guestCount <= 25) {

    return {

      recommendedBasePlan: 20,

      recommendedExtraGuests:
        guestCount - 20,

      alternateBasePlan: null,

      alternateExtraGuests: 0,

      showAlternate: false,
    };
  }

  /* 26–30 */

  if (guestCount >= 26 &&
    guestCount <= 29) {

    return {

      recommendedBasePlan: 30,

      recommendedExtraGuests: 0,

      alternateBasePlan: 20,

      alternateExtraGuests:
        guestCount - 20,

      showAlternate: true,
    };
  }

  /* 31+ */

  return {

    recommendedBasePlan: 30,

    recommendedExtraGuests:
      guestCount - 30,

    alternateBasePlan: null,

    alternateExtraGuests: 0,

    showAlternate: false,
  };
}