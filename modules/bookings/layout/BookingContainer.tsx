interface Props {
  children: React.ReactNode;
}

export default function BookingContainer({
  children,
}: Props) {

  return (

    <main className="min-h-screen bg-[#F8F5F2] px-6 lg:px-10 py-10">

      <div className="max-w-7xl mx-auto">

        {children}

      </div>

    </main>
  );
}