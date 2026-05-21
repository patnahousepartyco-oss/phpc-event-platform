interface Props {
  guestCount: number;
  foodPreference: string;
  selectedPartyType: string;
}

export default function DetailsRibbon({
  guestCount,
  foodPreference,
  selectedPartyType,
}: Props) {

  return (

    <div className="bg-white rounded-[32px] border border-[#E7D6BE] p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-[#5C0A18]">
            Your Party Details
          </h2>

          <p className="text-gray-500 mt-1">
            Customize your perfect celebration
          </p>

        </div>

        <button className="border border-[#C7A97B] px-5 py-2 rounded-2xl text-[#5C0A18] font-medium hover:bg-[#F8F1E7] transition-all">

          Edit Details

        </button>

      </div>

      {/* DETAILS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

        <div>

          <p className="text-sm text-gray-500">
            Party Type
          </p>

          <p className="font-semibold text-lg mt-1">
            {selectedPartyType || "Not Selected"}
          </p>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Guests
          </p>

          <p className="font-semibold text-lg mt-1">
            {guestCount} Pax
          </p>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Food Preference
          </p>

          <p className="font-semibold text-lg mt-1">
            {foodPreference}
          </p>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Event Type
          </p>

          <p className="font-semibold text-lg mt-1">
            House Party
          </p>

        </div>

      </div>

    </div>

  );
}