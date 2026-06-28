import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-900">
      <div className="max-w-full mx-auto px-5 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="block text-white leading-none">
              <h2 className="text-3xl font-semibold tracking-tight">Learning</h2>
              <p className="text-sm font-light text-white/90">Coding School</p>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              A modern learning platform to browse courses, track progress, and
              build job-ready skills.
            </p>

            <div className="flex items-center gap-5 text-zinc-300">
              <a
                href="https://github.com/umakantkatare"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="GitHub"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="YouTube"
              >
                <FaYoutube size={22} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition text-2xl"
                aria-label="X"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-6 text-white">
              Platform
            </h3>

            <div className="space-y-4 text-zinc-400">
              <Link
                to="/courses"
                className="block hover:text-orange-500 transition"
              >
                Browse Courses
              </Link>
              <Link
                to="/enroll-courses"
                className="block hover:text-orange-500 transition"
              >
                My Courses
              </Link>
              <Link
                to="/contact"
                className="block hover:text-orange-500 transition"
              >
                Support
              </Link>
              <Link
                to="/login"
                className="block hover:text-orange-500 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block hover:text-orange-500 transition"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* For Instructors */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-6 text-white">
              Instructors
            </h3>

            <div className="space-y-4 text-zinc-400">
              <Link
                to="/instructor/my-courses"
                className="block hover:text-orange-500 transition"
              >
                Instructor Dashboard
              </Link>
              <Link
                to="/create-course/basics"
                className="block hover:text-orange-500 transition"
              >
                Create a Course
              </Link>
              <Link
                to="/courses"
                className="block hover:text-orange-500 transition"
              >
                Course Catalog
              </Link>
              <Link
                to="/contact"
                className="block hover:text-orange-500 transition"
              >
                Pricing & Refunds
              </Link>
              <Link
                to="/contact"
                className="block hover:text-orange-500 transition"
              >
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
              <p>Monday - Saturday</p>
              <p>9:00 AM - 7:00 PM</p>

              <a
                href="tel:+918982339663"
                className="block hover:text-orange-500 transition"
              >
                +91 8982339663
              </a>

              <a
                href="mailto:support@lms.com"
                className="block hover:text-orange-500 transition"
              >
                support@lms.com
              </a>

              <p>
                Gurgaon, Haryana
                <br />
                India
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 mt-12 pt-6 text-sm text-zinc-500 text-center">
          © 2026 LMS — Learning Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
