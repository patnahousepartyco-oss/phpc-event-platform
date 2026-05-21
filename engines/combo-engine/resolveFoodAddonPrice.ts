// engines/combo-engine/resolveFoodAddonPrice.ts

/*
========================================
RESOLVE FOOD LOT PRICE
========================================
*/

export function resolveFoodAddonPrice(

  foodItem: any,

  addonMappings: any[] = []

) {

  if (!foodItem)
    return 0;

  /*
  ========================================
  FIND MAPPING
  ========================================
  */

  const mapping =

    addonMappings.find(

      (item: any) =>

        String(item.food_id)

        ===

        String(foodItem.food_id)

    );

  /*
  ========================================
  DEFAULT LOT
  ========================================
  */

  const defaultLot =

    Number(
      mapping?.default_lot || 10
    );

  /*
  ========================================
  LOT BASED PRICE
  ========================================
  */

  if (defaultLot === 10) {

    return Number(
      foodItem.lot_10_price || 0
    );
  }

  if (defaultLot === 20) {

    return Number(
      foodItem.lot_20_price || 0
    );
  }

  if (defaultLot === 30) {

    return Number(
      foodItem.lot_30_price || 0
    );
  }

  /*
  ========================================
  FALLBACK
  ========================================
  */

  return Number(
    foodItem.lot_10_price || 0
  );
}