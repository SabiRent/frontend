import rentPayment from "@/assets/icons/pain-points/rent-payment.svg";
import records from "@/assets/icons/pain-points/records.svg";
import multipleProperties from "@/assets/icons/pain-points/multiple-properties.svg.svg";
import tenantsUnits from "@/assets/icons/pain-points/tenants-units.svg";

const PAIN_POINTS = [
  {
    icon: rentPayment,
    text: (
      <>
        Losing track of
        <br />
        Rent Payments.
      </>
    ),
  },
  {
    icon: records,
    text: (
      <>
        Keeping Records In
        <br />
        Different places.
      </>
    ),
  },
  {
    icon: multipleProperties,
    text: (
      <>
        Managing Multiple Properties
        <br />
        Getting Complicated.
      </>
    ),
  },
  {
    icon: tenantsUnits,
    text: (
      <>
        Mixing up Tenants
        <br />
        &amp; Units
      </>
    ),
  },
];

export default function PainPointsBar() {
  return (
    <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:-mt-8">
      <div className="grid grid-cols-1 gap-5 rounded-3xl border border-[rgba(0,0,0,0.25)] bg-white px-5 py-6 shadow-[0_0_15px_rgba(0,0,0,0.06),0_30px_10px_-25px_rgba(0,0,0,0.15)] sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {PAIN_POINTS.map((point, index) => (
          <div
            key={index}
            className="flex items-center gap-3 lg:px-4 lg:first:pl-0 lg:last:pr-0"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-peach">
              <img src={point.icon} alt="" className="h-20 w-20" />
            </span>
            <p className="text-sm font-medium text-[rgba(30,58,95,1)]">
              {point.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
