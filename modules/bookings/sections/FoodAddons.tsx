// modules/bookings/sections/FoodAddons.tsx

"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {

  ChevronDown,

  Check,

  Plus,

  Minus,

} from "lucide-react";

/*
========================================
STORE
========================================
*/

import {

  useBookingAddons,

  useAddAddon,

  useRemoveAddon,

  useUpdateAddonQuantity,

} from "@/state/booking/bookingSelectors";

/*
========================================
PROPS
========================================
*/

interface Props {

  foodAddons: any[];

  addonMappings: any[];

  operationalContext: any;
}

/*
========================================
COMPONENT
========================================
*/

export default function FoodAddons({

  foodAddons,

  addonMappings,

  operationalContext,

}: Props) {

  /*
  ========================================
  STORE
  ========================================
  */

  const bookingAddons =
    useBookingAddons();

  const addAddon =
    useAddAddon();

  const removeAddon =
    useRemoveAddon();

  const updateAddonQuantity =
    useUpdateAddonQuantity();

  /*
  ========================================
  LOCAL STATE
  ========================================
  */

  const [

    expandedAddon,

    setExpandedAddon,

  ] = useState<string>("");

  const [

    configurations,

    setConfigurations,

  ] = useState<any>({});

  /*
  ========================================
  OPERATIONAL CONTEXT
  ========================================
  */

  const recommendedSlab =

    operationalContext
      ?.activeBasePlan || 10;

  /*
  ========================================
  MERGED ADDONS
  ========================================
  */

  const mergedAddons =
    useMemo(() => {

      return (addonMappings || [])

        .map(

          (mapping: any) => {

            const addon =

              foodAddons.find(

                (item: any) =>

                  String(
                    item.food_id
                  )

                  ===

                  String(
                    mapping.food_id
                  )

              );

            if (!addon)
              return null;

            return {

              ...addon,

              ...mapping,
            };
          }

        )

        .filter(Boolean);

    }, [

      addonMappings,

      foodAddons,

    ]);

  /*
  ========================================
  GROUPED
  ========================================
  */

  const groupedAddons =
    useMemo(() => {

      return mergedAddons.reduce(

        (
          acc: any,
          addon: any
        ) => {

          const category =

            addon.addon_category ||

            "Food Addons";

          if (
            !acc[category]
          ) {

            acc[category] = [];
          }

          acc[category].push(
            addon
          );

          return acc;

        },

        {}

      );

    }, [mergedAddons]);

  /*
  ========================================
  CONFIG HELPERS
  ========================================
  */

  function updateConfiguration(

    foodId: string,

    updates: any

  ) {

    setConfigurations(

      (prev: any) => ({

        ...prev,

        [foodId]: {

          ...prev[foodId],

          ...updates,
        },
      })

    );
  }

  /*
  ========================================
  PRICE HELPERS
  ========================================
  */

  function getLotPrice(
    addon: any
  ) {

    if (
      recommendedSlab <= 10
    ) {

      return Number(
        addon.lot_10_price ||

        addon.customerPriceFullLot ||

        0
      );
    }

    if (
      recommendedSlab <= 20
    ) {

      return Number(
        addon.lot_20_price ||

        addon.customerPriceFullLot ||

        0
      );
    }

    return Number(
      addon.lot_30_price ||

      addon.customerPriceFullLot ||

      0
    );
  }

  /*
  ========================================
  LIVE TOTAL
  ========================================
  */

  function calculateLiveTotal(
    addon: any
  ) {

    const config =

      configurations[
        addon.food_id
      ] || {};

    const fullLotPrice =

      config.fullLot

        ?

        getLotPrice(addon)

        :

        0;

    const extraPlatePrice =

      Number(
        addon.per_plate_price ||

        addon.customerPricePerPlate ||

        0
      );

    const extraPlateTotal =

      extraPlatePrice *

      Number(
        config.extraPlates || 0
      );

    return (

      fullLotPrice +

      extraPlateTotal

    );
  }

  /*
  ========================================
  ADD FOOD
  ========================================
  */

  function addFoodAddon(
    addon: any
  ) {

    const total =

      calculateLiveTotal(
        addon
      );

    if (total <= 0)
      return;

    addAddon({

      id:
        String(
          addon.food_id
        ),

      name:

        addon.food_name ||

        addon.addon_name ||

        "Food Addon",

      category:
        "food",

      quantity: 1,

      unitPrice:
        total,

      totalPrice:
        total,

      rawAddon: {

        ...addon,

        configuration:

          configurations[
            addon.food_id
          ],
      },
    });

    setExpandedAddon("");
  }

  /*
  ========================================
  REMOVE
  ========================================
  */

  function removeFoodAddon(
    addonId: string
  ) {

    removeAddon(
      String(addonId)
    );
  }

  /*
  ========================================
  UPDATE QUANTITY
  ========================================
  */

  function updateQuantity(

    addon: any,

    quantity: number

  ) {

    if (
      quantity < 1
    ) {

      removeFoodAddon(
        addon.food_id
      );

      return;
    }

    updateAddonQuantity(

      String(
        addon.food_id
      ),

      quantity

    );
  }

  /*
  ========================================
  UI
  ========================================
  */

  return (

    <div className="bg-white border border-[#E8D8C7] rounded-[24px] lg:rounded-[32px] p-4 lg:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <p className="uppercase tracking-[3px] text-[10px] lg:text-xs font-semibold text-[#B68B5C]">

            Curated Culinary Enhancements

          </p>

          <h2 className="text-2xl lg:text-3xl font-bold text-[#5C0A18] mt-2 lg:mt-3 leading-tight">

            Premium Food Addons

          </h2>

        </div>

        <div className="bg-[#FAF6F1] px-4 py-3 rounded-2xl border border-[#E7D7C6] w-fit">

          <p className="text-xs lg:text-sm text-gray-500">

            Optimized For

          </p>

          <p className="text-lg lg:text-xl font-bold text-[#5C0A18]">

            {recommendedSlab} Guests

          </p>

        </div>

      </div>

      {/* GROUPS */}

      <div className="space-y-8 lg:space-y-12 mt-8 lg:mt-10">

        {Object.entries(
          groupedAddons
        ).map(

          ([group, addons]:
            any) => (

            <div
              key={group}
            >

              <div className="flex items-center gap-3 mb-4 lg:mb-5">

                <div className="h-[1px] flex-1 bg-[#E8D8C7]" />

                <p className="text-[10px] lg:text-sm tracking-[2px] lg:tracking-[3px] uppercase text-[#A67C52] font-semibold text-center">

                  {group}

                </p>

                <div className="h-[1px] flex-1 bg-[#E8D8C7]" />

              </div>

              <div className="space-y-4">

                {addons.map(
                  (
                    addon: any
                  ) => {

                    const selectedAddon =

                      bookingAddons.find(

                        (item: any) =>

                          String(item.id)

                          ===

                          String(
                            addon.food_id
                          )

                      );

                    const isSelected =
                      !!selectedAddon;

                    const expanded =

                      expandedAddon ===

                      String(
                        addon.food_id
                      );

                    const config =

                      configurations[
                        addon.food_id
                      ] || {};

                    const liveTotal =

                      calculateLiveTotal(
                        addon
                      );

                    return (

                      <motion.div

                        layout

                        key={
                          addon.food_id
                        }

                        className={`

                          rounded-[22px]
                          lg:rounded-[28px]
                          border
                          overflow-hidden
                          transition-all

                          ${
                            isSelected

                              ?

                              "bg-[#5C0A18] border-[#5C0A18]"

                              :

                              "bg-[#FBF9F6] border-[#E9DCCF]"

                          }

                        `}
                      >

                        {/* TOP */}

                        <div className="p-4 lg:p-7">

                          <div className="flex items-start justify-between gap-3 lg:gap-6">

                            {/* LEFT */}

                            <div className="flex-1 min-w-0">

                              <div className="flex items-start gap-2">

                                <h3 className={`

                                  text-xl
                                  lg:text-2xl
                                  leading-tight
                                  font-bold
                                  break-words

                                  ${
                                    isSelected

                                      ?

                                      "text-white"

                                      :

                                      "text-[#5C0A18]"

                                  }

                                `}>

                                  {

                                    addon.food_name ||

                                    addon.addon_name

                                  }

                                </h3>

                                {isSelected && (

                                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">

                                    <Check
                                      size={14}
                                      className="text-[#5C0A18]"
                                    />

                                  </div>

                                )}

                              </div>

                              <p className={`

                                mt-2
                                text-sm
                                lg:text-base
                                leading-6

                                ${
                                  isSelected

                                    ?

                                    "text-white/70"

                                    :

                                    "text-gray-500"

                                }

                              `}>

                                {
                                  addon.description
                                }

                              </p>

                              <div className="grid grid-cols-2 gap-4 mt-5">

                                <div>

                                  <p className={`

                                    text-[10px]
                                    uppercase
                                    tracking-[2px]

                                    ${
                                      isSelected

                                        ?

                                        "text-white/50"

                                        :

                                        "text-gray-400"

                                    }

                                  `}>

                                    Full Lot

                                  </p>

                                  <p className={`

                                    text-2xl
                                    lg:text-3xl
                                    font-bold
                                    mt-1

                                    ${
                                      isSelected

                                        ?

                                        "text-white"

                                        :

                                        "text-[#5C0A18]"

                                    }

                                  `}>

                                    ₹
                                    {
                                      getLotPrice(
                                        addon
                                      )
                                    }

                                  </p>

                                </div>

                                <div>

                                  <p className={`

                                    text-[10px]
                                    uppercase
                                    tracking-[2px]

                                    ${
                                      isSelected

                                        ?

                                        "text-white/50"

                                        :

                                        "text-gray-400"

                                    }

                                  `}>

                                    Extra Plate

                                  </p>

                                  <p className={`

                                    text-2xl
                                    lg:text-3xl
                                    font-bold
                                    mt-1

                                    ${
                                      isSelected

                                        ?

                                        "text-white"

                                        :

                                        "text-[#5C0A18]"

                                    }

                                  `}>

                                    ₹
                                    {

                                      addon.per_plate_price ||

                                      addon.customerPricePerPlate ||

                                      0

                                    }

                                  </p>

                                </div>

                              </div>

                            </div>

                            {/* ACTION */}

                            {!isSelected ? (

                              <button

                                onClick={() =>

                                  setExpandedAddon(

                                    expanded

                                      ?

                                      ""

                                      :

                                      String(
                                        addon.food_id
                                      )

                                  )

                                }

                                className="
                                  shrink-0
                                  bg-[#5C0A18]
                                  text-white
                                  px-4
                                  lg:px-6
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  lg:text-base
                                  max-w-[120px]
                                  justify-center
                                "

                              >

                                <span className="hidden sm:inline">

                                  Customize

                                </span>

                                <span className="sm:hidden">

                                  Add

                                </span>

                                <ChevronDown
                                  size={16}
                                  className={`transition-transform shrink-0 ${expanded ? "rotate-180" : ""}`}
                                />

                              </button>

                            ) : (

                              <div className="flex flex-col items-end gap-3 shrink-0">

                                <button

                                  onClick={() =>

                                    removeFoodAddon(
                                      addon.food_id
                                    )

                                  }

                                  className="
                                    bg-white
                                    text-[#5C0A18]
                                    px-4
                                    py-2
                                    rounded-xl
                                    font-semibold
                                    text-sm
                                  "

                                >

                                  Remove

                                </button>

                                <div className="flex items-center gap-2">

                                  <button

                                    onClick={() =>

                                      updateQuantity(

                                        addon,

                                        selectedAddon.quantity - 1

                                      )

                                    }

                                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white"

                                  >

                                    <Minus size={14} />

                                  </button>

                                  <span className="text-white font-bold text-base w-6 text-center">

                                    {
                                      selectedAddon.quantity
                                    }

                                  </span>

                                  <button

                                    onClick={() =>

                                      updateQuantity(

                                        addon,

                                        selectedAddon.quantity + 1

                                      )

                                    }

                                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white"

                                  >

                                    <Plus size={14} />

                                  </button>

                                </div>

                              </div>

                            )}

                          </div>

                          {/* EXPAND */}

                          <AnimatePresence>

                            {expanded && !isSelected && (

                              <motion.div

                                initial={{
                                  opacity: 0,
                                  height: 0,
                                }}

                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                }}

                                exit={{
                                  opacity: 0,
                                  height: 0,
                                }}

                                className="overflow-hidden"

                              >

                                <div className="mt-6 pt-6 border-t border-[#E8D8C7] space-y-4">

                                  {/* FULL LOT */}

                                  <label className="flex items-center justify-between gap-4 bg-white border border-[#E8D8C7] rounded-2xl px-4 py-4">

                                    <div className="min-w-0">

                                      <p className="font-semibold text-[#5C0A18] text-sm lg:text-base">

                                        Full Serving Lot

                                      </p>

                                      <p className="text-xs lg:text-sm text-gray-500 mt-1 leading-5">

                                        Recommended for {recommendedSlab} guests

                                      </p>

                                    </div>

                                    <input

                                      type="checkbox"

                                      checked={
                                        config.fullLot || false
                                      }

                                      onChange={(e) =>

                                        updateConfiguration(

                                          String(
                                            addon.food_id
                                          ),

                                          {
                                            fullLot:
                                              e.target.checked,
                                          }

                                        )

                                      }

                                      className="w-5 h-5 shrink-0"

                                    />

                                  </label>

                                  {/* EXTRA PLATES */}

                                  <div className="bg-white border border-[#E8D8C7] rounded-2xl p-4">

                                    <div className="flex items-center justify-between gap-4">

                                      <div className="min-w-0">

                                        <p className="font-semibold text-[#5C0A18] text-sm lg:text-base">

                                          Additional Plates

                                        </p>

                                        <p className="text-xs lg:text-sm text-gray-500 mt-1 leading-5">

                                          Add extra servings individually

                                        </p>

                                      </div>

                                      <div className="flex items-center gap-2 shrink-0">

                                        <button

                                          onClick={() =>

                                            updateConfiguration(

                                              String(
                                                addon.food_id
                                              ),

                                              {
                                                extraPlates:

                                                  Math.max(

                                                    Number(
                                                      config.extraPlates || 0
                                                    ) - 1,

                                                    0

                                                  ),
                                              }

                                            )

                                          }

                                          className="w-9 h-9 rounded-full border border-[#E8D8C7]"

                                        >

                                          -

                                        </button>

                                        <div className="w-10 text-center font-bold text-base">

                                          {
                                            config.extraPlates || 0
                                          }

                                        </div>

                                        <button

                                          onClick={() =>

                                            updateConfiguration(

                                              String(
                                                addon.food_id
                                              ),

                                              {
                                                extraPlates:

                                                  Number(
                                                    config.extraPlates || 0
                                                  ) + 1,
                                              }

                                            )

                                          }

                                          className="w-9 h-9 rounded-full border border-[#E8D8C7]"

                                        >

                                          +

                                        </button>

                                      </div>

                                    </div>

                                  </div>

                                  {/* LIVE TOTAL */}

                                  <div className="bg-[#5C0A18] rounded-2xl p-5 text-white">

                                    <div className="flex flex-col gap-5">

                                      <div>

                                        <p className="text-white/70 text-sm">

                                          Estimated Addon Total

                                        </p>

                                        <h3 className="text-3xl lg:text-4xl font-bold mt-2">

                                          ₹
                                          {liveTotal}

                                        </h3>

                                      </div>

                                      <button

                                        onClick={() =>
                                          addFoodAddon(
                                            addon
                                          )
                                        }

                                        disabled={
                                          liveTotal <= 0
                                        }

                                        className={`

                                          w-full
                                          py-4
                                          rounded-2xl
                                          font-semibold
                                          text-sm
                                          lg:text-base

                                          ${
                                            liveTotal > 0

                                              ?

                                              "bg-white text-[#5C0A18]"

                                              :

                                              "bg-white/20 text-white/50"

                                          }

                                        `}

                                      >

                                        Add To Event

                                      </button>

                                    </div>

                                  </div>

                                </div>

                              </motion.div>

                            )}

                          </AnimatePresence>

                        </div>

                      </motion.div>

                    );
                  }
                )}

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );
}