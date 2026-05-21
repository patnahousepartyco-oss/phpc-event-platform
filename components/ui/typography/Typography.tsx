// components/ui/typography/Typography.tsx

/*
========================================
PROPS
========================================
*/

interface TypographyProps {

  children: React.ReactNode;

  className?: string;
}

/*
========================================
HERO TITLE
========================================
*/

export function HeroTitle({

  children,

  className = "",

}: TypographyProps) {

  return (

    <h1

      className={`

        text-5xl
        xl:text-6xl
        font-bold
        leading-tight
        text-[#5C0A18]

        ${className}

      `}

    >

      {children}

    </h1>

  );
}

/*
========================================
SECTION TITLE
========================================
*/

export function SectionTitle({

  children,

  className = "",

}: TypographyProps) {

  return (

    <h2

      className={`

        text-3xl
        font-bold
        text-[#5C0A18]

        ${className}

      `}

    >

      {children}

    </h2>

  );
}

/*
========================================
CARD TITLE
========================================
*/

export function CardTitle({

  children,

  className = "",

}: TypographyProps) {

  return (

    <h3

      className={`

        text-2xl
        font-bold
        text-[#5C0A18]

        ${className}

      `}

    >

      {children}

    </h3>

  );
}

/*
========================================
LABEL
========================================
*/

export function LuxuryLabel({

  children,

  className = "",

}: TypographyProps) {

  return (

    <p

      className={`

        uppercase
        tracking-[4px]
        text-xs
        font-semibold
        text-[#B68B5C]

        ${className}

      `}

    >

      {children}

    </p>

  );
}

/*
========================================
BODY TEXT
========================================
*/

export function BodyText({

  children,

  className = "",

}: TypographyProps) {

  return (

    <p

      className={`

        text-base
        leading-7
        text-gray-600

        ${className}

      `}

    >

      {children}

    </p>

  );
}

/*
========================================
PRICE TEXT
========================================
*/

export function PriceText({

  children,

  className = "",

}: TypographyProps) {

  return (

    <p

      className={`

        text-4xl
        font-bold
        text-[#5C0A18]

        ${className}

      `}

    >

      {children}

    </p>

  );
}