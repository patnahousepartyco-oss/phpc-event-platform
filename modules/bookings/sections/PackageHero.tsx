interface Props {
  imageSrc: string;
  packageName: string;
  tagline?: string;
}

export default function PackageHero({
  imageSrc,
  packageName,
  tagline,
}: Props) {

  return (

    <div className="bg-white rounded-[32px] overflow-hidden border border-[#E7D7C6]">

      <div className="aspect-[16/9] overflow-hidden">

        <img
          src={imageSrc}
          alt={packageName}
          className="w-full h-full object-cover"
        />

      </div>

      <div className="p-8">

        <h2 className="text-4xl font-bold text-[#5C0A18]">

          {packageName}

        </h2>

        {tagline && (

          <p className="text-lg text-gray-600 mt-5 leading-8">

            {tagline}

          </p>

        )}

      </div>

    </div>
  );
}