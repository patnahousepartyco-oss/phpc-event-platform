import {

  NextResponse,

} from "next/server";

/*
========================================
POST
========================================
*/

export async function POST(
  request: Request
) {

  try {

    /*
    ======================================
    BODY
    ======================================
    */

    const body =
      await request.json();

   const {

  /*
  ======================================
  CUSTOMER
  ======================================
  */

  customerName,

  customerMobile,

  /*
  ======================================
  EVENT
  ======================================
  */

  partyType,

  guestCount,

  foodPreference,

  /*
  ======================================
  PACKAGE
  ======================================
  */

  recommendedPackageId,

  recommendedPackageName,

  /*
  ======================================
  OPERATIONAL
  ======================================
  */

  selectedBasePlan,

} = body;

    /*
    ======================================
    BASIC VALIDATION
    ======================================
    */

    if (

      !customerName ||

      !customerMobile

    ) {

      return NextResponse.json(

        {

          success: false,

          message:
            "Missing required fields",

        },

        {

          status: 400,

        }

      );
    }

  /*
======================================
APPS SCRIPT REQUEST
======================================
*/

console.log(
  process.env.GOOGLE_SCRIPT_URL
);

const appsScriptResponse =
  await fetch(

    process.env
      .GOOGLE_SCRIPT_URL as string,

    {

      method: "POST",

      headers: {

        "Content-Type":
          "application/json",

      },

      body: JSON.stringify({

        action:
          "createLead",

        /*
        ==================================
        CUSTOMER
        ==================================
        */

        customerName,

        customerMobile,

        /*
        ==================================
        EVENT
        ==================================
        */

        partyType,

        guestCount,

        foodPreference,

        /*
        ==================================
        PACKAGE
        ==================================
        */

        recommendedPackageId,

        recommendedPackageName,

        /*
        ==================================
        OPERATIONAL
        ==================================
        */

        selectedBasePlan,

      }),

    }

  );

/*
======================================
PARSE RESPONSE
======================================
*/

const result =
  await appsScriptResponse.json();

/*
======================================
RETURN
======================================
*/

return NextResponse.json(
  result
); 



  } catch (error) {

    console.error(
      "CREATE LEAD ERROR:",
      error
    );

    return NextResponse.json(

      {

        success: false,

        message:
          "Lead creation failed",

      },

      {

        status: 500,

      }

    );
  }
}