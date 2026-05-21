interface Props {

  guestCount: number;

  selectedPackage: any;

  pricing: any;

  addons?: any[];
}

export default function PricingSummary({

  guestCount,

  selectedPackage,

  pricing,

  addons = [],

}: Props) {

  /*
  ========================================
  FORMATTER
  ========================================
  */

  const formatPrice = (
    value: number
  ) => {

    return Math.round(
      Number(value || 0)
    ).toLocaleString("en-IN");
  };

  /*
  ========================================
  NORMALIZED VALUES
  ========================================
  */

  const baseAmount =

    Number(

      pricing?.baseAmount ||

      pricing?.base_price ||

      0

    );

  const foodAmount =

    Number(

      pricing?.foodAmount ||

      pricing?.food_amount ||

      0

    );

  const comboAmount =

    Number(

      pricing?.comboAmount ||

      pricing?.combo_amount ||

      0

    );

  const serviceAmount =

    Number(

      pricing?.serviceAmount ||

      pricing?.service_amount ||

      0

    );

  const extraGuestAmount =

    Number(

      pricing?.extraGuestAmount ||

      pricing?.extra_guest_amount ||

      0

    );

  const subtotal =

    Number(

      pricing?.subtotal ||

      pricing?.sub_total ||

      0

    );

  const taxAmount =

    Number(

      pricing?.taxAmount ||

      pricing?.tax_amount ||

      0

    );

  const grandTotal =

    Number(

      pricing?.grandTotal ||

      pricing?.grand_total ||

      0

    );

  /*
  ========================================
  OPERATIONAL VALUES
  ========================================
  */

  const includedGuests =

    Number(
      selectedPackage?.includedGuests || 0
    );

  const extraGuests =

    guestCount > includedGuests

      ?

      guestCount - includedGuests

      :

      0;

  const extraGuestPrice =

    Number(

      selectedPackage?.additionalPlateCost ||

      0

    );

  /*
  ========================================
  FOOD TYPE
  ========================================
  */

  const foodType =

    String(

      selectedPackage?.foodType ||

      ""

    ).toLowerCase();

  /*
  ========================================
  TOTAL PACKAGE
  ========================================
  */

  const totalPackageCost =

    baseAmount +

    extraGuestAmount;

  /*
  ========================================
  ADDON FILTERS
  ========================================
  */

  const foodAddons =

    addons.filter(

      (addon: any) =>

        addon.category ===
        "food"

    );

  const serviceAddons =

    addons.filter(

      (addon: any) =>

        addon.category ===
        "service"

    );

  const comboAddons =

    addons.filter(

      (addon: any) =>

        addon.category ===
        "combo"

    );

  /*
  ========================================
  RESOLVE ADDON PRICE
  ========================================
  */

  function resolveAddonPrice(
    addon: any
  ) {

    return (

      addon.total ||

      addon.totalPrice ||

      addon.finalPrice ||

      addon.addon_price ||

      addon.selling_price ||

      addon.price ||

      0

    );
  }

  /*
  ========================================
  RENDER ADDON SECTION
  ========================================
  */

  function renderAddonSection({

    title,

    subtitle,

    amount,

    items,

  }: any) {

    if (

      amount <= 0 ||

      items.length === 0

    ) {

      return null;
    }

    return (

      <div
        className="
          bg-white/[0.04]

          border
          border-white/10

          rounded-[28px]

          p-7
        "
      >

        {/* HEADER */}

        <div className="flex items-start justify-between gap-6">

          <div>

            <p
              className="
                uppercase
                tracking-[4px]
                text-[11px]
                text-[#FFD84D]
                font-semibold
              "
            >

              {title}

            </p>

            <p className="text-white/50 mt-3 leading-7">

              {subtitle}

            </p>

          </div>

          <p
            className="
              text-3xl
              font-black
              text-white
            "
          >

            ₹{formatPrice(amount)}

          </p>

        </div>

        {/* ITEMS */}

        <div className="space-y-4 mt-8">

          {

            items.map(

              (
                addon: any,
                index: number
              ) => (

                <div

                  key={index}

                  className="
                    bg-black/10

                    border
                    border-white/5

                    rounded-2xl

                    px-5
                    py-4

                    flex
                    items-center
                    justify-between
                    gap-5
                  "
                >

                  <div>

                    <p className="text-white font-semibold text-lg">

                      {

                        addon.name ||

                        addon.addon_name ||

                        "Addon"

                      }

                    </p>

                    {

                      addon.quantity && (

                        <p className="text-white/40 text-sm mt-1">

                          Quantity:
                          {" "}
                          {addon.quantity}

                        </p>

                      )

                    }

                  </div>

                  <p
                    className="
                      text-xl
                      font-bold
                      text-[#FFD84D]
                    "
                  >

                    ₹

                    {

                      formatPrice(

                        resolveAddonPrice(addon)

                      )

                    }

                  </p>

                </div>

              )

            )

          }

        </div>

      </div>

    );
  }

  /*
  ========================================
  RENDER
  ========================================
  */

  return (

    <div
      className="
        bg-gradient-to-b
        from-[#7A0019]
        to-[#5C0012]

        rounded-[36px]

        border
        border-[#A67C52]/20

        overflow-hidden

        shadow-[0_30px_80px_rgba(0,0,0,0.18)]
      "
    >

      {/* HEADER */}

      <div className="px-8 lg:px-10 pt-8 lg:pt-10">

        <p
          className="
            uppercase
            tracking-[5px]
            text-[11px]
            text-[#FFD84D]
            font-semibold
          "
        >

          Celebration Summary

        </p>

        <div className="flex items-center gap-4 mt-5 flex-wrap">

          <h2
            className="
              text-3xl
              lg:text-4xl
              font-bold
              text-white
              leading-tight
            "
          >

            {

              selectedPackage?.name ||

              "Celebration Experience"

            }

          </h2>

          {

            foodType && (

              <div
                className="
                  px-4
                  py-2

                  rounded-full

                  bg-white/10

                  border
                  border-white/10

                  flex
                  items-center
                  gap-2
                "
              >

                <div
                  className={`
                    w-3
                    h-3
                    rounded-full

                    ${
                      foodType.includes("non")

                        ?

                        "bg-red-500"

                        :

                        "bg-green-500"
                    }
                  `}
                />

                <p
                  className="
                    text-sm
                    font-semibold
                    text-white
                  "
                >

                  {

                    foodType.includes("non")

                      ?

                      "Non-Veg"

                      :

                      "Veg"

                  }

                </p>

              </div>

            )

          }

        </div>

      </div>

      {/* BODY */}

      <div
        className="
          mt-10

          bg-white/[0.03]

          border-t
          border-white/10

          px-8
          lg:px-10
          py-10

          space-y-8
        "
      >

        {/* PACKAGE */}

        <div
          className="
            bg-white/[0.04]

            border
            border-white/10

            rounded-[28px]

            p-7
          "
        >

          {/* HEADER */}

          <div className="flex items-start justify-between gap-6">

            <div>

              <p
                className="
                  uppercase
                  tracking-[4px]
                  text-[11px]
                  text-[#FFD84D]
                  font-semibold
                "
              >

                Package Configuration

              </p>

              <p className="text-white/50 mt-3 leading-7">

                Base package pricing including operational guest allocation.

              </p>

            </div>

            <p
              className="
                text-3xl
                font-black
                text-white
              "
            >

              ₹{formatPrice(totalPackageCost)}

            </p>

          </div>

          {/* ITEMS */}

          <div className="space-y-4 mt-8">

            {/* BASE PACKAGE */}

            <div

              className="
                bg-black/10

                border
                border-white/5

                rounded-2xl

                px-5
                py-4

                flex
                items-center
                justify-between
                gap-5
              "

            >

              <div>

                <p className="text-white font-semibold text-lg">

                  Base Package

                </p>

                <p className="text-white/40 text-sm mt-1">

                  {includedGuests} Pax included

                </p>

              </div>

              <p
                className="
                  text-xl
                  font-bold
                  text-[#FFD84D]
                "
              >

                ₹{formatPrice(baseAmount)}

              </p>

            </div>

            {/* EXTRA GUESTS */}

            {

              extraGuests > 0 && (

                <div

                  className="
                    bg-black/10

                    border
                    border-white/5

                    rounded-2xl

                    px-5
                    py-4

                    flex
                    items-center
                    justify-between
                    gap-5
                  "

                >

                  <div>

                    <p className="text-white font-semibold text-lg">

                      +{extraGuests} Additional Guests

                    </p>

                    <p className="text-white/40 text-sm mt-1">

                      ₹

                      {

                        formatPrice(

                          extraGuestPrice

                        )

                      }

                      {" "}

                      per extra guest

                    </p>

                  </div>

                  <p
                    className="
                      text-xl
                      font-bold
                      text-[#FFD84D]
                    "
                  >

                    ₹{formatPrice(extraGuestAmount)}

                  </p>

                </div>

              )

            }

          </div>

        </div>

        {renderAddonSection({
          title: "Food Addons",
          subtitle: "Additional culinary selections.",
          amount: foodAmount,
          items: foodAddons,
        })}

        {renderAddonSection({
          title: "Service Addons",
          subtitle: "Experience enhancements and execution services.",
          amount: serviceAmount,
          items: serviceAddons,
        })}

        {renderAddonSection({
          title: "Combo Experiences",
          subtitle: "Curated celebration bundles.",
          amount: comboAmount,
          items: comboAddons,
        })}

        {/* BILLING */}

        <div
          className="
            bg-black/20

            rounded-[28px]

            border
            border-white/10

            p-7
          "
        >

          <div className="space-y-5">

            <div className="flex items-center justify-between">

              <p className="text-white/70">

                Subtotal

              </p>

              <p className="text-2xl font-bold text-white">

                ₹{formatPrice(subtotal)}

              </p>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-white/70">

                GST (18%)

              </p>

              <p className="text-2xl font-bold text-white">

                ₹{formatPrice(taxAmount)}

              </p>

            </div>

          </div>

          <div className="border-t border-white/10 mt-8 pt-8">

            <div className="flex items-end justify-between gap-6 flex-wrap">

              <div>

                <p className="text-white/50 uppercase tracking-[3px] text-xs">

                  Estimated Total

                </p>

              </div>

              <p
                className="
                  text-5xl
                  lg:text-6xl
                  font-black
                  text-[#FFD84D]
                  leading-none
                "
              >

                ₹{formatPrice(grandTotal)}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}