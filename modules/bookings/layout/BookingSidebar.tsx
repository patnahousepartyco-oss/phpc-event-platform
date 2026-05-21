interface Props {
  children: React.ReactNode;
}

export default function BookingSidebar({
  children,
}: Props) {

  return (

    <div className="xl:sticky xl:top-8 self-start">

      {children}

    </div>
  );
}