interface Props {
  packageName: string;
  guestCount: number;
  activeBasePlan: number;
  activeExtraGuests: number;
  foodPreference?: string;
  basePackagePrice?: number;
extraGuestPrice?: number;
}

export default function BookingDetails({
  packageName,
  guestCount,
  activeBasePlan,
  activeExtraGuests,
  foodPreference,
  basePackagePrice,
extraGuestPrice,
}: Props) {

  return (

    <div className="bg-white rounded-[32px] border border-[#E7D7C6] p-8">

      <p className="uppercase tracking-[4px] text-sm text-[#A67C52] font-semibold">

        Booking Details

      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* PACKAGE */}

        <div className="bg-[#F8F5F2] rounded-2xl p-6">

          <p className="text-sm text-gray-500">

            Selected Package

          </p>

          <p className="text-2xl font-bold text-[#5C0A18] mt-3">

            {packageName}

          </p>

        </div>

        {/* GUESTS */}

        <div className="bg-[#F8F5F2] rounded-2xl p-6">

          <p className="text-sm text-gray-500">

            Total Guests

          </p>

          <p className="text-2xl font-bold text-[#5C0A18] mt-3">

            {guestCount} Pax

          </p>

        </div>

        {/* BASE PLAN */}

        <div className="bg-[#F8F5F2] rounded-2xl p-6">

          <p className="text-sm text-gray-500">

            Operational Base Plan

          </p>

          <p className="text-2xl font-bold text-[#5C0A18] mt-3">

            {activeBasePlan} Pax

          </p>

        </div>

        {/* EXTRA GUESTS */}

        <div className="bg-[#F8F5F2] rounded-2xl p-6">

          <p className="text-sm text-gray-500">

            Extra Guests

          </p>

          <p className="text-2xl font-bold text-[#5C0A18] mt-3">

            {activeExtraGuests > 0
              ? `+${activeExtraGuests}`
              : "None"}

          </p>

        </div>

      </div>

      {/* PACKAGE PRICE */}

<div className="bg-[#F8F5F2] rounded-2xl p-6">

  <p className="text-sm text-gray-500">

    Selected Plan Price

  </p>

  <p className="text-2xl font-bold text-[#5C0A18] mt-3">

    ₹
    {basePackagePrice || 0}

  </p>

</div>

{/* EXTRA GUEST COST */}

<div className="bg-[#F8F5F2] rounded-2xl p-6">

  <p className="text-sm text-gray-500">

    Additional Guest Pricing

  </p>

  <p className="text-2xl font-bold text-[#5C0A18] mt-3">

    ₹
    {extraGuestPrice || 0}

    <span className="text-base font-medium text-gray-500 ml-2">

      / guest

    </span>

  </p>

</div>

      {/* FOOD */}

      {foodPreference && (

        <div className="bg-[#F8F5F2] rounded-2xl p-6 mt-6">

          <p className="text-sm text-gray-500">

            Food Preference

          </p>

          <p className="text-2xl font-bold text-[#5C0A18] mt-3">

            {foodPreference}

          </p>

        </div>

      )}

    </div>
  );
}