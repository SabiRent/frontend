import arrowCircle from "@/assets/icons/arrow-circle.svg";
import buildingOne from "@/assets/images/hero/building-1.svg";
import buildingTwo from "@/assets/images/hero/building-2.svg";
import dashboardLaptop from "@/assets/images/hero/dashboard-laptop.svg";
import { Button } from "@/components/Button/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-mint">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-18 lg:py-28">
        {/* Left: copy */}
        <div className="flex flex-col justify-center gap-1 md:gap-4">
          <span className="mb-3 text-sm font-semibold text-[rgb(22,117,137)]">
            🏠 Property Management —
          </span>

          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Every Property
            <br />
            <span className="font-normal">Has a Story</span>
            <br />
            <span className="text-[rgb(22,117,137)]">Manage</span> Yours
            <br />
            With Confidence
          </h1>

          <p className="mt-5 max-w-md text-sm font-light leading-6 text-ink-muted sm:text-base">
            Managing rental properties shouldn't mean juggling notebooks,
            spreadsheets, and endless chat history. MyCompound brings everything
            together in one workspace built for House owners &amp; House
            Managers.
          </p>

          <Button variant="primary" className="mt-8 w-fit gap-2 rounded-full">
            Get Started
            <img src={arrowCircle} alt="" className="h-5 w-5" />
          </Button>
        </div>

        {/* Right: image collage */}
        <div className="relative flex min-w-0 flex-col items-center gap-4 md:items-end">
          <div className="flex w-full max-w-xl gap-3">
            <img
              src={buildingOne}
              alt="Residential property exterior"
              className="mt-8 h-auto min-w-0 flex-1 rounded-3xl border-2 border-white object-cover sm:mt-12 md:h-69"
            />
            <img
              src={buildingTwo}
              alt="Apartment building exterior"
              className="h-auto min-w-0 flex-1 rounded-3xl border-2 border-white object-cover md:h-84"
            />
          </div>
          <img
            src={dashboardLaptop}
            alt="MyCompound dashboard on a laptop"
            className="aspect-[16/6] h-auto w-full max-w-xl rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
