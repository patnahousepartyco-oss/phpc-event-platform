interface Props {

  children: React.ReactNode;

  selected?: boolean;
}

export default function LuxuryCard({

  children,

  selected,

}: Props) {

  return (

    <div

      className={`

        rounded-[28px]
        border
        p-6
        transition-all

        ${
          selected

            ?

            "bg-[#5C0A18] border-[#5C0A18] text-white"

            :

            "bg-[#FBF9F6] border-[#E8D8C7]"
        }
      `}

    >
      {children}
    </div>
  );
}