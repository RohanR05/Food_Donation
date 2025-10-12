import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faBriefcase,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FaHandsHelping, FaInfoCircle } from "react-icons/fa";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-primary/10">
      <div className="max-w-screen-xl mx-auto p-6 md:p-12 rounded">
        {/* Upper Section */}
        <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
          {/* Brand + Social Icons */}
          <div className="flex flex-col items-start gap-3 flex-1 min-w-0">
            <div>
              <Logo />
            </div>
            <h2 className="text-primary text-[17px] break-words">
              Learning by building. Improving with every project.
            </h2>
            <nav>
              <ul className="flex flex-wrap gap-3 md:gap-6 text-2xl mt-2">
                {[faFacebook, faGithub, faLinkedin, faWhatsapp].map(
                  (icon, idx) => (
                    <li key={idx}>
                      <a
                        href={
                          icon === faFacebook
                            ? "https://www.facebook.com/rohan.kabir.877108"
                            : icon === faGithub
                            ? "https://github.com/RohanR05"
                            : icon === faLinkedin
                            ? "https://www.linkedin.com/in/rohan-batman/"
                            : "https://wa.me/8801906647607"
                        }
                        target="_blank"
                        rel="noreferrer"
                        aria-label="social link"
                      >
                        <FontAwesomeIcon
                          className="border border-secondary p-2 rounded-lg text-secondary bg-neutral/30 hover:bg-primary hover:text-neutral transition-all duration-300 transform hover:scale-110"
                          icon={icon}
                        />
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>

          {/* Quick Links with Icons */}
          <nav className="flex flex-col items-start gap-3 flex-1 min-w-0">
            <h2 className="text-xl font-bold text-secondary">Quick Links</h2>
            <ul className="flex flex-col items-start gap-2">
              <li className="text-primary font-bold flex items-center gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "underline flex items-center gap-2" : "flex items-center gap-2"
                  }
                  to={"/"}
                >
                  <FontAwesomeIcon className="text-secondary" icon={faHouse} />
                  Home
                </NavLink>
              </li>

              <li className="text-primary font-bold flex items-center gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "underline flex items-center gap-2" : "flex items-center gap-2"
                  }
                  to="/allDonations"
                >
                  <FaHandsHelping className="text-secondary text-xl" />
                  All Donations
                </NavLink>
              </li>

              <li className="text-primary font-bold flex items-center gap-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "underline flex items-center gap-2" : "flex items-center gap-2"
                  }
                  to="/comingSoon"
                >
                  <FaInfoCircle className="text-secondary text-xl" />
                  About Us
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Contact Info with Icons */}
          <div className="flex flex-col items-start flex-1 min-w-0">
            <h2 className="text-xl font-bold text-secondary mb-2">
              Contact Info
            </h2>
            <p className="flex items-center gap-2 text-sm text-primary mb-1">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Narail, Bangladesh
            </p>
            <p className="flex items-center gap-2 text-sm text-primary mb-1">
              <FontAwesomeIcon icon={faEnvelope} /> rohankabir061@gmail.com
            </p>
            <p className="flex items-center gap-2 text-sm text-primary mb-1">
              <FontAwesomeIcon icon={faPhone} /> +8801906647607
            </p>
            <p className="flex items-center gap-2 text-sm text-primary font-medium">
              <FontAwesomeIcon icon={faBriefcase} /> Available For Work
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-neutral/30 w-full my-6" />

        {/* Lower Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 text-center text-sm">
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by</p>
          <Logo />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
