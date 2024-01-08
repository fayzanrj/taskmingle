import { NavbarLinkProps } from "@/props/NavbarLinksProps";

export const NAVBAR_LINKS: NavbarLinkProps[] = [
  { text: "Repository", href: "#" },
  { text: "Twitter", href: "#" },
  { text: "Login", href: "/login" },
  {
    text: "Sign Up",
    href: "/signup",
    className:
      "py-4 px-9 text-black font-semibold rounded-lg bg-gradient-to-br from-[#19fa9a] to-[#22C1C3]",
  },
];
