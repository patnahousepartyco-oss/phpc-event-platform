interface Props {

  selectedMenuItems: any;

  packageMenu: any[];
}

export default function SelectedMenuSummary({

  selectedMenuItems,

  packageMenu,

}: Props) {

  const groupedSelections =

    Object.entries(
      selectedMenuItems
    ).map(

      ([group, ids]: any) => {

        const selectedItems =

          packageMenu.filter(

            (item: any) =>

              ids.includes(
                item.menu_id
              )

          );

        return {

          group,

          items:
            selectedItems,

        };
      }

    );

  if (
    groupedSelections.length === 0
  ) {

    return null;
  }

  return (

    <div className="bg-white rounded-[32px] border border-[#E7D7C6] p-8">

      <p className="uppercase tracking-[4px] text-sm text-[#A67C52] font-semibold">

        Your Selected Menu

      </p>

      <div className="space-y-8 mt-8">

        {groupedSelections.map(

          (groupData: any) => (

            <div
              key={
                groupData.group
              }
            >

              <h3 className="text-2xl font-bold text-[#5C0A18]">

                {groupData.group.replaceAll(
                  "_",
                  " "
                )}

              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                {groupData.items.map(
                  (
                    item: any
                  ) => (

                    <div

                      key={
                        item.menu_id
                      }

                      className="bg-[#F8F5F2] rounded-2xl border border-[#EFE3D5] p-5"

                    >

                      <div className="space-y-2">

                        <div className="flex items-center justify-between">

                          <span className="text-xs uppercase tracking-[2px] bg-white px-3 py-2 rounded-full text-gray-600">

                            {
                              item.selection_label
                            }

                          </span>

                          <span className="text-xs uppercase tracking-[2px] bg-[#EFE3D5] px-3 py-2 rounded-full text-[#5C0A18]">

                            {
                              item.item_type
                            }

                          </span>

                        </div>

                        <p className="text-lg font-medium text-[#5C0A18]">

                          {
                            item.item_name
                          }

                        </p>

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
  );
}