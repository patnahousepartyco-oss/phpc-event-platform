interface Props {
}: Props) {

  return (

    <button

      onClick={onClick}

      disabled={disabled}

      className={`

        px-6
        py-3
        rounded-[18px]
        font-semibold
        transition-all

        ${
          variant === "primary"

            ?

            "bg-[#5C0A18] text-white hover:bg-[#7A1023]"

            :

            "bg-white border border-[#E8D8C7] text-[#5C0A18]"
        }

        ${
          disabled

            ?

            "opacity-50 cursor-not-allowed"

            :

            "hover:scale-[1.02]"
        }
      `}

    >
      {children}
    </button>
  );
}