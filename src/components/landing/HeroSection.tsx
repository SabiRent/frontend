import arrowCircle from "@/assets/icons/arrow-circle.svg";
import buildingOne from "@/assets/images/hero/building-1.svg";
import buildingTwo from "@/assets/images/hero/building-2.svg";
import dashboardLaptop from "@/assets/images/hero/dashboard-laptop.svg";
import { Button } from "@/components/Button/Button";

export default function HeroSection() {
  return (
    <section className=" relative overflow-hidden top-[-70px] bg-surface-mint">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:py-24 lg:px-18 lg:py-32">
        {/* Left: copy */}
        <div className="flex flex-col justify-center gap-1 md:gap-4">
          <span className="mb-4 text-sm font-semibold text-[rgb(22,117,137)]">
            🏠 Property Management —
          </span>

          <h1 className="text-4xl font-bold text-ink md:text-5xl">
            Every Property
            <br />
            <span className="font-normal">Has a Story</span>
            <br />
            <span className="text-[rgb(22,117,137)]">Manage</span> Yours
            <br />
            With Confidence
          </h1>

          <p className="mt-6 font-light  max-w-md text-ink-muted">
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
        <div className="relative flex flex-col items-center gap-4 md:items-end">
          <div className="flex gap-3">
            <img
              src={buildingOne}
              alt="Residential property exterior"
              className=" mt-15 border-2 border-white h-69 w-68 rounded-3xl object-cover"
            />
            <img
              src={buildingTwo}
              alt="Apartment building exterior"
              className="mt-0 border-2 border-white h-84 w-68 rounded-3xl object-cover"
            />
          </div>
          <img
            src={dashboardLaptop}
            alt="MyCompound dashboard on a laptop"
            className="h-[186px] w-full max-w-xl rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
