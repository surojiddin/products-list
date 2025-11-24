import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import {ModeToggle} from "@/components/custom/mode-toggle.tsx";
import {PlusIcon} from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-muted fixed inset-x-0 top-0 z-10 border-b border-black/5 dark:border-white/10">
      <nav className="h-14 gap-8 px-4 sm:px-6 bg-background">
        <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-12">
            <Logo className="w-12 h-auto text-[#0f1b61]" />

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-6">
            <Button variant={"outline"} className="hidden sm:inline-flex group relative px-1.5 text-sm/6 text-sky-800 dark:text-sky-300">
                <span className="absolute inset-0 border border-dashed border-sky-300/60 bg-sky-400/10 group-hover:bg-sky-400/15 dark:border-sky-300/30"></span>
                Contact us
                <PlusIcon className="absolute top-[-8px] left-[-8px] fill-sky-300 dark:fill-sky-300/50 w-[5px] h-[5px]" />
                <PlusIcon className="absolute top-[-8px] right-[-8px] fill-sky-300 dark:fill-sky-300/50 w-[5px] h-[5px]" />
                <PlusIcon className="absolute bottom-[-8px] left-[-8px] fill-sky-300 dark:fill-sky-300/50 w-[5px] h-[5px]" />
                <PlusIcon className="absolute bottom-[-8px] right-[-8px] fill-sky-300 dark:fill-sky-300/50 w-[5px] h-[5px]" />
            </Button>
            <ModeToggle/>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
