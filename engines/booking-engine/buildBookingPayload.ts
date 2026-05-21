export function buildBookingPayload({

  selectedPackage,

  guestCount,

  pricing,

  selectedMenuItems,

  selectedFoodAddons,

  selectedServiceAddons,

  selectedCombos,

}: any) {

  const packageTotal =

    Number(
      pricing?.packagePrice || 0
    );

  const extraGuestTotal =

    Number(
      pricing?.additionalGuestCost || 0
    );

  const foodAddonTotal =

    (selectedFoodAddons || []).reduce(

      (
        sum: number,
        addon: any
      ) =>

        sum +

        Number(
          addon.total || 0
        ),

      0

    );

  const serviceAddonTotal =

    (selectedServiceAddons || []).reduce(

      (
        sum: number,
        addon: any
      ) =>

        sum +

        Number(
          addon.total || 0
        ),

      0

    );

  const comboTotal =

    (selectedCombos || []).reduce(

      (
        sum: number,
        combo: any
      ) =>

        sum +

        Number(
          combo.total || 0
        ),

      0

    );

  const grandTotal =

    packageTotal +

    extraGuestTotal +

    foodAddonTotal +

    serviceAddonTotal +

    comboTotal;

  return {

    booking_id:

      `BOOKING_${Date.now()}`,

    created_at:

      new Date().toISOString(),

    package: {

      package_id:
        selectedPackage?.package_id,

      package_name:
        selectedPackage?.package_name,

      tagline:
        selectedPackage?.tagline,

    },

    guest_count:
      guestCount,

    pricing: {

      package_total:
        packageTotal,

      extra_guest_total:
        extraGuestTotal,

      food_addon_total:
        foodAddonTotal,

      service_addon_total:
        serviceAddonTotal,

      combo_total:
        comboTotal,

      grand_total:
        grandTotal,

    },

    menu_items:

      (selectedMenuItems || []).map(

        (item: any) => ({

          menu_id:
            item.menu_id,

          menu_name:
            item.menu_name,

          category:
            item.category,

        })

      ),

    food_addons:

      (selectedFoodAddons || []).map(

        (addon: any) => ({

          addon_id:
            addon.addon_id,

          addon_name:
            addon.addon_name ||

            addon.food_name,

          total:
            addon.total,

        })

      ),

    service_addons:

      (selectedServiceAddons || []).map(

        (addon: any) => ({

          service_id:
            addon.service_id,

          service_name:
            addon.service_name,

          total:
            addon.total ||

            addon.selling_price,

        })

      ),

    combos:

      (selectedCombos || []).map(

        (combo: any) => ({

          combo_id:
            combo.combo_id,

          combo_name:
            combo.combo_name,

          combo_type:
            combo.combo_type,

          combo_items:
            combo.combo_items,

          quantity:
            combo.quantity || 1,

          total:
            combo.total,

        })

      ),

    booking_score: {

      total_score: 0,

      package_score: 0,

      addon_score: 0,

      combo_score: 0,

      operational_score: 0,

      profit_score: 0,

    },

  };
}