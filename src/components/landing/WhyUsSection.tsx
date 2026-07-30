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
        <span className="font-semibold text-ink">Get Notified</span>{" "}
        <span className="text-[rgba(90,92,94,1)]">
          about due payments and important updates.
        </span>
      </>
    ),
  },
  {
    icon: tenantInfo,
    text: (
      <>
        <span className="font-semibold text-ink">Keep Tenant</span>{" "}
        <span className="text-[rgba(90,92,94,1)]">
          Information organized and easy to access.
        </span>
      </>
    ),
  },
  {
    icon: maintenance,
    text: (
      <>
        <span className="font-semibold text-ink">Tracks repairs</span>{" "}
        <span className="text-[rgba(90,92,94,1)]">
          and maintenance without losing request.
        </span>
      </>
    ),
  },
  {
    icon: occupancy,
    text: (
      <>
        <span className="text-[rgba(90,92,94,1)]">View Occupancy,</span>{" "}
        <span className="font-semibold text-ink">payments,</span>{" "}
        <span className="text-[rgba(90,92,94,1)]">
          and property performance at a glance.
        </span>
      </>
    ),
  },
];

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      // NOTE: py-55 here is paired with -mt-90 on the "Why Us" text column below
      // to match Figma positioning. If you change this padding, adjust that
      // margin by the same pixel amount, or the layout will break.
      className="relative overflow-hidden bg-white px-0 pt-56 pb-6"
    >
      {/* Decorative corner shapes */}
      <div className="absolute -left-6 -top-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />
      <div className="absolute -right-6 -top-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />
      <div className="absolute -bottom-6 -left-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />
      <div className="absolute -bottom-6 -right-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />

      {/* Why Us row */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-0">
        <div className="relative flex justify-center md:justify-start">
          <div className="relative h-[220px] w-full max-w-[300px] md:h-[300px] md:w-90 md:max-w-none">
            <img
              src={buildingBackground}
              alt="Apartment building exterior"
              className="absolute bottom-2 left-[10%] z-0 h-[70%] w-[65%] rounded-3xl object-cover md:bottom-5 md:left-[64px] md:h-[344px] md:w-[247px]"
            />
            <img
              src={buildingForeground}
              alt="Apartment building"
              className="absolute bottom-[35%] left-[42%] z-10 h-[70%] w-[65%] rounded-3xl object-cover shadow-lg md:bottom-35 md:left-[159px] md:h-[344px] md:w-[248px]"
            />
            <img
              src={tabletPhoto}
              alt="Managing properties on a tablet"
              className="absolute bottom-0 left-[55%] z-20 h-[45%] w-[85%] rounded-3xl md:bottom-12 md:left-[230px] md:h-[162px] md:w-[333px]"
            />
          </div>
        </div>

        <div className="md:-mt-90">
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
            {STATS.map((stat) => {
              const [firstWord, ...rest] = stat.label.split(" ");
              return (
                <div
                  key={stat.label}
                  className="flex h-[78px] w-[153px] flex-col items-center justify-center rounded-2xl border border-[rgba(195,197,198,1)] bg-[rgba(195,197,198,0.2)] text-center"
                >
                  <p className="text-lg font-bold text-[rgba(217,149,13,1)]">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium leading-tight text-ink-muted">
                    {firstWord}
                    <br />
                    {rest.join(" ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* What we give row */}
      <div
        id="features"
        className="md:mx-39 md:mt-[50px] grid max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]"
      >
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
