"use client"; // Add this at the top

import { useState } from "react";
import Link from "next/link";

// Move SearchBar component outside of Navbar
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const locations = [
    "islamabad",
    "rawalpindi",
    "lahore",
    "karachi",
    "multan",
    // Add more locations as needed
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsDropdownOpen(true);

    if (value) {
      const filtered = locations.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleSelect = (location) => {
    setQuery(location);
    setFilteredLocations([]);
    setIsDropdownOpen(false);
    onSearch(location);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 100); // Delay to allow click event
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
        }}
        className="w-full"
      >
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Pakistan"
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4a7 7 0 014.34 12.658l5.297 5.297a1 1 0 01-1.414 1.414l-5.297-5.297A7 7 0 1111 4z"
            />
          </svg>
        </div>
        {isDropdownOpen && filteredLocations.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredLocations.map((location, index) => (
              <li
                key={index}
                onClick={() => handleSelect(location)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDashboardDropdown = () =>
    setIsDashboardDropdownOpen(!isDashboardDropdownOpen);

  return (
    <nav className="bg-customWhite p-4 border-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Button for Small Screens */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Logo or Site Name */}
        <div className="text-3xl font-bold sm:ml-auto md:ml-0">
          <Link href="/">MyApp</Link>
        </div>

        {/* Navigation Links for Medium and Larger Screens */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-lightGreen">
            Home
          </Link>
          <Link href="/about" className="hover:text-lightGreen">
            About
          </Link>
          <Link href="/contact" className="hover:text-lightGreen">
            SignIn
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <button className="text-lightGreen border-2 border-lightGreen rounded px-2 hover:bg-lightGreen hover:text-white duration-300">
            Join
          </button>
        </div>

        <button className="md:hidden text-lightGreen border-2 border-lightGreen rounded px-2 hover:bg-lightGreen hover:text-white duration-300">
          Join
        </button>
      </div>

      {/* Location Search Bar */}
      <SearchBar onSearch={(location) => console.log(location)} />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Dashboard Dropdown */}
            <button
              onClick={toggleDashboardDropdown}
              className="block w-full text-left hover:text-lightGreen"
              aria-expanded={isDashboardDropdownOpen}
            >
              Dashboard
              <svg
                className="inline w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isDashboardDropdownOpen
                      ? "M19 9l-7 7-7-7"
                      : "M19 15l-7-7-7 7"
                  }
                />
              </svg>
            </button>
            {isDashboardDropdownOpen && (
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/dashboard/overview"
                  className="block hover:text-lightGreen"
                >
                  Overview
                </Link>
                <Link
                  href="/dashboard/statistics"
                  className="block hover:text-lightGreen"
                >
                  Statistics
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block hover:text-lightGreen"
                >
                  Settings
                </Link>
              </div>
            )}

            <Link href="/" className="block hover:text-lightGreen">
              Home
            </Link>
            <Link href="/about" className="block hover:text-lightGreen">
              About
            </Link>
            <Link href="/contact" className="block hover:text-lightGreen">
              Contact
            </Link>

            {/* Services Dropdown */}
            <button
              onClick={toggleDropdown}
              className="block w-full text-left hover:text-lightGreen"
              aria-expanded={isDropdownOpen}
            >
              Services
              <svg
                className="inline w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isDropdownOpen ? "M19 9l-7 7-7-7" : "M19 15l-7-7-7 7"}
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/service1" className="block hover:text-lightGreen">
                  Service 1
                </Link>
                <Link href="/service2" className="block hover:text-lightGreen">
                  Service 2
                </Link>
                <Link href="/service3" className="block hover:text-lightGreen">
                  Service 3
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
