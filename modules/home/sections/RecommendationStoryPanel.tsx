interface Props {

  recommendedPackage?: any;

  selectedPartyType?: string;

}

export default function RecommendationStoryPanel({

  recommendedPackage,

  selectedPartyType,

}: Props) {

  const packageName =
    recommendedPackage?.package_name || "";

  /* =================================================
     DYNAMIC CONTENT
  ================================================= */

  const contentMap: any = {

    "Celebration Pack": {

      title:
        "Perfect for intimate celebrations at home.",

      description:
        "Designed for small family celebrations without the hassle of banquet bookings, restaurant chaos or vendor coordination.",

      highlights: [

        "Elegant home setup experience",

        "Curated celebration food",

        "Smooth managed execution",

        "Celebration cake arrangement",

      ],

      emotional:
        "Everything feels organized, warm and celebration-ready from the moment your guests arrive.",

    },

    "Family Fiesta": {

      title:
        "Designed for warm family gatherings.",

      description:
        "A balanced celebration experience for families who want a professionally managed setup without the stress of arranging everything themselves.",

      highlights: [

        "Balanced family-friendly menu",

        "Elegant decor setup",

        "Comfortable celebration atmosphere",

        "Managed hosting experience",

      ],

      emotional:
        "Celebrate together while we handle the coordination, setup and execution behind the scenes.",

    },

    "Little Stars": {

      title:
        "Made for memorable kids celebrations.",

      description:
        "Fun, colorful and safe celebration experiences curated specially for kids birthdays and family gatherings at home.",

      highlights: [

        "Kid-friendly celebration setup",

        "Fun themed atmosphere",

        "Celebration cake arrangement",

        "Stress-free hosting experience",

      ],

      emotional:
        "A joyful experience designed to keep celebrations smooth, memorable and family-friendly.",

    },

    "Chill & Celebrate": {

      title:
        "Relaxed house party experience with curated vibes.",

      description:
        "Perfect for modern house parties where you want stylish setup, curated food and a smooth guest experience without doing everything yourself.",

      highlights: [

        "Cafe-style party setup",

        "Instagram-ready decor",

        "Curated food experience",

        "Smooth guest hosting atmosphere",

      ],

      emotional:
        "Enjoy your own celebration while the entire setup experience feels professionally managed.",

    },

  };

  const content =

    contentMap[
      packageName
    ] ||

    contentMap[
      "Celebration Pack"
    ];

  return (

    <div
      className="
        max-w-[560px]
        bg-white
        border
        border-[#E7D6BE]
        rounded-[28px]
        p-5
        shadow-sm
      "
    >

      {/* TOP TAG */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          px-3
          py-1.5
          rounded-full
          bg-[#FFF7ED]
          border
          border-[#E7D6BE]
          text-[#7A1022]
          text-xs
          font-semibold
        "
      >

        Curated Recommendation

      </div>

      {/* TITLE */}

      <h2
        className="
          mt-5
          text-2xl
          md:text-3xl
          font-black
          leading-tight
          text-[#5C0A18]
        "
      >

        {content.title}

      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          mt-4
          text-base
          leading-7
          text-[#5B6475]
        "
      >

        {content.description}

      </p>

      {/* HIGHLIGHTS */}

      <div className="mt-7 space-y-3">

        {content.highlights.map(

          (
            item: string,
            index: number
          ) => (

            <div
              key={index}
              className="
                flex
                items-start
                gap-3
              "
            >

              <div
                className="
                  h-5
                  w-5
                  rounded-full
                  bg-[#5C0A18]
                  text-white
                  flex
                  items-center
                  justify-center
                  text-[10px]
                  shrink-0
                  mt-1
                "
              >

                ✓

              </div>

              <p
                className="
                  text-[#5C0A18]
                  text-sm
                  font-medium
                  leading-6
                "
              >

                {item}

              </p>

            </div>

          )

        )}

      </div>

      {/* EMOTIONAL BLOCK */}

      <div
        className="
          mt-7
          p-4
          rounded-[20px]
          bg-[#FFF8EE]
          border
          border-[#E7D6BE]
        "
      >

        <p
          className="
            text-[#5C0A18]
            text-sm
            leading-6
            font-medium
          "
        >

          {content.emotional}

        </p>

      </div>

      {/* FOOTER CHIPS */}

      <div
        className="
          mt-7
          flex
          flex-wrap
          gap-2
        "
      >

        <div
          className="
            px-3
            py-1.5
            rounded-full
            bg-white
            border
            border-[#E7D6BE]
            text-[#5C0A18]
            text-xs
            font-semibold
          "
        >

          Starting From 10 Guests

        </div>

        <div
          className="
            px-3
            py-1.5
            rounded-full
            bg-white
            border
            border-[#E7D6BE]
            text-[#5C0A18]
            text-xs
            font-semibold
          "
        >

          Transparent Pricing

        </div>

        <div
          className="
            px-3
            py-1.5
            rounded-full
            bg-white
            border
            border-[#E7D6BE]
            text-[#5C0A18]
            text-xs
            font-semibold
          "
        >

          Professionally Managed

        </div>

      </div>

    </div>

  );

}