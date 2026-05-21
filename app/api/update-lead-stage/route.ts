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

    /*
    ======================================
    VALIDATION
    ======================================
    */

    if (

      !body.leadId ||

      !body.leadStage

    ) {

      return NextResponse.json({

        success: false,

        error:
          "Missing leadId or leadStage",

      });
    }

    /*
    ======================================
    APPS SCRIPT
    ======================================
    */

    const response =
      await fetch(

        process.env.GOOGLE_SCRIPT_URL!,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            action:
              "updateLeadStage",

            leadId:
              body.leadId,

            leadStage:
              body.leadStage,

          }),

        }

      );

    /*
    ======================================
    RESPONSE
    ======================================
    */

    const data =
      await response.json();

    return NextResponse.json(
      data
    );

  } catch (error: any) {

    return NextResponse.json({

      success: false,

      error:
        error?.message ||

        "Stage update failed",

    });
  }
}