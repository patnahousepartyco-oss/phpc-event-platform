export function calculateComboTotal(
  combo: any
) {

  const comboPrice =

    Number(
      combo.selling_price || 0
    );

  const regularTotal =

    Number(
      combo.regular_total || 0
    );

  const savings =

    regularTotal -
    comboPrice;

  return {

    comboPrice,

    regularTotal,

    savings,

  };
}