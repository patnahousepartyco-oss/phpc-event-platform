// engines/context-engine/buildEventContext.ts

import type {

  BookingRuntimeContext,

} from "./contextTypes";

/*
========================================
BUILD EVENT CONTEXT
========================================
*/

export function buildEventContext({

  /*
  ========================================
  CRM IDS
  ========================================
  */

  customerId,

  leadId,

  /*
  ========================================
  LEAD
  ========================================
  */

  customerName,

  customerMobile,

  /*
  ========================================
  EVENT
  ========================================
  */

  partyType,

  guestCount,

  /*
  ========================================
  PREFERENCES
  ========================================
  */

  foodPreference,

  budgetRange,

  /*
  ========================================
  RECOMMENDATION
  ========================================
  */

  recommendedPackage,

  /*
  ========================================
  RUNTIME DATASETS
  ========================================
  */

  packages = [],

  plans = [],

  foodAddons = [],

  addonMappings = [],

  serviceAddons = [],

  combos = [],

  /*
  ========================================
  ACTIVE RUNTIME
  ========================================
  */

  selectedPackage = null,

  selectedPlan = null,

  pricing = null,

}: any): BookingRuntimeContext {

  /*
  ========================================
  NORMALIZED CONTEXT
  ========================================
  */

  const context: BookingRuntimeContext = {

    /*
    ======================================
    LEAD
    ======================================
    */

    lead: {

      /*
      ====================================
      PERSISTENT CRM IDS
      ====================================
      */

      customer_id:

        customerId || "",

      lead_id:

        leadId || "",

      /*
      ====================================
      CUSTOMER
      ====================================
      */

      customer_name:

        customerName || "",

      customer_mobile:

        customerMobile || "",

      /*
      ====================================
      TIMESTAMP
      ====================================
      */

      created_at:

        new Date().toISOString(),

    },

    /*
    ======================================
    EVENT
    ======================================
    */

    event: {

      party_type:

        partyType || "",

      guest_count:

        Number(
          guestCount || 0
        ),

    },

    /*
    ======================================
    PREFERENCES
    ======================================
    */

    preferences: {

      food_preference:

        foodPreference || "",

      budget_range:

        budgetRange || "",

    },

    /*
    ======================================
    RECOMMENDATION
    ======================================
    */

    recommendation: {

      recommended_package_id:

        recommendedPackage?.package_id ||

        recommendedPackage?.packageId ||

        null,

      recommended_package_name:

        recommendedPackage?.package_name ||

        recommendedPackage?.name ||

        null,

    },

    /*
    ======================================
    RAW DATASETS
    ======================================
    */

    packages:

      Array.isArray(packages)

        ? packages

        : [],

    plans:

      Array.isArray(plans)

        ? plans

        : [],

    foodAddons:

      Array.isArray(foodAddons)

        ? foodAddons

        : [],

    addonMappings:

      Array.isArray(addonMappings)

        ? addonMappings

        : [],

    serviceAddons:

      Array.isArray(serviceAddons)

        ? serviceAddons

        : [],

    combos:

      Array.isArray(combos)

        ? combos

        : [],

    /*
    ======================================
    ACTIVE RUNTIME
    ======================================
    */

    selectedPackage:

      selectedPackage || null,

    selectedPlan:

      selectedPlan || null,

    pricing:

      pricing || null,

  };

  /*
  ========================================
  RETURN
  ========================================
  */

  return context;

}