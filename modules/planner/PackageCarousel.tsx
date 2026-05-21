import PackageCard from "./PackageCard";

interface Props {
  packages: any[];
  plans: any[];
  foodPreference: string;
  selectedPackageId: string;
  recommendedPackage: any;
  onSelectPackage: (id: string) => void;
}

export default function PackageCarousel({
  packages,
  plans,
  foodPreference,
  selectedPackageId,
  recommendedPackage,
  onSelectPackage,
}: Props) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {packages.map((pkg) => {

        const packagePlans = plans.filter(
          (plan) =>
            plan.package_id === pkg.package_id &&
            plan.food_type === foodPreference
        );

        const plan10 = packagePlans.find(
          (plan) => plan.included_pax === 10
        );

        if (!plan10) return null;

        return (

          <PackageCard
            key={pkg.package_id}
            pkg={pkg}
            price={Number(plan10.selling_price)}
            isSelected={
              selectedPackageId ===
              pkg.package_id
            }
            isRecommended={
              recommendedPackage?.package_id ===
              pkg.package_id
            }
            onSelect={() =>
              onSelectPackage(pkg.package_id)
            }
          />

        );
      })}

    </div>

  );
}