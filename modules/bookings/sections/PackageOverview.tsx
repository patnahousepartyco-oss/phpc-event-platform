interface Props {

  selectedPackage: any;

  activeBasePlan?: number;

  activeExtraGuests?: number;
}

export default function PackageOverview({

  selectedPackage,

  activeBasePlan,

  activeExtraGuests,

}: Props) {

  return (

    <div className="bg-white rounded-[32px] border border-[#E7D7C6] p-8">

      <p className="uppercase tracking-[4px] text-sm text-[#A67C52] font-semibold">

        Package Experience

      </p>

      <div className="space-y-10 mt-8">

        {/* TAGLINE */}

        <div>

          <p className="uppercase tracking-[3px] text-xs text-[#A67C52] font-semibold">

            Experience

          </p>

          <p className="text-2xl text-[#5C0A18] font-semibold mt-4 leading-10">

            {selectedPackage?.tagline}

          </p>

          {/* OPERATIONAL CONTEXT */}

          <p className="mt-4 text-sm text-[#7A0019]/70 leading-7">

            Selected plan:

            <span className="font-medium">

              {" "}
              {activeBasePlan || 0} Pax

            </span>

            {

              (activeExtraGuests || 0) > 0 && (

                <>

                  {" "}
                  ·

                  <span className="font-medium">

                    {" "}
                    +{activeExtraGuests} extra guests

                  </span>

                  {" "}
                  ·

                  <span className="font-medium">

                    {" "}
                    ₹
                    {
                      selectedPackage?.additionalPlateCost || 0
                    }
                    {" "}
                    per extra guest

                  </span>

                </>

              )

            }

          </p>

        </div>

        {/* WHAT INCLUDES */}

        <div>

          <p className="uppercase tracking-[3px] text-xs text-[#A67C52] font-semibold">

            What Includes

          </p>

          <p className="text-lg text-gray-700 mt-4 leading-9 whitespace-pre-line">

            {selectedPackage?.what_includes}

          </p>

        </div>

        {/* MENU */}

        {selectedPackage?.menu && (

          <div>

            <p className="uppercase tracking-[3px] text-xs text-[#A67C52] font-semibold">

              Menu Highlights

            </p>

            <div className="bg-[#F8F5F2] rounded-2xl p-6 mt-4">

              <p className="text-lg text-gray-700 leading-9 whitespace-pre-line">

                {selectedPackage?.menu}

              </p>

            </div>

          </div>

        )}

        {/* DESCRIPTION */}

        <div>

          <p className="uppercase tracking-[3px] text-xs text-[#A67C52] font-semibold">

            Why You'll Love It

          </p>

          <p className="text-lg text-gray-700 mt-4 leading-9 whitespace-pre-line">

            {selectedPackage?.description}

          </p>

        </div>

      </div>

    </div>
  );
}