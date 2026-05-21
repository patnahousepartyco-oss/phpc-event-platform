export default function HomeHeader() {

  return (

    <header
      className="
        sticky
        top-0
        z-50
        backdrop-blur-md
        bg-[#F8F4EE]/92
        border-b
        border-[#E7D6BE]
      "
    >

      <div
        className="
          max-w-[1280px]
          mx-auto
          px-4
          md:px-6
          py-2
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              items-center
              min-w-0
            "
          >

            <img
              src="/logo/logo.png"
              alt="Patna House Party Co."
              className="
                h-10
                md:h-12
                w-auto
                object-contain
                shrink-0
              "
            />

          </div>

          {/* RIGHT */}

          <div className="shrink-0">

            <a
              href="tel:+917323097811"
              className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-2
                rounded-full
                bg-white
                border
                border-[#D7BE97]
                text-[#5C0A18]
                text-sm
                font-semibold
                shadow-sm
                hover:bg-[#FFF8EE]
                transition-all
              "
            >

              <span className="text-base">
                📞
              </span>

              <span>
                +91 7323097811
              </span>

            </a>

          </div>

        </div>

      </div>

    </header>

  );

}