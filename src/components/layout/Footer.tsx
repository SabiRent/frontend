import { Link, useNavigate } from "react-router";
import { Button } from "@/components/Button/Button";
import { AppRoutes } from "@/constants/routes";
import logo from "@/assets/images/logo.svg";
import instagramIcon from "@/assets/icons/footer/instagram.svg";
import facebookIcon from "@/assets/icons/footer/facebook.svg";
import xIcon from "@/assets/icons/footer/x.svg";
import mailIcon from "@/assets/icons/footer/mail.svg";

const PRODUCT_LINKS = [
  { label: "Features", href: "#" },
  { label: "Updates", href: "#" },
  { label: "Careers", href: "#" },
];

const RESOURCE_LINKS = [
  { label: "Help center", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Documentation", href: "#" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export default function FooterSection() {
  const navigate = useNavigate();

  return (
    <>
      {/* CTA Banner */}
      <section className="bg-[rgba(248,251,252,1)] px-6 py-8 md:px-16">
        <div className="mx-auto max-w-6xl h-[337px] rounded-3xl bg-[rgba(251,244,231,1)] px-8 py-14 text-center">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">
            Take The Stress Out of Managing Your Properties.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-[rgba(125,129,130,1)]">
            Managing just one property? or an entire portfolio? MyCompound gives
            you the tools you need to stay organized.
          </p>

          <Button
            variant="primary"
            size="md"
            className="mt-6 rounded-full"
            onClick={() => navigate(AppRoutes.signup)}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgba(232,241,243,1)] px-6 pt-10 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link to={AppRoutes.landing}>
            <img src={logo} alt="MyCompound" className="h-6 w-auto" />
          </Link>

          <div className="w-full sm:w-auto">
            <p className="text-xs font-semibold text-ink">Stay up to date</p>
            <div className="mt-2 flex w-full items-center justify-between rounded-md  border-[1.3px] border-[rgba(217,149,13,1)] px-3 py-2 sm:w-64">
              <img src={mailIcon} alt="" className="h-3 w-3 opacity-60" />
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent px-2 text-xs text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <span className="text-sm text-[rgb(22,117,137)]">›</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-8 border-t border-[rgba(195,197,198,1)] pt-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-ink">Product</p>
            <ul className="mt-3 space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-ink-muted">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Resources</p>
            <ul className="mt-3 space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-ink-muted">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Company</p>
            <ul className="mt-3 space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-ink-muted">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Social Media</p>
            <div className="mt-3 flex gap-2">
              <a href="#" className="rounded-full p-1.5">
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="h-[20px] w-[20px]"
                />
              </a>

              <a href="#" className="rounded-full p-1.5">
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  className="h-[20px] w-[20px]"
                />
              </a>

              <a href="#" className="rounded-full p-1.5">
                <img src={xIcon} alt="X" className="h-[20px] w-[20px]" />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-6xl border-t border-[rgba(195,197,198,1)] py-4 text-xs text-ink-muted">
          © 2026. Copyright and All rights reserved.
        </div>
      </footer>
    </>
  );
}
