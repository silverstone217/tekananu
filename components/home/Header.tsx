import { HomeLinks } from "@/utils/links";
import { AlignJustify, Plus, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import { Button } from "../ui/button";
import PopoverProfile from "./PopoverProfile";
import LogoComponent from "../LogoComponent";

const Header = () => {
  return (
    <header
      className="fixed z-50 top-0 left-0 right-0 h-14 lg:h-16 flex items-center 
    px-4 shadow-md bg-yellow-950/10 backdrop-blur-2xl"
    >
      <div className="w-full flex items-center justify-between text-sm">
        {/* links */}
        <nav className=" hidden md:flex items-center gap-4">
          {HomeLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-sm font-bold  tracking-tight
              flex items-center gap-1 group 
              hover:opacity-70
              transition-colors duration-300"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* logo link */}
        <Link href={"/"}>
          <LogoComponent />
        </Link>

        <div className="md:hidden">
          {/* Mobile menu button */}
          <AlignJustify
            role="button"
            className="text-yellow-500 hover:text-yellow-700"
          />
        </div>
        {/* Links big screen */}
        <div className="hidden md:flex gap-4 items-center">
          <Link
            href={"/nouveau-produit"}
            className="flex items-center gap-1 text-sm font-bold tracking-tight group hover:opacity-70 transition-colors duration-300"
          >
            {/* sell product */}
            <Button variant={"outline"} size={"sm"}>
              <Plus className="h-4 w-4" />
            </Button>
          </Link>
          {/* search open menu with input search */}
          <Button variant={"outline"} size={"sm"} className="relative">
            <Search
              className="
            size-4 text-gray-500"
            />
          </Button>
          {/* profile popover */}
          <PopoverProfile />

          {/* theme switch */}
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Header;
