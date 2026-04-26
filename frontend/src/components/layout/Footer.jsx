import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaDiscord,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-900">
      <div className="max-w-full mx-auto px-5 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Left Section */}
          <div className="space-y-8">
            {/* Logo */}
            <h2 className="text-5xl font-black tracking-tight">S</h2>

            {/* Social Icons */}
            <div className="flex items-center gap-5 text-zinc-300">
              <a href="#" className="hover:text-white transition">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaLinkedin size={22} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaDiscord size={22} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaYoutube size={22} />
              </a>
              <a href="#" className="hover:text-white transition text-2xl">
                <FaXTwitter />
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-6 text-white">
              About
            </h3>

            <div className="space-y-4 text-zinc-400">
              <Link to="/" className="block  hover:text-orange-500 transition">
                About Us
              </Link>
              <Link to="/" className="block  hover:text-orange-500 transition">
                Support
              </Link>
              <Link to="/" className="block  hover:text-orange-500 transition">
                Terms and Condition
              </Link>
              <Link to="/" className="block hover:text-orange-500 transition">
                Privacy Policy
              </Link>
              <Link to="/" className="block hover:text-orange-500 transition">
                Submit Projects
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-6 text-white">
              Company
            </h3>

            <div className="space-y-4 text-zinc-400">
              <Link to="/" className="block hover:text-orange-500 transition">
                Hire From Us
              </Link>
              <Link to="/" className="block hover:text-orange-500 transition">
                Discord
              </Link>
              <Link to="/" className="block hover:text-orange-500 transition">
                Pricing and Refund
              </Link>
              <Link to="/" className="block hover:text-orange-500 transition">
                Jobs
              </Link>
              <Link to="/" className="block hover:text-orange-500 transition">
                Feedback
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-6 text-white">
              Contact
            </h3>

            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>Online: 11am - 8pm</p>
              <p>+91 9993478545</p>

              <p>Offline: 11am - 8pm</p>
              <p>+91 9691778470</p>

              <p>hello@sheriyans.com</p>

              <p>
                23-B, Sector C
                <br />
                Indrapuri,
                <br />
                Bhopal (MP), 462023
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-900 mt-12 pt-6 text-sm text-zinc-500 text-center">
          © 2026 Sheriyans Coding School. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
