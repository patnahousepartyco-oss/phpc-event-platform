import {
  useRef,
  useState,
} from "react";

import {
  Check,
} from "lucide-react";

interface Props {

  packageMenu: any[];

  foodPreference: string;

  selectedMenuItems: any;

  setSelectedMenuItems: any;
}

export default function PackageMenu({

  packageMenu,

  foodPreference,

  selectedMenuItems,

  setSelectedMenuItems,

}: Props) {

  /*
  ========================================
  FILTER MENU
  ========================================
  */

  const filteredMenu =

    packageMenu.filter(

      (item: any) =>

        item.food_type ===
          foodPreference ||

        item.food_type ===
          "Universal"

    );

  /*
  ========================================
  ACTIVE WARNING
  ========================================
  */

  const [

    activeWarningGroup,

    setActiveWarningGroup

  ] = useState("");

  /*
  ========================================
  GROUP REFS
  ========================================
  */

  const groupRefs =
    useRef<any>({});

  /*
  ========================================
  INCLUDED ITEMS
  ========================================
  */

  const includedItems =

    filteredMenu.filter(

      (item: any) =>

        String(
          item.is_default_included
        ).toLowerCase() ===
        "true"

    );

  /*
  ========================================
  OPTIONAL ITEMS
  ========================================
  */

  const optionalItems =

    filteredMenu.filter(

      (item: any) =>

        String(
          item.is_optional
        ).toLowerCase() ===
        "true"

    );

  /*
  ========================================
  GROUP INCLUDED
  ========================================
  */

  const groupedIncluded =

    includedItems.reduce(

      (
        acc: any,
        item: any
      ) => {

        const category =
          item.menu_category;

        if (
          !acc[category]
        ) {

          acc[category] = [];
        }

        acc[category].push(
          item
        );

        return acc;

      },

      {}

    );

  /*
  ========================================
  GROUP OPTIONAL
  ========================================
  */

  const groupedOptional =

    optionalItems.reduce(

      (
        acc: any,
        item: any
      ) => {

        const group =
          item.selection_group;

        if (
          !acc[group]
        ) {

          acc[group] = {

            maxSelection:
              Number(
                item.max_selection
              ),

            items: [],
          };
        }

        acc[group].items.push(
          item
        );

        return acc;

      },

      {}

    );

  /*
  ========================================
  GROUP ORDER
  ========================================
  */

  const groupOrder =
    Object.keys(
      groupedOptional
    );

  /*
  ========================================
  VALIDATE PREVIOUS GROUPS
  ========================================
  */

  function validatePreviousGroups(
    group: string
  ) {

    const currentIndex =

      groupOrder.indexOf(
        group
      );

    for (
      let i = 0;
      i < currentIndex;
      i++
    ) {

      const previousGroup =
        groupOrder[i];

      const previousGroupData =
        groupedOptional[
          previousGroup
        ];

      const previousSelections =

        selectedMenuItems[
          previousGroup
        ] || [];

      const incomplete =

        previousSelections.length <

        previousGroupData.maxSelection;

      if (incomplete) {

        setActiveWarningGroup(
          previousGroup
        );

        groupRefs.current[
          previousGroup
        ]?.scrollIntoView({

          behavior: "smooth",

          block: "center",

        });

        return false;
      }
    }

    return true;
  }

  /*
  ========================================
  HANDLE SELECTION
  ========================================
  */

  function handleSelection(

    group: string,

    itemId: string,

    maxSelection: number

  ) {

    const currentSelections =

      selectedMenuItems[group] || [];

    const alreadySelected =

      currentSelections.includes(
        itemId
      );

    if (alreadySelected) {

      setSelectedMenuItems({

        ...selectedMenuItems,

        [group]:

          currentSelections.filter(
            (id: string) =>
              id !== itemId
          ),

      });

      return;
    }

    if (
      currentSelections.length >=
      maxSelection
    ) {

      return;
    }

    setSelectedMenuItems({

      ...selectedMenuItems,

      [group]: [

        ...currentSelections,

        itemId,

      ],

    });

    setActiveWarningGroup(
      ""
    );
  }

  /*
  ========================================
  UI
  ========================================
  */

  return (

    <div className="space-y-6 lg:space-y-8">

      {/* INCLUDED MENU */}

      <div className="bg-white rounded-[24px] lg:rounded-[32px] border border-[#E7D7C6] p-4 lg:p-8 shadow-sm overflow-hidden">

        <div>

          <p className="uppercase tracking-[3px] text-[10px] lg:text-xs text-[#A67C52] font-semibold">

            Included In Package

          </p>

          <h2 className="text-2xl lg:text-3xl font-bold text-[#5C0A18] mt-2 lg:mt-3">

            Curated Menu

          </h2>

        </div>

        <div className="space-y-8 lg:space-y-10 mt-8">

          {Object.entries(
            groupedIncluded
          ).map(

            ([category, items]:
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

                {/* ITEMS */}

                <div className="space-y-3">

                  {items.map(
                    (
                      item: any
                    ) => (

                      <div

                        key={
                          item.menu_id
                        }

                        className="bg-[#F8F5F2] rounded-[20px] border border-[#EFE3D5] p-4"

                      >

                        <div className="flex items-start justify-between gap-3">

                          <div className="flex-1 min-w-0">

                            <div className="flex items-center gap-2 flex-wrap">

                              <span className="text-[10px] uppercase tracking-[2px] bg-white px-3 py-1.5 rounded-full text-gray-600">

                                {
                                  item.selection_label
                                }

                              </span>

                              <span className="text-[10px] uppercase tracking-[2px] bg-[#EFE3D5] px-3 py-1.5 rounded-full text-[#5C0A18]">

                                {
                                  item.item_type
                                }

                              </span>

                            </div>

                            <p className="text-lg lg:text-xl font-semibold text-[#5C0A18] mt-3 leading-tight">

                              {
                                item.item_name
                              }

                            </p>

                          </div>

                          <div className="w-8 h-8 rounded-full bg-[#5C0A18] flex items-center justify-center shrink-0">

                            <Check
                              size={14}
                              className="text-white"
                            />

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* OPTIONAL MENU */}

      {Object.keys(
        groupedOptional
      ).length > 0 && (

        <div className="bg-white rounded-[24px] lg:rounded-[32px] border border-[#E7D7C6] p-4 lg:p-8 shadow-sm overflow-hidden">

          <div>

            <p className="uppercase tracking-[3px] text-[10px] lg:text-xs text-[#A67C52] font-semibold">

              Customize Your Menu

            </p>

            <h2 className="text-2xl lg:text-3xl font-bold text-[#5C0A18] mt-2 lg:mt-3">

              Menu Selection

            </h2>

          </div>

          <div className="space-y-8 lg:space-y-10 mt-8">

            {Object.entries(
              groupedOptional
            ).map(

              ([group, data]:
                any) => (

                <div

                  key={group}

                  ref={(el) =>

                    groupRefs.current[
                      group
                    ] = el

                  }

                  onMouseEnter={() =>

                    validatePreviousGroups(
                      group
                    )

                  }

                >

                  {/* TOP */}

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div className="flex items-center gap-3 flex-wrap">

                      <h3 className="text-xl lg:text-2xl font-bold text-[#5C0A18]">

                        {group.replaceAll(
                          "_",
                          " "
                        )}

                      </h3>

                      {activeWarningGroup ===
                        group && (

                        <div className="bg-[#A63A50]/10 border border-[#A63A50]/20 text-[#7A1A2C] px-3 py-1 rounded-full animate-pulse">

                          <p className="text-[10px] lg:text-xs font-medium tracking-[1px]">

                            Complete previous selections

                          </p>

                        </div>

                      )}

                    </div>

                    {(() => {

                      const selectedCount =

                        (
                          selectedMenuItems[group] || []
                        ).length;

                      const completed =

                        selectedCount >=
                        data.maxSelection;

                      return (

                        <div className={`

                          px-4
                          py-2
                          rounded-full
                          transition-all
                          duration-300
                          w-fit

                          ${
                            completed

                              ?

                              "bg-[#EAF8EE] border border-[#B7E4C7]"

                              :

                              "bg-[#FFF7ED] border border-[#F6D7A8]"

                          }

                        `}>

                          <div className="flex items-center gap-2">

                            {completed && (

                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                            )}

                            <p className={`

                              text-[10px]
                              lg:text-xs
                              font-medium
                              tracking-[1px]

                              ${
                                completed

                                  ?

                                  "text-[#1B5E20]"

                                  :

                                  "text-[#A15C00]"

                              }

                            `}>

                              {completed

                                ?

                                "Selection Complete"

                                :

                                `${selectedCount} of ${data.maxSelection} selected`

                              }

                            </p>

                          </div>

                        </div>

                      );

                    })()}

                  </div>

                  {/* OPTIONS */}

                  <div className="space-y-3 mt-5">

                    {data.items.map(
                      (
                        item: any
                      ) => {

                        const selected =

                          (
                            selectedMenuItems[group] || []
                          ).includes(
                            item.menu_id
                          );

                        return (

                          <div

                            key={
                              item.menu_id
                            }

                            onClick={() => {

                              const allowed =

                                validatePreviousGroups(
                                  group
                                );

                              if (!allowed)
                                return;

                              handleSelection(

                                group,

                                item.menu_id,

                                data.maxSelection

                              );

                            }}

                            className={`

                              rounded-[20px]
                              border
                              p-4
                              cursor-pointer
                              transition-all

                              ${
                                selected

                                  ?

                                  "bg-[#5C0A18] border-[#5C0A18]"

                                  :

                                  "bg-[#F8F5F2] border-[#EFE3D5]"

                              }

                            `}

                          >

                            <div className="flex items-start justify-between gap-3">

                              <div className="flex-1 min-w-0">

                                <div className="flex items-center gap-2 flex-wrap">

                                  <span className={`

                                    text-[10px]
                                    uppercase
                                    tracking-[2px]
                                    px-3
                                    py-1.5
                                    rounded-full

                                    ${
                                      selected

                                        ?

                                        "bg-white text-[#5C0A18]"

                                        :

                                        "bg-white text-gray-600"

                                    }

                                  `}>

                                    {
                                      item.selection_label
                                    }

                                  </span>

                                  <span className={`

                                    text-[10px]
                                    uppercase
                                    tracking-[2px]
                                    px-3
                                    py-1.5
                                    rounded-full

                                    ${
                                      selected

                                        ?

                                        "bg-[#7A1A2C] text-white"

                                        :

                                        "bg-[#EFE3D5] text-[#5C0A18]"

                                    }

                                  `}>

                                    {
                                      item.item_type
                                    }

                                  </span>

                                </div>

                                <p className={`

                                  text-lg
                                  lg:text-xl
                                  font-semibold
                                  mt-3
                                  leading-tight

                                  ${
                                    selected

                                      ?

                                      "text-white"

                                      :

                                      "text-[#5C0A18]"

                                  }

                                `}>

                                  {
                                    item.item_name
                                  }

                                </p>

                              </div>

                              <div className={`

                                w-8
                                h-8
                                rounded-full
                                flex
                                items-center
                                justify-center
                                shrink-0

                                ${
                                  selected

                                    ?

                                    "bg-white"

                                    :

                                    "bg-[#EFE3D5]"

                                }

                              `}>

                                {selected ? (

                                  <Check
                                    size={14}
                                    className="text-[#5C0A18]"
                                  />

                                ) : (

                                  <div className="w-2 h-2 rounded-full bg-[#5C0A18]" />

                                )}

                              </div>

                            </div>

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

      )}

    </div>

  );
}