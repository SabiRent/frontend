import arrowIcon from "@/assets/icons/arrow-circle.svg";
import checkIcon from "@/assets/icons/checkmark.svg";
import manageIllustration from "@/assets/icons/steps/manage-illustration.svg";
import folashadePhoto from "@/assets/images/testimonials/folashade-collins.svg";
import raymondPhoto from "@/assets/images/testimonials/raymond-agu.svg";
import starIcon2 from "@/assets/images/testimonials/starIcon2.png";
import { Button } from "@/components/Button/Button";
import { AppRoutes } from "@/constants/routes";
import { useNavigate } from "react-router";

const TESTIMONIALS = [
  {
    photo: raymondPhoto,
    name: "Raymond Agu",
    role: "House Owner, Abuja",
    rating: 3,
    quote:
      "I Used to keep track of everything manually, and honestly became overwhelming. But with MyCompound, I can easily see who has paid and who is due next without stress! Truly a life changer.",
  },
  {
    photo: folashadePhoto,
    name: "Folashade Collins",
    role: "House Manager, Lagos",
    rating: 5,
    quote:
      "This App has made managing my tenants so much easier. as a single mum of 3, i barely have the time to constantly dig through old chats and unfinished spreadsheets, everything i need is all in one place.",
  },
];

const STEPS = [
  {
    icon: checkIcon,
    label: (
      <>
        Add Your
        <br />
        Properties
      </>
    ),
  },
  {
    icon: checkIcon,
    label: (
      <>
        Add Your
        <br />
        Tenants
      </>
    ),
  },
  {
    icon: manageIllustration,
    label: (
      <>
        Start Managing
        <br />
        with Ease
      </>
    ),
  },
];

export default function TestimonialsSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-b from-[#B7D4DA] via-[#B7D4DA] via-45% to-[rgba(248,251,252,1)] to-50% px-4 py-14 sm:px-6 md:px-16 md:py-16">
      {/* Testimonials row */}
      <div className="mx-auto mt-5 grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="text-sm font-semibold text-[rgba(255,255,255,1)]">
            What They Say —
          </span>
          <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
            What Our Customer
            <br />
            Say About Us
          </h2>
          <p className="mt-4 text-sm font-medium text-ink-muted">
            Hear From Landlords and property owners and managers who have made
            managing their properties simpler with MyCompound.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[rgba(217,149,13,1)] bg-[rgba(242,242,243,1)] p-5 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-bold text-ink">— {t.name}</p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </div>
              </div>

              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img
                    key={i}
                    src={starIcon2}
                    alt=""
                    className={`h-3 w-3 ${
                      i < t.rating ? "opacity-100" : "grayscale opacity-100"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-xs font-semibold text-ink-muted">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Steps row */}
      <div className="mx-auto mt-16 max-w-6xl md:mt-24 lg:mt-32">
        <h2 className="text-center text-2xl font-bold text-[rgba(16,83,97,1)] md:text-3xl">
          Get Started In 3 Simple Steps!
        </h2>

        <div className="mt-8 flex w-full flex-col items-stretch gap-6 rounded-[20px] border-x border-[#E8B14C] bg-[rgba(232,241,243,0.2)] px-5 py-8 shadow-sm sm:px-8 md:flex-row md:items-center md:justify-between">
          {STEPS.map((step, index) => (
            <div key={index} className="flex items-center justify-center">
              {/* Step */}
              <div className="flex w-full max-w-[220px] items-center gap-4">
                <img
                  src={step.icon}
                  alt=""
                  className={
                    step.icon === manageIllustration
                      ? "h-20 w-20 object-contain"
                      : "h-16 w-16 object-contain"
                  }
                />

                <p className="text-lg font-semibold leading-tight text-[rgba(3,19,22,1)]">
                  {step.label}
                </p>
              </div>

              {/* Arrow */}
              {index < STEPS.length - 1 && (
                <img
                  src={arrowIcon}
                  alt=""
                  className="mx-6 hidden h-5 w-5 md:block"
                />
              )}
            </div>
          ))}

          <Button
            variant="primary"
            size="md"
            className="w-full rounded-xl px-8 py-3 sm:w-auto"
            onClick={() => navigate(AppRoutes.signup)}
          >
            Get the App
          </Button>
        </div>
      </div>
    </section>
  );
}
