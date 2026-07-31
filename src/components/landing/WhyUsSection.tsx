import maintenance from "@/assets/icons/features/maintenance.svg";
import notification from "@/assets/icons/features/notification.svg";
import occupancy from "@/assets/icons/features/occupancy.svg";
import tenantInfo from "@/assets/icons/features/tenant-info.svg";
import buildingBackground from "@/assets/images/why-us/compound-building-1.svg";
import buildingForeground from "@/assets/images/why-us/compound-building-2.svg";
import tabletPhoto from "@/assets/images/why-us/tablet-photo.svg";

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
      className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-0"
    >
      {/* Decorative corner shapes */}
      <div className="absolute -left-6 -top-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />
      <div className="absolute -right-6 -top-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />
      <div className="absolute -bottom-6 -left-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />
      <div className="absolute -bottom-6 -right-6 h-[110.5px] w-[121.5px] rounded-2xl bg-[rgba(183,212,218,1)]" />

      {/* Why Us row */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
        <div className="relative flex justify-center md:justify-start">
          <div className="relative h-[250px] w-full max-w-[520px] sm:h-[320px]">
            <img
              src={buildingBackground}
              alt="Apartment building exterior"
              className="absolute bottom-5 left-[4%] z-0 h-[75%] w-[45%] rounded-3xl object-cover sm:left-[12%] sm:h-[344px] sm:w-[247px]"
            />
            <img
              src={buildingForeground}
              alt="Apartment building"
              className="absolute bottom-[26%] left-[33%] z-10 h-[75%] w-[45%] rounded-3xl object-cover shadow-lg sm:h-[344px] sm:w-[248px]"
            />
            <img
              src={tabletPhoto}
              alt="Managing properties on a tablet"
              className="absolute bottom-12 left-[44%] z-20 h-auto w-[55%] max-w-[333px] rounded-3xl"
            />
          </div>
        </div>

        <div>
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

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-14">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex min-h-[78px] w-full items-center justify-center rounded-2xl border border-[rgba(195,197,198,1)] bg-[rgba(195,197,198,0.2)] px-3 text-center"
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

      {/* What we give row */}
      <div
        id="features"
        className="mx-auto mt-14 grid max-w-6xl grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] lg:gap-6"
      >
        <div className="sm:col-span-2 lg:col-span-1">
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
            className="flex min-h-[159px] w-full flex-col items-start gap-1 rounded-2xl border border-[rgba(195,197,198,1)] bg-white px-3 py-3 shadow-sm"
          >
            <img src={feature.icon} alt="" className="h-[83px] w-[83px]" />
            <p className="text-xs text-ink-muted">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
