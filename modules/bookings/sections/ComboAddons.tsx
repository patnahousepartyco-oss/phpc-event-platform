// modules/bookings/sections/ComboAddons.tsx

"use client";

import {

  resolveFoodAddonPrice,

} from "@/engines/combo-engine/resolveFoodAddonPrice";

import {
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Sparkles,
  Search,
  Plus,
  Minus,
  Check,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";

import {
  calculateComboTotal,
} from "@/engines/combo-engine/calculateComboTotal";

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

  combos: any[];

  foodAddons?: any[];

  serviceAddons?: any[];

  addonMappings?: any[];
}

/*
========================================
COMPONENT
========================================
*/

export default function ComboAddons({

  combos,

  foodAddons = [],

  serviceAddons = [],

  addonMappings = [],

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
  CUSTOM BUILDER
  ========================================
  */

  const [

    showCustomBuilder,

    setShowCustomBuilder,

  ] = useState(false);

  const [

    foodSearch,

    setFoodSearch,

  ] = useState("");

  const [

    serviceSearch,

    setServiceSearch,

  ] = useState("");

  const [

    customFood,

    setCustomFood,

  ] = useState<any>(null);

  const [

    customServices,

    setCustomServices,

  ] = useState<any[]>([]);

  const [

    editingComboId,

    setEditingComboId,

  ] = useState<string | null>(null);

  /*
  ========================================
  MOBILE EXPANSION
  ========================================
  */

  const [

    expandedCombo,

    setExpandedCombo,

  ] = useState<string>("");

  /*
  ========================================
  SAFE SERVICE KEY
  ========================================
  */

  function getServiceKey(
    service: any
  ) {

    return String(

      service.service_id ||

      service.service_name ||

      service.addon_name ||

      service.name ||

      Math.random()

    );
  }

  /*
  ========================================
  ACTIVE COMBOS
  ========================================
  */

  const activeCombos =
    useMemo(() => {

      return (combos || [])

        .filter(

          (combo: any) =>

            String(
              combo.is_active
            ).toLowerCase() ===
            "true"

        )

        .sort(

          (
            a: any,
            b: any
          ) =>

            Number(
              b.combo_score || 0
            )

            -

            Number(
              a.combo_score || 0
            )

        );

    }, [combos]);

  /*
  ========================================
  FILTER FOOD
  ========================================
  */

  const filteredFoodAddons =
    useMemo(() => {

      return (foodAddons || [])

        .filter(

          (item: any) => {

            const foodName =

              String(

                item.food_name ||

                item.addon_name ||

                ""

              )

              .toLowerCase();

            return foodName.includes(

              foodSearch.toLowerCase()

            );
          }

        );

    }, [

      foodAddons,

      foodSearch,

    ]);

  /*
  ========================================
  FILTER SERVICES
  ========================================
  */

  const filteredServiceAddons =
    useMemo(() => {

      return (serviceAddons || [])

        .filter(

          (item: any) =>

            String(
              item.is_active
            ).toUpperCase()

            ===

            "TRUE"

        )

        .filter(

          (item: any) =>

            item.service_id &&

            item.service_name &&

            Number(
              item.selling_price
            ) > 0

        )

        .filter(

          (item: any) => {

            const serviceName =

              String(
                item.service_name
              )

              .toLowerCase();

            return serviceName.includes(

              serviceSearch.toLowerCase()

            );
          }

        )

        .sort(

          (
            a: any,
            b: any
          ) =>

            Number(
              a.display_order || 0
            )

            -

            Number(
              b.display_order || 0
            )

        );

    }, [

      serviceAddons,

      serviceSearch,

    ]);

  /*
  ========================================
  SELECTED COMBOS
  ========================================
  */

  const selectedCombos =
    useMemo(() => {

      return bookingAddons.filter(

        (addon: any) =>

          addon.category ===
          "combo"

      );

    }, [bookingAddons]);

  /*
  ========================================
  CUSTOM COMBOS
  ========================================
  */

  const customCombos =
    useMemo(() => {

      return selectedCombos.filter(

        (combo: any) =>

          combo.comboType ===
          "custom"

      );

    }, [selectedCombos]);

  /*
  ========================================
  CUSTOM TOTAL
  ========================================
  */

  const customComboTotal =
    useMemo(() => {

      const foodTotal =

        customFood

          ?

          resolveFoodAddonPrice(

            customFood,

            addonMappings

          )

          :

          0;

      const serviceTotal =

        customServices.reduce(

          (
            sum: number,
            item: any
          ) =>

            sum +

            Number(

              item.selling_price ||

              item.price ||

              item.amount ||

              0

            ),

          0

        );

      return (
        foodTotal +
        serviceTotal
      );

    }, [

      customFood,

      customServices,

    ]);

  /*
  ========================================
  STATIC COMBO
  ========================================
  */

  function addCombo(
    combo: any
  ) {

    const pricing =

      calculateComboTotal(
        combo
      );

    addAddon({

      id:
        String(
          combo.combo_id
        ),

      name:
        combo.combo_name,

      category:
        "combo",

      comboType:
        "static",

      quantity: 1,

      unitPrice:
        pricing.comboPrice,

      totalPrice:
        pricing.comboPrice,

      regularTotal:
        pricing.regularTotal,

      savings:
        pricing.savings,

      rawCombo:
        combo,
    });
  }

  /*
  ========================================
  REMOVE
  ========================================
  */

  function removeCombo(
    comboId: string
  ) {

    removeAddon(comboId);
  }

  /*
  ========================================
  QUANTITY
  ========================================
  */

  function updateQuantity(

    combo: any,

    quantity: number

  ) {

    if (
      quantity < 1
    ) {

      removeCombo(
        combo.combo_id
      );

      return;
    }

    updateAddonQuantity(

      String(
        combo.combo_id
      ),

      quantity

    );
  }

  /*
  ========================================
  TOGGLE SERVICE
  ========================================
  */

  function toggleService(
    service: any
  ) {

    const serviceKey =
      getServiceKey(service);

    const exists =

      customServices.find(

        (item: any) =>

          getServiceKey(item)

          ===

          serviceKey

      );

    if (exists) {

      setCustomServices(

        customServices.filter(

          (item: any) =>

            getServiceKey(item)

            !==

            serviceKey

        )

      );

      return;
    }

    if (
      customServices.length >= 2
    )
      return;

    setCustomServices([

      ...customServices,

      service,

    ]);
  }

  /*
  ========================================
  RESET
  ========================================
  */

  function resetBuilder() {

    setCustomFood(null);

    setCustomServices([]);

    setFoodSearch("");

    setServiceSearch("");

    setEditingComboId(null);

    setShowCustomBuilder(false);
  }

  /*
  ========================================
  ADD CUSTOM COMBO
  ========================================
  */

  function addCustomCombo() {

    if (
      !customFood &&
      customServices.length === 0
    )
      return;

    const comboId =

      editingComboId ||

      `custom-combo-${Date.now()}`;

    if (editingComboId) {

      removeAddon(
        editingComboId
      );
    }

    addAddon({

      id: comboId,

      name:
        "Custom Combo",

      category:
        "combo",

      comboType:
        "custom",

      quantity: 1,

      unitPrice:
        customComboTotal,

      totalPrice:
        customComboTotal,

      customFood,

      customServices,
    });

    resetBuilder();
  }

  /*
  ========================================
  EDIT CUSTOM COMBO
  ========================================
  */

  function editCustomCombo(
    combo: any
  ) {

    setCustomFood(
      combo.customFood
    );

    setCustomServices(
      combo.customServices || []
    );

    setEditingComboId(
      combo.id
    );

    setShowCustomBuilder(true);
  }

  /*
  ========================================
  UI
  ========================================
  */

  return (

    <div className="bg-white rounded-[24px] lg:rounded-[32px] border border-[#E7D7C6] p-4 lg:p-8 shadow-sm overflow-hidden">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

        <div className="flex items-center gap-3 lg:gap-4">

          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-[#F6EFE7] flex items-center justify-center shrink-0">

            <Sparkles
              className="w-6 h-6 text-[#A67C52]"
            />

          </div>

          <div className="min-w-0">

            <p className="uppercase tracking-[3px] text-[10px] lg:text-xs text-[#A67C52] font-semibold">

              Curated Experiences

            </p>

            <h2 className="text-2xl lg:text-3xl font-bold text-[#5C0A18] mt-1 leading-tight">

              Recommended Combos

            </h2>

          </div>

        </div>

        <button

          onClick={() =>

            setShowCustomBuilder(

              !showCustomBuilder

            )

          }

          className="w-full lg:w-auto px-5 py-3 rounded-full border border-[#E7D7C6] bg-[#FAF8F5] text-[#5C0A18] text-sm font-semibold"

        >

          {

            showCustomBuilder

              ?

              "Hide Builder"

              :

              "+ Build Your Own Combo"

          }

        </button>

      </div>

      {/* CUSTOM BUILDER */}

      {showCustomBuilder && (

        <div className="mt-8 rounded-[24px] border border-[#E7D7C6] bg-[#FAF8F5] p-4 lg:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>

              <h3 className="text-2xl lg:text-3xl font-bold text-[#5C0A18]">

                Build Your Own Combo

              </h3>

              <p className="text-sm text-gray-500 mt-2 leading-6">

                Select 1 food item and up to 2 services.

              </p>

            </div>

            <div className="px-5 py-3 rounded-full bg-[#5C0A18] text-white font-semibold w-fit">

              ₹ {customComboTotal}

            </div>

          </div>

          {/* FOOD */}

          <div className="mt-8">

            <p className="text-lg lg:text-xl font-semibold text-[#5C0A18]">

              Select Food Addon

            </p>

            <div className="relative mt-4">

              <Search className="w-4 h-4 absolute left-4 top-4 text-gray-400" />

              <input

                value={foodSearch}

                onChange={(e) =>
                  setFoodSearch(
                    e.target.value
                  )
                }

                placeholder="Search food addons"

                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-[#E7D7C6] bg-white outline-none text-sm"

              />

            </div>

            <div className="grid grid-cols-1 gap-4 mt-5">

              {filteredFoodAddons.map(
                (
                  item: any,
                  index: number
                ) => {

                  const itemKey =

                    item.food_id ||

                    item.food_name ||

                    item.addon_name ||

                    index;

                  const isSelected =

                    customFood?.food_id ===
                    item.food_id;

                  return (

                    <button

                      key={`food-${itemKey}`}

                      onClick={() =>

                        setCustomFood(

                          isSelected

                            ?

                            null

                            :

                            item

                        )

                      }

                      className={`

                        p-4
                        rounded-[22px]
                        border
                        text-left
                        transition-all

                        ${

                          isSelected

                            ?

                            "bg-[#5C0A18] border-[#5C0A18]"

                            :

                            "bg-white border-[#E7D7C6]"

                        }

                      `}

                    >

                      <div className="flex items-center justify-between gap-4">

                        <div className="min-w-0">

                          <p className={`

                            text-lg
                            font-bold
                            leading-tight

                            ${

                              isSelected

                                ?

                                "text-white"

                                :

                                "text-[#5C0A18]"

                            }

                          `}>

                            {

                              item.food_name ||

                              item.addon_name

                            }

                          </p>

                          <p className={`

                            text-xs
                            mt-2

                            ${

                              isSelected

                                ?

                                "text-white/70"

                                :

                                "text-gray-500"

                            }

                          `}>

                            Full Lot Available

                          </p>

                        </div>

                        <div className="text-right shrink-0">

                          <p className={`

                            text-2xl
                            font-bold

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
                              resolveFoodAddonPrice(

                                item,

                                addonMappings

                              )
                            }

                          </p>

                          {isSelected && (

                            <Check className="w-4 h-4 text-white ml-auto mt-2" />

                          )}

                        </div>

                      </div>

                    </button>

                  );
                }
              )}

            </div>

          </div>

          {/* SERVICES */}

          <div className="mt-10">

            <p className="text-lg lg:text-xl font-semibold text-[#5C0A18]">

              Select Services

            </p>

            <p className="text-xs lg:text-sm text-gray-500 mt-2">

              Maximum 2 services allowed

            </p>

            <div className="relative mt-4">

              <Search className="w-4 h-4 absolute left-4 top-4 text-gray-400" />

              <input

                value={serviceSearch}

                onChange={(e) =>
                  setServiceSearch(
                    e.target.value
                  )
                }

                placeholder="Search services"

                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-[#E7D7C6] bg-white outline-none text-sm"

              />

            </div>

            <div className="grid grid-cols-1 gap-4 mt-5">

              {filteredServiceAddons.map(
                (
                  service: any,
                  index: number
                ) => {

                  const isSelected =

                    customServices.find(

                      (item: any) =>

                        getServiceKey(item)

                        ===

                        getServiceKey(service)

                    );

                  return (

                    <button

                      key={`service-${index}-${getServiceKey(service)}`}

                      onClick={() =>
                        toggleService(
                          service
                        )
                      }

                      className={`

                        p-4
                        rounded-[22px]
                        border
                        text-left
                        transition-all

                        ${

                          isSelected

                            ?

                            "bg-[#5C0A18] border-[#5C0A18]"

                            :

                            "bg-white border-[#E7D7C6]"

                        }

                      `}

                    >

                      <div className="flex items-center justify-between gap-4">

                        <div className="min-w-0">

                          <p className={`

                            text-lg
                            font-bold
                            leading-tight

                            ${

                              isSelected

                                ?

                                "text-white"

                                :

                                "text-[#5C0A18]"

                            }

                          `}>

                            {

                              service.service_name ||

                              service.addon_name

                            }

                          </p>

                          <p className={`

                            text-xs
                            mt-2

                            ${

                              isSelected

                                ?

                                "text-white/70"

                                :

                                "text-gray-500"

                            }

                          `}>

                            Premium Experience

                          </p>

                        </div>

                        <div className="text-right shrink-0">

                          <p className={`

                            text-2xl
                            font-bold

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

                              service.selling_price ||

                              service.price ||

                              service.amount ||

                              0

                            }

                          </p>

                          {isSelected && (

                            <Check className="w-4 h-4 text-white ml-auto mt-2" />

                          )}

                        </div>

                      </div>

                    </button>

                  );
                }
              )}

            </div>

          </div>

          {/* CTA */}

          <div className="mt-10 bg-[#5C0A18] rounded-[24px] p-5 text-white">

            <div className="flex flex-col gap-5">

              <div>

                <p className="text-white/70 text-sm">

                  Estimated Combo Total

                </p>

                <p className="text-4xl lg:text-5xl font-bold mt-2">

                  ₹ {customComboTotal}

                </p>

              </div>

              <button

                onClick={
                  addCustomCombo
                }

                className="w-full py-4 rounded-2xl bg-white text-[#5C0A18] font-semibold"

              >

                {

                  editingComboId

                    ?

                    "Update Combo"

                    :

                    "Add Custom Combo"

                }

              </button>

            </div>

          </div>

        </div>

      )}

      {/* STATIC COMBOS */}

      <div className="space-y-4 lg:space-y-6 mt-8">

        {activeCombos.map(
          (combo: any) => {

            const selectedCombo =

              selectedCombos.find(

                (item: any) =>

                  String(item.id)

                  ===

                  String(
                    combo.combo_id
                  )

              );

            const isSelected =
              !!selectedCombo;

            const pricing =

              calculateComboTotal(
                combo
              );

            const expanded =
              expandedCombo ===
              String(combo.combo_id);

            return (

              <div

                key={
                  combo.combo_id
                }

                className={`

                  rounded-[24px]
                  lg:rounded-[32px]
                  border
                  overflow-hidden
                  transition-all

                  ${

                    isSelected

                      ?

                      "bg-[#5C0A18] border-[#5C0A18] text-white"

                      :

                      "bg-[#FAF8F5] border-[#EFE3D5]"

                  }

                `}

              >

                {/* TOP */}

                <div className="p-4 lg:p-8">

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex-1 min-w-0">

                      <div className="flex items-center gap-3 flex-wrap">

                        <p className={`

                          text-2xl
                          lg:text-3xl
                          font-bold
                          leading-tight

                          ${

                            isSelected

                              ?

                              "text-white"

                              :

                              "text-[#5C0A18]"

                          }

                        `}>

                          {
                            combo.combo_name
                          }

                        </p>

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D7B98C] text-[#5C0A18]">

                          Save ₹
                          {
                            pricing.savings
                          }

                        </span>

                      </div>

                      <p className={`

                        mt-3
                        text-sm
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
                          combo.description
                        }

                      </p>

                      <div className="flex items-center gap-4 mt-5 flex-wrap">

                        <p className={`

                          text-3xl
                          lg:text-4xl
                          font-bold

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
                            pricing.comboPrice
                          }

                        </p>

                        <p className={`

                          line-through
                          text-sm

                          ${

                            isSelected

                              ?

                              "text-white/50"

                              :

                              "text-gray-400"

                          }

                        `}>

                          ₹
                          {
                            pricing.regularTotal
                          }

                        </p>

                      </div>

                    </div>

                    {!isSelected ? (

                      <button

                        onClick={() =>
                          addCombo(
                            combo
                          )
                        }

                        className="
                          shrink-0
                          px-4
                          lg:px-6
                          py-3
                          rounded-2xl
                          bg-[#5C0A18]
                          text-white
                          text-sm
                          font-semibold
                        "

                      >

                        Add

                      </button>

                    ) : (

                      <div className="flex flex-col items-end gap-3 shrink-0">

                        <button

                          onClick={() =>
                            removeCombo(
                              combo.combo_id
                            )
                          }

                          className="px-4 py-2 rounded-full bg-white text-[#5C0A18] text-sm font-medium"

                        >

                          Remove

                        </button>

                        <div className="flex items-center gap-2">

                          <button

                            onClick={() =>

                              updateQuantity(

                                combo,

                                selectedCombo.quantity - 1

                              )

                            }

                            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center"

                          >

                            <Minus className="w-4 h-4" />

                          </button>

                          <span className="font-semibold text-base w-6 text-center">

                            {
                              selectedCombo.quantity
                            }

                          </span>

                          <button

                            onClick={() =>

                              updateQuantity(

                                combo,

                                selectedCombo.quantity + 1

                              )

                            }

                            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center"

                          >

                            <Plus className="w-4 h-4" />

                          </button>

                        </div>

                      </div>

                    )}

                  </div>

                  {/* MOBILE DETAILS TOGGLE */}

                  <button

                    onClick={() =>

                      setExpandedCombo(

                        expanded

                          ?

                          ""

                          :

                          String(
                            combo.combo_id
                          )

                      )

                    }

                    className={`

                      mt-5
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-medium

                      ${

                        isSelected

                          ?

                          "text-white/70"

                          :

                          "text-[#5C0A18]"

                      }

                    `}

                  >

                    View Details

                    <ChevronDown

                      className={`

                        w-4
                        h-4
                        transition-transform

                        ${

                          expanded

                            ?

                            "rotate-180"

                            :

                            ""

                        }

                      `}

                    />

                  </button>

                  {/* EXPANDED */}

                  <AnimatePresence>

                    {expanded && (

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

                        <div className={`

                          mt-5
                          pt-5
                          border-t

                          ${

                            isSelected

                              ?

                              "border-white/10"

                              :

                              "border-[#E7D7C6]"

                          }

                        `}>

                          <p className={`

                            text-xs
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

                            Includes

                          </p>

                          <p className={`

                            text-sm
                            leading-7
                            mt-3

                            ${

                              isSelected

                                ?

                                "text-white"

                                :

                                "text-[#5C0A18]"

                            }

                          `}>

                            {
                              combo.combo_items
                            }

                          </p>

                        </div>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </div>

                {/* SELECTED FOOTER */}

                {isSelected && (

                  <div className="px-4 lg:px-8 py-5 border-t border-white/10 flex items-center justify-between">

                    <p className="text-white/70 text-sm">

                      Current Selection

                    </p>

                    <p className="text-2xl lg:text-3xl font-bold">

                      ₹
                      {
                        selectedCombo.totalPrice
                      }

                    </p>

                  </div>

                )}

              </div>

            );
          }
        )}

      </div>

    </div>

  );
}