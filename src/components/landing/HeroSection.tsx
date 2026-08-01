import arrowCircle from "@/assets/icons/arrow-circle.svg";
import { Button } from "@/components/Button/Button";
import { AppRoutes } from "@/constants/routes";
import { useNavigate } from "react-router";

export default function HeroSection() {
  const navigate = useNavigate();

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
            Has a Story
            <br />
            <span className="text-[rgb(22,117,137)]">Manage</span> Yours
            <br />
            With Confidence
          </h1>

          <p className="mt-5 max-w-md text-sm font-light leading-6 text-ink-muted sm:text-base">
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
              src="/images/building-1.svg"
              alt="Residential property exterior"
              className="mt-15 h-69 w-68 rounded-3xl object-cover"
              fetchPriority="high"
            />
            <img
              src="/images/building-2.svg"
              alt="Apartment building exterior"
              className="h-auto min-w-0 flex-1 rounded-3xl border-2 border-white object-cover md:h-84"
              fetchPriority="high"
            />
          </div>
          <img
            src="/images/dashboard-laptop.svg"
            alt="MyCompound dashboard on a laptop"
            className="aspect-[16/6] h-auto w-full max-w-xl rounded-3xl object-cover"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
