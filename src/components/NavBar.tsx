import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  return (
    <nav className="w-full bg-zinc-950/90 backdrop-blur border-b border-zinc-800 flex justify-center sticky top-0 z-50">
      <div className="w-full max-w-7xl flex items-center justify-between px-6">
        {/* Logo/Initials and Name */}
        <div className="flex items-center gap-3 py-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-base font-bold">AS</span>
          </div>
          <span className="text-zinc-100 text-lg font-semibold hidden sm:inline">Amod Shanker</span>
        </div>
        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex justify-center gap-x-10 py-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/home"
                  className="text-base font-medium text-zinc-300 hover:text-white transition"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/resume"
                  className="text-base font-medium text-zinc-300 hover:text-white transition"
                >
                  Experience
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/projects"
                  className="text-base font-medium text-zinc-300 hover:text-white transition"
                >
                  Projects
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/contact"
                  className="text-base font-medium text-zinc-300 hover:text-white transition"
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
