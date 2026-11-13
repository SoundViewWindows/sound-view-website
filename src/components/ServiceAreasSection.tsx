"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

const serviceAreas = [
  "Auburn",
  "Ballard",
  "Bellevue",
  "Black Diamond",
  "Bothell",
  "Brier",
  "Burien",
  "Carnation",
  "Covington",
  "Des Moines",
  "Duvall",
  "Edmonds",
  "Everett",
  "Fall City",
  "Federal Way",
  "Issaquah",
  "Kenmore",
  "Kent",
  "Kirkland",
  "Lynnwood",
  "Magnolia",
  "Maple Valley",
  "Medina",
  "Mercer Island",
  "Mill Creek",
  "Monroe",
  "Mountlake Terrace",
  "Newcastle",
  "Normandy Park",
  "Ravensdale",
  "Redmond",
  "Renton",
  "Sammamish",
  "SeaTac",
  "Seattle",
  "Shoreline",
  "Snoqualmie",
  "Tukwila",
  "West Seattle",
  "Woodinville",
];

type Showroom = {
  name: string;
  address: string;
  phone: string;
  tel: string;
  hours: string;
  href: string;
};

const lakeCity: Showroom = {
  name: "Lake City Showroom",
  address: "12301 Lake City Way NE, Seattle, WA 98125",
  phone: "(206) 572-3411",
  tel: "2065723411",
  hours: "Mon-Fri: 8:00 AM - 4:30 PM",
  href: "/showrooms/lake-city",
};

const westQueenAnne: Showroom = {
  name: "Queen Anne Showroom",
  address: "921 Elliott Ave W, Seattle, WA 98119",
  phone: "(206) 402-4229",
  tel: "2064024229",
  hours: "Mon-Fri: 8:00 AM - 4:30 PM",
  href: "/showrooms/west-queen-anne",
};

const bellevue: Showroom = {
  name: "Bellevue Showroom",
  address: "13555 Bel-Red Rd, Suite 207, Bellevue, WA 98005",
  phone: "(425) 417-3005",
  tel: "4254173005",
  hours: "Open by Appointment",
  href: "/showrooms/bellevue",
};

const showroomByCity: Record<string, Showroom> = {
  Bothell: lakeCity,
  Brier: lakeCity,
  Edmonds: lakeCity,
  Everett: lakeCity,
  Kenmore: lakeCity,
  Lynnwood: lakeCity,
  "Mill Creek": lakeCity,
  Monroe: lakeCity,
  "Mountlake Terrace": lakeCity,
  Shoreline: lakeCity,
  Woodinville: lakeCity,
  Auburn: westQueenAnne,
  Ballard: westQueenAnne,
  Burien: westQueenAnne,
  "Des Moines": westQueenAnne,
  "Federal Way": westQueenAnne,
  Kent: westQueenAnne,
  Magnolia: westQueenAnne,
  "Normandy Park": westQueenAnne,
  SeaTac: westQueenAnne,
  Seattle: westQueenAnne,
  Tukwila: westQueenAnne,
  "West Seattle": westQueenAnne,
  Bellevue: bellevue,
  "Black Diamond": bellevue,
  Carnation: bellevue,
  Covington: bellevue,
  Duvall: bellevue,
  "Fall City": bellevue,
  Issaquah: bellevue,
  Kirkland: bellevue,
  "Maple Valley": bellevue,
  Medina: bellevue,
  "Mercer Island": bellevue,
  Newcastle: bellevue,
  Ravensdale: bellevue,
  Redmond: bellevue,
  Renton: bellevue,
  Sammamish: bellevue,
  Snoqualmie: bellevue,
};

export function ServiceAreasSection() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const titleId = useId();
  const showroom = selectedCity ? showroomByCity[selectedCity] : null;

  useEffect(() => {
    if (!selectedCity) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedCity(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedCity]);

  return (
    <section
      aria-labelledby="service-areas-title"
      className="border-b border-slate-200/80 bg-[#F4F6F9] py-16 md:py-20"
      style={{ backgroundColor: "#F4F6F9", paddingTop: "72px", paddingBottom: "72px" }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#0284C7]">
          Greater Puget Sound Coverage
        </p>
        <h2
          id="service-areas-title"
          className="mb-3 mt-2 text-3xl font-bold text-[#0B192C] sm:text-4xl"
        >
          Our Service Areas
        </h2>
        <p className="max-w-3xl text-base text-slate-600">
          Sound View Window & Door provides precision measurement, product consultation,
          and certified installation across King and Snohomish Counties, including:
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4">
          {serviceAreas.map((area) => (
            <li key={area}>
              <button
                type="button"
                onClick={() => setSelectedCity(area)}
                className="flex w-full cursor-pointer items-center justify-between rounded-[4px] border border-slate-200/90 bg-white px-4 py-3 text-left shadow-xs transition-all hover:border-[#0284C7] hover:shadow-sm"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <MapPinIcon />
                  <span className="text-sm font-semibold text-[#0B192C]">{area}</span>
                </span>
                <ChevronIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedCity && showroom ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setSelectedCity(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-lg overflow-hidden rounded-[4px] border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#0B192C] px-6 py-4 text-white">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#38BDF8]">
                  Greater Puget Sound Service Area
                </p>
                <h3 id={titleId} className="text-xl font-bold text-white">
                  {selectedCity}, WA
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCity(null)}
                aria-label="Close"
                className="rounded-[4px] p-1 text-white transition-colors hover:bg-white/10"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-[4px] border border-slate-200 bg-[#F4F6F9] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0284C7]">
                  Closest Sound View Showroom
                </p>
                <Link
                  href={showroom.href}
                  className="mt-1 block text-lg font-bold text-[#0B192C] hover:text-[#0284C7]"
                >
                  {showroom.name}
                </Link>
                <p className="mt-2 text-sm text-slate-600">{showroom.address}</p>
                <p className="mt-2 text-sm">
                  <a
                    href={`tel:${showroom.tel}`}
                    className="font-semibold text-[#0284C7] hover:text-[#0B192C]"
                  >
                    {showroom.phone}
                  </a>
                </p>
                <p className="mt-1 text-sm text-slate-600">{showroom.hours}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-[#0284C7] hover:text-[#0B192C]"
                >
                  Get directions
                </a>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[#0B192C]">
                  View {selectedCity} in Maps
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedCity}, WA`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[4px] border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-[#0B192C] transition-colors hover:border-[#0284C7] hover:text-[#0284C7]"
                  >
                    Google Maps
                  </a>
                  <a
                    href={`https://maps.apple.com/?q=${encodeURIComponent(`${selectedCity}, WA`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[4px] border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-[#0B192C] transition-colors hover:border-[#0284C7] hover:text-[#0284C7]"
                  >
                    Apple Maps
                  </a>
                </div>
              </div>

              <Link
                href="/quote"
                className="block rounded-[4px] bg-[#38BDF8] px-4 py-3 text-center font-semibold text-[#0B192C] transition-colors hover:bg-[#0284C7] hover:text-white"
              >
                Request a Free Quote in {selectedCity}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function MapPinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-[#0284C7]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 17.5s5.5-4.1 5.5-8.1A5.5 5.5 0 0 0 4.5 9.4c0 4 5.5 8.1 5.5 8.1Z"
      />
      <circle cx="10" cy="9.2" r="1.7" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-slate-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" d="M5 5l10 10M15 5 5 15" />
    </svg>
  );
}
