interface Props {
  plans: any[];
  selectedPlan: any;
  onSelectPlan: (
    plan: any
  ) => void;
}

export default function PackagePlanSelector({
  plans,
  selectedPlan,
  onSelectPlan,
}: Props) {

  return (

    <div className="bg-white rounded-[32px] border border-[#E7D7C6] p-8">

      <p className="uppercase tracking-[4px] text-sm text-[#A67C52] font-semibold">

        Available Plans

      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        {plans.map((plan) => {

          const isActive =

            selectedPlan?.plan_id ===
            plan.plan_id;

          return (

            <button

              key={plan.plan_id}

              onClick={() =>
                onSelectPlan(plan)
              }

              className={`

                rounded-[28px]
                border
                p-7
                text-left
                transition-all

                ${

                  isActive

                    ? "border-[#5C0A18] bg-[#5C0A18] text-white"

                    : "border-[#E7D7C6] bg-[#F8F5F2] hover:border-[#5C0A18]"

                }

              `}

            >

              {/* FOOD TYPE */}

              <p className={`

                uppercase
                tracking-[3px]
                text-xs
                font-semibold

                ${

                  isActive

                    ? "text-yellow-300"

                    : "text-[#A67C52]"

                }

              `}>

                {plan.food_type}

              </p>

              {/* PAX */}

              <h3 className="text-3xl font-bold mt-5">

                {plan.included_pax} Pax

              </h3>

              {/* PRICE */}

              <p className={`

                text-xl
                mt-5
                font-semibold

                ${

                  isActive

                    ? "text-white"

                    : "text-[#5C0A18]"

                }

              `}>

                ₹{plan.selling_price}

              </p>

              {/* EXTRA PLATE */}

              <p className={`

                mt-4
                leading-7

                ${

                  isActive

                    ? "text-white/80"

                    : "text-gray-600"

                }

              `}>

                Extra Guest:
                {" "}
                ₹{plan.extra_plate_price}
                {" "}
                per plate

              </p>

            </button>

          );
        })}

      </div>

    </div>
  );
}