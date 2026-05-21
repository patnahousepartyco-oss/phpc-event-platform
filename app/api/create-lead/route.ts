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

    } = body || {};

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
    GOOGLE SCRIPT URL
    ======================================
    */

    const googleScriptUrl =

      process.env
        .GOOGLE_SCRIPT_URL;

    /*
    ======================================
    ENV VALIDATION
    ======================================
    */

    if (!googleScriptUrl) {

      console.error(
        "GOOGLE_SCRIPT_URL missing"
      );

      return NextResponse.json(

        {

          success: false,

          message:
            "Server configuration missing",

        },

        {

          status: 500,

        }

      );
    }

    /*
    ======================================
    NORMALIZED PAYLOAD
    ======================================
    */

    const payload = {

      action:
        "createLead",

      /*
      ====================================
      CUSTOMER
      ====================================
      */

      customerName:

        String(
          customerName || ""
        ),

      customerMobile:

        String(
          customerMobile || ""
        ),

      /*
      ====================================
      EVENT
      ====================================
      */

      partyType:

        String(
          partyType || ""
        ),

      guestCount:

        Number(
          guestCount || 0
        ),

      foodPreference:

        String(
          foodPreference || "Veg"
        ),

      /*
      ====================================
      PACKAGE
      ====================================
      */

      recommendedPackageId:

        String(
          recommendedPackageId || ""
        ),

      recommendedPackageName:

        String(
          recommendedPackageName || ""
        ),

      /*
      ====================================
      OPERATIONAL
      ====================================
      */

      selectedBasePlan:

        selectedBasePlan !==
        undefined

          ? Number(
              selectedBasePlan
            )

          : null,

    };

    /*
    ======================================
    DEBUG
    ======================================
    */

    console.log(
      "CREATE LEAD PAYLOAD:",
      payload
    );

    /*
    ======================================
    APPS SCRIPT REQUEST
    ======================================
    */

    const appsScriptResponse =
  await fetch(

    googleScriptUrl,

    {

      method: "POST",

      redirect: "follow",

      headers: {

        "Content-Type":
          "text/plain;charset=utf-8",

      },

      body: JSON.stringify(
        payload
      ),

      cache: "no-store",

    }

  );

    /*
    ======================================
    RESPONSE VALIDATION
    ======================================
    */

    if (
      !appsScriptResponse.ok
    ) {

      console.error(

        "GOOGLE SCRIPT ERROR:",

        appsScriptResponse.status
      );

      return NextResponse.json(

        {

          success: false,

          message:
            "Apps Script request failed",

        },

        {

          status: 500,

        }

      );
    }

    /*
    ======================================
    PARSE RESPONSE
    ======================================
    */

    const rawText =
  await appsScriptResponse.text();

console.log(
  "RAW APPS SCRIPT RESPONSE:",
  rawText
);

let result = {};

try {

  result =
    JSON.parse(rawText);

} catch (error) {

  return NextResponse.json({

    success: true,

    fallback: true,

    customer_id:
      `TEMP_${Date.now()}`,

    lead_id:
      `TEMP_${Date.now()}`,

  });

}

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