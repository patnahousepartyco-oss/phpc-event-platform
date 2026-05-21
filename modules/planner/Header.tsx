export default function Header() {

  return (

    <header className="bg-[#5C0A18] text-white px-8 py-5">

      <div className="max-w-[1600px] mx-auto flex items-center justify-between">

        {/* LEFT */}

        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Patna House Party Co.
          </h1>

          <p className="text-yellow-200 mt-1 text-sm">
            Premium House Party Experiences
          </p>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          <button className="border border-yellow-400 text-yellow-300 px-5 py-2 rounded-2xl hover:bg-yellow-400 hover:text-black transition-all">

            Call Us

          </button>

          <button className="bg-yellow-400 text-black px-5 py-2 rounded-2xl font-semibold hover:scale-105 transition-all">

            Secure Booking

          </button>

        </div>

      </div>

    </header>
  );
}