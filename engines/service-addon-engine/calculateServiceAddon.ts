export function calculateServiceAddonTotal(

  service: any,

  quantity: number

) {

  const unitPrice =

    Number(
      service.selling_price || 0
    );

  return {

    quantity,

    unitPrice,

    total:

      quantity *
      unitPrice,

  };
}