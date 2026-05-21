interface Props {
  title: string;
  subtitle?: string;
}

export default function BookingHeader({
  title,
  subtitle,
}: Props) {

  return (

    <div>

      <p className="uppercase tracking-[4px] text-sm text-[#A67C52] font-semibold">

        Luxury Event Booking

      </p>

      <h1 className="text-5xl font-bold text-[#5C0A18] mt-4 leading-tight">

        {title}

      </h1>

      {subtitle && (

        <p className="text-xl text-gray-600 mt-5 leading-9 max-w-3xl">

          {subtitle}

        </p>

      )}

    </div>
  );
}