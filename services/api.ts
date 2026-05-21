

/*
========================================
API URL
========================================
*/

const API_URL =

  process.env
    .NEXT_PUBLIC_API_URL;

/*
========================================
GENERIC API FETCHER
========================================
*/

async function fetchAPI(
  action: string
) {

  try {

    /*
    ====================================
    FETCH
    ====================================
    */

    const response =

      await fetch(

        `${API_URL}?action=${action}`,

        {
          method: "GET",

          cache: "no-store",
        }

      );

    /*
    ====================================
    HTTP ERROR
    ====================================
    */

    if (!response.ok) {

      console.error(

        `API HTTP Error (${action})`,

        response.status

      );

      return [];
    }

    /*
    ====================================
    SAFE JSON PARSE
    ====================================
    */

    let data;

    try {

      data =
        await response.json();

    } catch (jsonError) {

      console.error(

        `Invalid JSON (${action})`,

        jsonError

      );

      return [];
    }

   /*
========================================
MASTER OBJECT RESPONSE
========================================
*/

if (

  action ===
  "getMasterData"

) {

  return data;
}

/*
========================================
ARRAY RESPONSE
========================================
*/

if (!Array.isArray(data)) {

  console.error(

    `Invalid API response (${action})`,

    data

  );

  return [];
}

    return data;

  } catch (error) {

    console.error(

      `Fetch failed (${action})`,

      error

    );

    return [];
  }
}

/*
========================================
PACKAGES
========================================
*/

export async function fetchPackages() {

  return fetchAPI(
    "getPackages"
  );
}

/*
========================================
PLANS
========================================
*/

export async function fetchPlans() {

  return fetchAPI(
    "getPlans"
  );
}

/*
========================================
PACKAGE MENU
========================================
*/

export async function fetchPackageMenu() {

  return fetchAPI(
    "getPackageMenu"
  );
}

/*
========================================
PARTY TYPES
========================================
*/

export async function fetchPartyTypes() {

  return fetchAPI(
    "getPartyTypes"
  );
}

/*
========================================
FOOD ADDONS
========================================
*/

export async function fetchFoodAddons() {

  return fetchAPI(
    "getFoodAddons"
  );
}

/*
========================================
SERVICE ADDONS
========================================
*/

export async function fetchServiceAddons() {

  return fetchAPI(
    "getServiceAddons"
  );
}

/*
========================================
COMBOS
========================================
*/

export async function fetchCombos() {

  return fetchAPI(
    "getCombos"
  );
}

/*
========================================
ADDON MAPPINGS
========================================
*/

export async function fetchAddonMappings() {

  return fetchAPI(
    "getAddonMappings"
  );
}

/* =================================================
   MASTER DATA
================================================= */

export async function fetchMasterData() {

  return fetchAPI(
    "getMasterData"
  );
}