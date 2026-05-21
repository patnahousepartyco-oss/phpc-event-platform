interface Props {

  leftContent?: React.ReactNode;

  rightContent?: React.ReactNode;

}

export default function HeroSection({

  leftContent,

  rightContent,

}: Props) {

  return (

    <section className="relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[#F8F4EE]" />

      {/* SOFT GLOW */}

      <div
        className="
          absolute
          top-[-100px]
          right-[-100px]
          h-[240px]
          w-[240px]
          rounded-full
          bg-[#7A1022]/6
          blur-3xl
        "
      />

      <div
        className="
          relative
          max-w-[1180px]
          mx-auto
          px-4
          md:px-6
          py-4
          md:py-8
        "
      >

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-[0.72fr_1.28fr]
            gap-6
            xl:gap-8
            items-start
          "
        >

          {/* LEFT CONTENT */}

          <div
            className="
              max-w-[520px]
              pt-1
            "
          >

            {leftContent}

          </div>

          {/* RIGHT CONTENT */}

          <div
            className="
              w-full
              min-w-0
            "
          >

            {rightContent}

          </div>

        </div>

      </div>

    </section>

  );
}