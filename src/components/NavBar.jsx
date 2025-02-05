import { NavLink } from "react-router-dom";

// Components
import Icon from "./Icon";

// Data
import navLinks from "../data/navLinks";

const NavBar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-white border-t">
      <nav className="navlinks container h-16">
        <ul className="flex items-center justify-center size-full">
          {navLinks.main.map(({ path, label, alt, icon }, index) => {
            return (
              <li className="size-full" key={index}>
                <NavLink
                  to={path}
                  className="flex flex-col items-center justify-center gap-0.5 size-full"
                >
                  <Icon
                    size={28}
                    alt={alt}
                    src={icon}
                    className="size-7 transition-transform duration-200"
                  />
                  <span className="text-sm transition-colors duration-200">
                    {label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
