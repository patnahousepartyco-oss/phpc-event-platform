// engines/context-engine/contextTypes.ts

/*
========================================
LEAD CONTEXT
========================================
*/

export interface LeadContext {

  lead_id: string;

  customer_name: string;

  customer_mobile: string;

  created_at: string;
}

/*
========================================
EVENT CONTEXT
========================================
*/

export interface EventContext {

  party_type: string;

  guest_count: number;
}

/*
========================================
PREFERENCES CONTEXT
========================================
*/

export interface PreferencesContext {

  food_preference: string;

  budget_range?: string;
}

/*
========================================
RECOMMENDATION CONTEXT
========================================
*/

export interface RecommendationContext {

  recommended_package_id:
    string | null;

  recommended_package_name:
    string | null;
}

/*
========================================
BOOKING RUNTIME CONTEXT
========================================
*/

export interface BookingRuntimeContext {

  /*
  ========================================
  LEAD
  ========================================
  */

  lead: LeadContext;

  /*
  ========================================
  EVENT
  ========================================
  */

  event: EventContext;

  /*
  ========================================
  PREFERENCES
  ========================================
  */

  preferences:
    PreferencesContext;

  /*
  ========================================
  RECOMMENDATION
  ========================================
  */

  recommendation:
    RecommendationContext;

  /*
  ========================================
  RAW DATASETS
  ========================================
  */

  packages?: any[];

  plans?: any[];

  foodAddons?: any[];

  addonMappings?: any[];

  serviceAddons?: any[];

  combos?: any[];

  /*
  ========================================
  RUNTIME
  ========================================
  */

  selectedPackage?: any;

  selectedPlan?: any;

  pricing?: any;
}