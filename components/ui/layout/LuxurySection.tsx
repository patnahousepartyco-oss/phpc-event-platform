// components/ui/layout/LuxurySection.tsx

interface Props {

  children: React.ReactNode;

  className?: string;
}

export default function LuxurySection({

  children,

  className = "",

}: Props) {

  return (

    <section

      className={`

        rounded-[32px]
        border
        border-[#E8D8C7]
        p-8
        shadow-[0_10px_40px_rgba(0,0,0,0.04)]

        ${className}

      `}

    >

      {children}

    </section>

  );
}