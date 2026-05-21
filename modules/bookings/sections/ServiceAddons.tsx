"use client";

import {
  useMemo,
} from "react";

import {

  Plus,

  Minus,

  Check,

} from "lucide-react";

import {

  calculateServiceAddonTotal,

} from "@/engines/service-addon-engine/calculateServiceAddon";

/*
========================================
BOOKING STORE
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

  serviceAddons: any[];
}

/*
========================================
COMPONENT
========================================
*/

export default function ServiceAddons({

  serviceAddons,

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
  ACTIVE SERVICES
  ========================================
  */

  const activeServices =
    useMemo(() => {

      return (serviceAddons || [])

        .filter(

          (service: any) =>

            String(
              service.is_active
            ).toLowerCase() ===
            "true"

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

    }, [serviceAddons]);

  /*
  ========================================
  GROUPED SERVICES
  ========================================
  */

  const groupedServices =
    useMemo(() => {

      return activeServices.reduce(

        (
          acc: any,
          service: any
        ) => {

          const category =

            service.group_name ||
            "Services";

          if (
            !acc[category]
          ) {

            acc[category] = [];
          }

          acc[category].push(
            service
          );

          return acc;

        },

        {}

      );

    }, [activeServices]);

  /*
  ========================================
  ADD SERVICE
  ========================================
  */

  function addService(
    service: any
  ) {

    const pricing =

      calculateServiceAddonTotal(

        service,

        1

      );

    addAddon({

      id:
        service.service_id,

      name:
        service.service_name,

      category:
        "service",

      quantity:
        pricing.quantity,

      unitPrice:
        pricing.unitPrice,

      totalPrice:
        pricing.total,

      rawAddon:
        service,
    });
  }

  /*
  ========================================
  REMOVE
  ========================================
  */

  function removeService(
    serviceId: string
  ) {

    removeAddon(
      serviceId
    );
  }

  /*
  ========================================
  UPDATE QUANTITY
  ========================================
  */

  function updateQuantity(

    service: any,

    quantity: number

  ) {

    if (
      quantity < 1
    ) {

      removeService(
        service.service_id
      );

      return;
    }

    updateAddonQuantity(

      service.service_id,

      quantity

    );
  }

  /*
  ========================================
  UI
  ========================================
  */

  return (

    <div className="bg-white rounded-[24px] lg:rounded-[32px] border border-[#E7D7C6] p-4 lg:p-8 shadow-sm overflow-hidden">

      {/* HEADER */}

      <div>

        <p className="uppercase tracking-[3px] text-[10px] lg:text-xs text-[#A67C52] font-semibold">

          Event Enhancements

        </p>

        <h2 className="text-2xl lg:text-3xl font-bold text-[#5C0A18] mt-2 lg:mt-3 leading-tight">

          Service Addons

        </h2>

      </div>

      {/* CONTENT */}

      <div className="space-y-8 lg:space-y-12 mt-8 lg:mt-10">

        {Object.entries(
          groupedServices
        ).map(

          ([category, categoryServices]:
            any) => (

            <div
              key={category}
            >

              {/* CATEGORY */}

              <div className="flex items-center gap-3 mb-4 lg:mb-5">

                <div className="h-[1px] flex-1 bg-[#E8D8C7]" />

                <p className="text-[10px] lg:text-sm tracking-[2px] lg:tracking-[3px] uppercase text-[#A67C52] font-semibold text-center">

                  {category}

                </p>

                <div className="h-[1px] flex-1 bg-[#E8D8C7]" />

              </div>

              {/* GRID */}

              <div className="grid grid-cols-1 gap-4">

                {categoryServices.map(
                  (
                    service: any
                  ) => {

                    /*
                    ========================================
                    STORE STATE
                    ========================================
                    */

                    const selectedService =

                      bookingAddons.find(

                        (item: any) =>

                          item.id ===
                          service.service_id

                      );

                    const isSelected =
                      !!selectedService;

                    /*
                    ========================================
                    CARD
                    ========================================
                    */

                    return (

                      <div

                        key={
                          service.service_id
                        }

                        className={`

                          rounded-[22px]
                          lg:rounded-[28px]
                          border
                          p-4
                          lg:p-6
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

                        <div className="flex items-start justify-between gap-4">

                          {/* LEFT */}

                          <div className="flex-1 min-w-0">

                            <div className="flex items-start gap-2">

                              <h3 className={`

                                text-lg
                                lg:text-xl
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
                                  service.service_name
                                }

                              </h3>

                              {isSelected && (

                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">

                                  <Check
                                    size={12}
                                    className="text-[#5C0A18]"
                                  />

                                </div>

                              )}

                            </div>

                            <p className={`

                              text-sm
                              mt-2
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
                                service.description
                              }

                            </p>

                            <div className="flex items-center justify-between mt-5 gap-4 flex-wrap">

                              <p className={`

                                text-2xl
                                lg:text-3xl
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
                                  service.selling_price
                                }

                              </p>

                              {!isSelected && (

                                <button

                                  onClick={() =>
                                    addService(
                                      service
                                    )
                                  }

                                  className="
                                    shrink-0
                                    px-4
                                    lg:px-5
                                    py-2.5
                                    rounded-2xl
                                    bg-[#5C0A18]
                                    text-white
                                    text-sm
                                    font-semibold
                                    flex
                                    items-center
                                    gap-2
                                  "

                                >

                                  <Plus
                                    size={14}
                                  />

                                  Add

                                </button>

                              )}

                            </div>

                          </div>

                        </div>

                        {/* SELECTED STATE */}

                        {isSelected && (

                          <div className="mt-6 pt-5 border-t border-white/10">

                            <div className="flex items-center justify-between gap-4">

                              <div>

                                <p className="text-white/60 text-xs uppercase tracking-[2px]">

                                  Current Selection

                                </p>

                                <p className="text-2xl lg:text-3xl font-bold mt-2">

                                  ₹
                                  {
                                    selectedService.totalPrice
                                  }

                                </p>

                              </div>

                              <div className="flex flex-col items-end gap-4">

                                {/* REMOVE */}

                                <button

                                  onClick={() =>
                                    removeService(
                                      service.service_id
                                    )
                                  }

                                  className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-white
                                    text-[#5C0A18]
                                    text-sm
                                    font-semibold
                                  "

                                >

                                  Remove

                                </button>

                                {/* QUANTITY */}

                                <div className="flex items-center gap-2">

                                  <button

                                    onClick={() =>

                                      updateQuantity(

                                        service,

                                        selectedService.quantity - 1

                                      )

                                    }

                                    className="
                                      w-9
                                      h-9
                                      rounded-full
                                      border
                                      border-white/20
                                      flex
                                      items-center
                                      justify-center
                                    "

                                  >

                                    <Minus
                                      size={14}
                                    />

                                  </button>

                                  <span className="font-semibold text-base w-6 text-center">

                                    {
                                      selectedService.quantity
                                    }

                                  </span>

                                  <button

                                    onClick={() =>

                                      updateQuantity(

                                        service,

                                        selectedService.quantity + 1

                                      )

                                    }

                                    className="
                                      w-9
                                      h-9
                                      rounded-full
                                      border
                                      border-white/20
                                      flex
                                      items-center
                                      justify-center
                                    "

                                  >

                                    <Plus
                                      size={14}
                                    />

                                  </button>

                                </div>

                              </div>

                            </div>

                          </div>

                        )}

                      </div>

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