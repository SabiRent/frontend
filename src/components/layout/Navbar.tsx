import { Link, useNavigate } from "react-router";

import { Button } from "@/components/Button/Button";
import logo from "@/assets/images/logo.svg"; // adjust once logo asset is saved

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Why Us", href: "#why-us" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className=" relative z-50 relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-18 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MyCompound" className="h-6" />
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-16 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[rgba(90,92,94,1)] text-ink-muted hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Auth actions */}
        <div className="flex items-center gap-3">
          <Button
            className="h-5 px-8"
            variant="outline"
            size="sm"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
          <Button
            className="h-5 px-8"
            variant="primary"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px 
bg-[linear-gradient(to_right,rgba(99,163,176,1)_0%,rgba(20,106,125,1)_25%,rgba(197,136,12,1)_50%,rgba(30,58,95,1)_75%,rgba(99,163,176,1)_100%)]"
      >
        <div className="mx-auto h-full w-60 bg-yellow-" />
      </div>
    </header>
  );
}
