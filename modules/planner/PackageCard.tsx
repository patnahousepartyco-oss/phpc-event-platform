interface Props {
  pkg: any;
  price: number;
  isSelected: boolean;
  isRecommended: boolean;
  onSelect: () => void;
}

export default function PackageCard({
  pkg,
  price,
  isSelected,
  isRecommended,
  onSelect,
}: Props) {

  return (

    <div
      className={`rounded-[32px] overflow-hidden bg-white border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        isSelected
          ? "border-[#5C0A18]"
          : "border-[#E8D9C5]"
      }`}
    >

      {/* IMAGE */}

      <div className="relative h-72 overflow-hidden">

        <img
  src={
    pkg.package_name === "Celebration Pack"
      ? "/packages/celebration-pack.jpg"
      : pkg.package_name === "Family Fiesta"
      ? "/packages/family-fiesta.jpg"
      : pkg.package_name === "Little Stars"
      ? "/packages/little-stars.jpg"
      : "/packages/chill-and-celebrate.jpg"
  }
  alt={pkg.package_name}
  className="w-full h-full object-cover"
/>

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* BADGES */}

        <div className="absolute top-4 left-4 flex gap-2 z-10">

          {isRecommended && (

            <div className="bg-[#5C0A18] text-white text-xs px-4 py-2 rounded-full border border-yellow-400 shadow-lg">

              Recommended

            </div>

          )}

          {isSelected && (

            <div className="bg-green-600 text-white text-xs px-4 py-2 rounded-full shadow-lg">

              Selected

            </div>

          )}

        </div>

        {/* TEXT */}

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">

          <h3 className="text-3xl font-bold text-white">

            {pkg.package_name}

          </h3>

          <p className="text-white/80 mt-2">

            Premium curated celebration package

          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-6">

        <div className="mt-2">

          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <h2 className="text-5xl font-bold text-[#5C0A18] mt-2">

            ₹{price}

          </h2>

          <p className="text-gray-500 mt-2">
            for 10 Pax
          </p>

        </div>

        {/* BUTTON */}

        <button
          onClick={onSelect}
          className={`w-full mt-8 py-4 rounded-2xl font-semibold transition-all ${
            isSelected
              ? "bg-green-600 text-white"
              : "bg-[#5C0A18] text-white hover:bg-[#7A1022]"
          }`}
        >

          {isSelected
            ? "Selected"
            : "Choose Package"}

        </button>

      </div>

    </div>

  );
}