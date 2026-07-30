import arrowCircle from "@/assets/icons/arrow-circle.svg";
import buildingOne from "@/assets/images/hero/building-1.svg";
import buildingTwo from "@/assets/images/hero/building-2.svg";
import dashboardLaptop from "@/assets/images/hero/dashboard-laptop.svg";
import { Button } from "@/components/Button/Button";
import { useNavigate } from "react-router";
import { AppRoutes } from "@/constants/routes";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative top-[-70px] max-w-[1440px] overflow-hidden bg-surface-mint">
      <div className="mx-auto grid max-w-[1279px] grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:py-24 lg:px-15 lg:py-32">
        {/* Left: copy */}
        <div className="flex flex-col justify-center gap-1 md:gap-4">
          <span className="mb-4 text-sm font-semibold text-[rgb(22,117,137)]">
            🏠 Property Management —
          </span>

          <h1 className="text-4xl font-semibold text-ink md:text-5xl">
            <span className="font-extrabold">Every Property</span>
            <br />
            Has a Story
            <br />
            <span className="text-[rgb(22,117,137)]">Manage</span> Yours
            <br />
            With Confidence
          </h1>

          <p className="mt-1 -mr-8 max-w-xl text-[12px] font-semibold text-[rgba(90,92,94,1)]">
            Managing rental properties shouldn't mean juggling notebooks,
            spreadsheets, and <br />
            endless chat history. MyCompound brings everything together in one
            workspace
            <br />
            built for House owners &amp; House Managers.
          </p>

          <Button
            variant="primary"
            className="mt-8 w-fit gap-2 rounded-full"
            onClick={() => navigate(AppRoutes.signup)}
          >
            Get Started
            <img src={arrowCircle} alt="" className="h-5 w-5" />
          </Button>
        </div>

        {/* Right: image collage */}
        <div className="relative flex flex-col items-center top-10 gap-4 md:items-end">
          {/* Blob shape - sits behind the images */}
          <div
            className="absolute right-[-454px] top-[-170px] h-[1100px] w-[1100px] rounded-full -z-10"
            style={{
              background: "rgba(183, 212, 218, 1)",
              borderRadius: "50%",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 60%, transparent 65%)",
            }}
          />
          <div className="relative z-10 flex gap-3">
            <img
              src={buildingOne}
              alt="Residential property exterior"
              className="mt-15 h-69 w-68 rounded-3xl object-cover"
            />
            <img
              src={buildingTwo}
              alt="Apartment building exterior"
              className="mt-0 h-84 w-68 rounded-3xl object-cover"
            />
          </div>
          <img
            src={dashboardLaptop}
            alt="MyCompound dashboard on a laptop"
            className="relative z-10 h-[186px] w-[600px] max-w-xl rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
