import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  return (
    <nav className="w-full bg-zinc-800 border-b border-zinc-700 flex justify-center sticky top-0 z-50">
      <div className="w-full max-w-7xl flex items-center justify-between px-6">
        {/* Logo/Initials and Name */}
        <div className="flex items-center gap-3 py-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow">
            <span className="text-white text-xl font-bold">AS</span>
          </div>
          <span className="text-blue-200 text-lg font-semibold hidden sm:inline">Amod Shanker</span>
        </div>
        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex justify-center gap-x-12 py-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/home"
                  className="!text-2xl font-medium text-white hover:underline transition"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/resume"
                  className="!text-2xl font-medium text-white hover:underline transition"
                >
                  Resume
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/projects"
                  className="!text-2xl font-medium text-white hover:underline transition"
                >
                  Projects
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/contact"
                  className="!text-2xl font-medium text-white hover:underline transition"
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
  