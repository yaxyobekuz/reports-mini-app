import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 w-full">
      <div className="container pb-4">
        <ul className="flex items-center justify-between w-full h-16 bg-dark text-white rounded-full">
          {/* Home */}
          <li className="w-1/3 h-full">
            <NavLink
              to="/"
              className="flex flex-col items-center justify-center gap-1.5 size-full navlink"
            >
              <svg
                x="0"
                y="0"
                width="24"
                height="24"
                version="1.1"
                xmlSpace="preserve"
                viewBox="0 0 512 512"
                className="navlink-color"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  fill="currentColor"
                  d="m498.195 222.695-.035-.035L289.305 13.813C280.402 4.905 268.566 0 255.977 0c-12.59 0-24.426 4.902-33.332 13.809L13.898 222.55c-.07.07-.14.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.445 13.238 31.277 13.746.48.047.965.07 1.453.07h8.324v153.7C54.832 487.254 79.578 512 110 512h81.71c8.282 0 15-6.715 15-15V376.5c0-13.879 11.29-25.168 25.169-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.285 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.16v-153.7h7.719c12.586 0 24.422-4.902 33.332-13.808 18.36-18.371 18.367-48.254.023-66.637zm0 0"
                ></path>
              </svg>

              <span className="text-xs navlink-color">Bosh sahifa</span>
            </NavLink>
          </li>

          {/* Reports */}
          <li className="w-1/3 h-full">
            <NavLink
              to="/reports"
              className="flex flex-col items-center justify-center gap-1.5 size-full navlink"
            >
              <svg
                x="0"
                y="0"
                width="24"
                height="24"
                version="1.1"
                xmlSpace="preserve"
                viewBox="0 0 512 512"
                className="navlink-color"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path fill="currentColor" d="M320 0v128h128z"></path>
                <path
                  fill="currentColor"
                  d="M320 160c-17.632 0-32-14.368-32-32V0H96C78.368 0 64 14.368 64 32v448c0 17.664 14.368 32 32 32h320c17.664 0 32-14.336 32-32V160H320zM192 448h-64v-96h64v96zm96 0h-64V288h64v160zm96 0h-64V224h64v224z"
                ></path>
              </svg>

              <span className="text-xs navlink-color">Hisobotlar</span>
            </NavLink>
          </li>

          {/* Settings */}
          <li className="w-1/3 h-full">
            <NavLink
              to="/settings"
              className="flex flex-col items-center justify-center gap-1.5 size-full navlink"
            >
              <svg
                x="0"
                y="0"
                width="24"
                height="24"
                version="1.1"
                xmlSpace="preserve"
                viewBox="0 0 512 512"
                className="navlink-color"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    fill="currentColor"
                    d="M470.006 301.042c-16.074-9.26-26.057-26.511-26.057-45.041 0-18.521 9.982-35.772 26.01-45.023 16.45-9.457 23.292-29.107 16.262-46.719-8.811-22.247-20.808-43.026-35.57-61.768-11.763-14.922-32.196-18.83-48.645-9.312-16.027 9.312-35.992 9.34-52.066.07-16.028-9.27-25.963-26.549-25.916-45.112 0-18.99-13.591-34.75-32.383-37.468a247.327 247.327 0 0 0-71.328.07c-18.746 2.737-32.336 18.488-32.29 37.44 0 18.54-9.936 35.809-25.963 45.07-16.075 9.26-35.992 9.241-52.066-.061-16.449-9.518-36.882-5.591-48.645 9.331a249.99 249.99 0 0 0-20.011 29.562c-5.952 10.306-11.154 21.108-15.559 32.088-7.077 17.64-.234 37.318 16.215 46.799 16.075 9.251 26.057 26.511 26.057 45.032s-9.982 35.767-26.01 45.032c-16.449 9.458-23.291 29.098-16.262 46.705a246.096 246.096 0 0 0 35.57 61.772c11.763 14.922 32.196 18.83 48.645 9.312 16.028-9.312 35.992-9.331 52.066-.07 16.027 9.27 25.963 26.549 25.963 45.112-.047 18.985 13.59 34.745 32.336 37.469a247.073 247.073 0 0 0 35.382 2.549c11.998 0 23.995-.872 35.945-2.62 18.746-2.742 32.336-18.479 32.336-37.431-.047-18.549 9.888-35.819 25.916-45.079 16.074-9.26 35.992-9.241 52.066.061 16.449 9.518 36.882 5.6 48.645-9.331a251.455 251.455 0 0 0 20.011-29.553c5.905-10.305 11.201-21.108 15.559-32.097 7.079-17.64.237-37.323-16.213-46.789zm-150.247-8.22c-9.795 17.031-25.682 29.22-44.708 34.31-18.98 5.089-38.851 2.479-55.863-7.363-35.148-20.302-47.239-65.418-26.947-100.59 13.591-23.592 38.429-36.798 63.876-36.798 12.513 0 25.12 3.168 36.695 9.851 35.148 20.297 47.239 65.427 26.947 100.59z"
                  ></path>
                </g>
              </svg>

              <span className="text-xs navlink-color">Sozlamalar</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
