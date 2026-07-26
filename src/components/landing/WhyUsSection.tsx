import buildingBackground from "@/assets/images/why-us/compound-building-1.svg";
import buildingForeground from "@/assets/images/why-us/compound-building-2.svg";
import tabletPhoto from "@/assets/images/why-us/tablet-photo.svg";
import notification from "@/assets/icons/features/notification.svg";
import tenantInfo from "@/assets/icons/features/tenant-info.svg";
import maintenance from "@/assets/icons/features/maintenance.svg";
import occupancy from "@/assets/icons/features/occupancy.svg";

const STATS = [
  { value: "500+", label: "Properties Managed" },
  { value: "1200+", label: "Tenants Organized" },
  { value: "94%", label: "Management Efficiency" },
];

const FEATURES = [
  {
    icon: notification,
    text: (
      <>
        <span className="font-semibold text-ink">Get Notified</span> about due
        payments and important updates.
      </>
    ),
  },
  {
    icon: tenantInfo,
    text: (
      <>
        <span className="font-semibold text-ink">Keep Tenant</span> Information
        organized and easy to access.
      </>
    ),
  },
  {
    icon: maintenance,
    text: (
      <>
        <span className="font-semibold text-ink">Tracks repairs</span> and
        maintenance without losing request.
      </>
    ),
  },
  {
    icon: occupancy,
    text: (
      <>
        View{" "}
        <span className="font-semibold text-ink">Occupancy, payments,</span> and
        property performance at a glance.
      </>
    ),
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-white px-0 py-55">
      {/* Decorative corner shapes */}
      <div className="absolute -left-6 -top-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />
      <div className="absolute -right-6 -top-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />
      <div className="absolute -bottom-6 -left-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />
      <div className="absolute -bottom-6 -right-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />

      {/* Why Us row */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div className="relative flex justify-center md:justify-start">
          <div className="relative h-[300px] w-90">
            <img
              src={buildingBackground}
              alt="Apartment building exterior"
              className="absolute bottom-5 left-[64px] z-0 h-[344px] w-[247px] rounded-3xl object-cover"
            />
            <img
              src={buildingForeground}
              alt="Apartment building"
              className="absolute left-[159px] bottom-35 z-10 h-[344px] w-[248px] rounded-3xl object-cover shadow-lg"
            />
            <img
              src={tabletPhoto}
              alt="Managing properties on a tablet"
              className="absolute bottom-12 left-[230px] z-20 h-[162px] w-[333px] rounded-3xl"
            />
          </div>
        </div>

        <div className="-mt-90">
          <span className="text-sm font-semibold text-[rgb(22,117,137)]">
            Why Us —
          </span>

          <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
            Your Compound.
            <br />
            Finally Under Control
          </h2>

          <p className="mt-4 text-sm font-medium text-ink-muted">
            MyCompound Brings everything together in one simple workspace.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="h-[78px] w-[153px] items-center justify-center rounded-2xl border border-[rgba(195,197,198,1)] bg-[rgba(195,197,198,0.2)] text-center"
              >
                <p className="mt-2 my-[-5px] text-lg font-bold text-ink">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-ink-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-39 -mt-[150px] translate-y-50 grid max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
        <div>
          <span className="text-sm font-semibold text-[rgb(22,117,137)]">
            What We Give —
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink">
            Best Features
            <br />
            For You
          </h2>
          <p className="mt-3 text-xs text-ink-muted">
            Everything you need to manage properties smarter with less stress
          </p>
        </div>

        {FEATURES.map((feature, index) => (
          <div
            key={index}
            className="flex h-[159px] w-[166px] flex-col items-start gap-0 rounded-2xl border border-[rgba(195,197,198,1)] bg-white px-2 py-3 shadow-sm"
          >
            <img src={feature.icon} alt="" className="h-[83px] w-[83px]" />
            <p className="text-xs text-ink-muted">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
