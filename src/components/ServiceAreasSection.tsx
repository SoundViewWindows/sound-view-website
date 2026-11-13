"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BOOKING_URL } from "@/config/links";

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

type Coords = {
  lat: number;
  lng: number;
};

type Showroom = {
  name: string;
  address: string;
  phone: string;
  tel: string;
  hours: string;
  href: string;
  lat: number;
  lng: number;
};

const lakeCity: Showroom = {
  name: "Lake City Showroom",
  address: "12301 Lake City Way NE, Seattle, WA 98125",
  phone: "(206) 572-3411",
  tel: "2065723411",
  hours: "Mon-Fri: 8:00 AM - 4:30 PM",
  href: "/showrooms/lake-city",
  lat: 47.7196,
  lng: -122.2951,
};

const westQueenAnne: Showroom = {
  name: "Queen Anne Showroom",
  address: "921 Elliott Ave W, Seattle, WA 98119",
  phone: "(206) 402-4229",
  tel: "2064024229",
  hours: "Mon-Fri: 8:00 AM - 4:30 PM",
  href: "/showrooms/west-queen-anne",
  lat: 47.6267,
  lng: -122.3712,
};

const bellevue: Showroom = {
  name: "Bellevue Showroom",
  address: "13555 Bel-Red Rd, Suite 207, Bellevue, WA 98005",
  phone: "(425) 417-3005",
  tel: "4254173005",
  hours: "Open by Appointment",
  href: "/showrooms/bellevue",
  lat: 47.6285,
  lng: -122.162,
};

const showrooms = [lakeCity, westQueenAnne, bellevue];

const driveMinutesByCity: Record<string, number> = {
  Auburn: 32,
  Ballard: 10,
  Bellevue: 8,
  "Black Diamond": 35,
  Bothell: 18,
  Brier: 12,
  Burien: 22,
  Carnation: 28,
  Covington: 25,
  "Des Moines": 25,
  Duvall: 30,
  Edmonds: 20,
  Everett: 28,
  "Fall City": 25,
  "Federal Way": 30,
  Issaquah: 18,
  Kenmore: 12,
  Kent: 28,
  Kirkland: 12,
  Lynnwood: 18,
  Magnolia: 8,
  "Maple Valley": 28,
  Medina: 8,
  "Mercer Island": 12,
  "Mill Creek": 16,
  Monroe: 35,
  "Mountlake Terrace": 14,
  Newcastle: 15,
  "Normandy Park": 22,
  Ravensdale: 32,
  Redmond: 15,
  Renton: 20,
  Sammamish: 18,
  SeaTac: 20,
  Seattle: 10,
  Shoreline: 12,
  Snoqualmie: 28,
  Tukwila: 18,
  "West Seattle": 15,
  Woodinville: 16,
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

type LiveEta = {
  minutes: number;
  miles: number;
  showroom: Showroom;
  lat: number;
  lng: number;
};

export function ServiceAreasSection() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [liveEta, setLiveEta] = useState<LiveEta | null>(null);
  const [etaStatus, setEtaStatus] = useState<"idle" | "calculating" | "denied">("idle");
  const locationRequest = useRef(0);
  const titleId = useId();
  const router = useRouter();
  const cityShowroom = selectedCity ? showroomByCity[selectedCity] : null;
  const showroom = liveEta?.showroom ?? cityShowroom;

  useEffect(() => {
    locationRequest.current += 1;
    setLiveEta(null);
    setEtaStatus("idle");
  }, [selectedCity]);

  function resetLiveEta() {
    locationRequest.current += 1;
    setLiveEta(null);
    setEtaStatus("idle");
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setEtaStatus("denied");
      return;
    }
    const requestId = locationRequest.current + 1;
    locationRequest.current = requestId;
    setEtaStatus("calculating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        void (async () => {
          if (locationRequest.current !== requestId) return;
          const user = { lat: position.coords.latitude, lng: position.coords.longitude };
          const nearest = nearestShowroom(user);
          const route = await drivingEta(user, nearest);
          if (locationRequest.current !== requestId) return;
          setLiveEta({ ...route, showroom: nearest, lat: user.lat, lng: user.lng });
          setEtaStatus("idle");
        })();
      },
      () => {
        if (locationRequest.current !== requestId) return;
        setLiveEta(null);
        setEtaStatus("denied");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 },
    );
  }

  function requestQuote() {
    setSelectedCity(null);
    document.body.style.overflow = "";
    if (window.location.pathname === "/") {
      window.setTimeout(() => {
        document.getElementById("homepage-quote-box")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.replaceState(null, "", "/#homepage-quote-box");
      }, 60);
      return;
    }
    router.push("/#homepage-quote-box");
  }

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
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-[4px] border border-slate-200 bg-[#F4F6F9] px-3 py-2">
                  <p className="flex items-center gap-2 text-xs font-medium text-[#0B192C]">
                    <DriveIcon />
                    {etaStatus === "calculating"
                      ? "Calculating ETA..."
                      : liveEta
                        ? `Est. ${liveEta.minutes} min drive (${liveEta.miles} mi) from your location`
                        : `Est. ${cityDriveMinutes(selectedCity)} min drive from ${selectedCity}`}
                  </p>
                  {liveEta ? (
                    <button
                      type="button"
                      onClick={resetLiveEta}
                      className="cursor-pointer text-xs font-semibold text-[#0284C7] underline hover:text-[#0B192C]"
                    >
                      Reset
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={useMyLocation}
                      disabled={etaStatus === "calculating"}
                      className="cursor-pointer text-xs font-semibold text-[#0284C7] underline hover:text-[#0B192C] disabled:cursor-wait"
                    >
                      Use my location
                    </button>
                  )}
                </div>
                {etaStatus === "denied" ? (
                  <p className="mt-2 text-xs text-slate-600">
                    Location access denied: showing estimate from {selectedCity}
                  </p>
                ) : null}
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[#0B192C]">
                  Directions to {showroom.name}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    href={
                      liveEta
                        ? `https://www.google.com/maps/dir/?api=1&origin=${liveEta.lat},${liveEta.lng}&destination=${encodeURIComponent(showroom.address)}`
                        : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(showroom.address)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[4px] border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-[#0B192C] transition-colors hover:border-[#0284C7] hover:text-[#0284C7]"
                  >
                    Google Maps
                  </a>
                  <a
                    href={
                      liveEta
                        ? `https://maps.apple.com/?saddr=${liveEta.lat},${liveEta.lng}&daddr=${encodeURIComponent(showroom.address)}`
                        : `https://maps.apple.com/?daddr=${encodeURIComponent(showroom.address)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[4px] border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-[#0B192C] transition-colors hover:border-[#0284C7] hover:text-[#0284C7]"
                  >
                    Apple Maps
                  </a>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">
                Our licensed installation crews serve {selectedCity} with free in-home
                measurements, upfront pricing, and full factory warranties.
              </p>

              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={requestQuote}
                  className="w-full cursor-pointer rounded-[4px] bg-[#38BDF8] px-4 py-3 text-center font-semibold text-[#0B192C] transition-colors hover:bg-[#0284C7] hover:text-white"
                >
                  Get a Free Quote in {selectedCity}
                </button>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-[4px] border border-[#0B192C] bg-white px-4 py-3 text-center text-sm font-semibold text-[#0B192C] transition-colors hover:border-[#0284C7] hover:text-[#0284C7]"
                >
                  Book In-Home Measurement
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function cityDriveMinutes(city: string) {
  return driveMinutesByCity[city] ?? 20;
}

function nearestShowroom(origin: Coords) {
  return showrooms.reduce((closest, room) =>
    haversineMiles(origin, room) < haversineMiles(origin, closest) ? room : closest,
  );
}

function haversineMiles(from: Coords, to: Coords) {
  const earthMiles = 3958.8;
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return earthMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function roadMinutes(straightMiles: number) {
  const roadMiles = straightMiles * 1.35;
  return Math.max(1, Math.round((roadMiles / 35) * 60));
}

async function drivingEta(origin: Coords, room: Showroom) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${room.lng},${room.lat}?overview=false`,
      { signal: controller.signal },
    );
    const data = (await response.json()) as {
      routes?: { duration?: number; distance?: number }[];
    };
    const route = data.routes?.[0];
    if (route?.duration && route.distance) {
      return {
        minutes: Math.max(1, Math.round(route.duration / 60)),
        miles: Math.round((route.distance / 1609.344) * 10) / 10,
      };
    }
  } catch {
    // Public routing can time out. The road-adjusted distance still gives an ETA.
  } finally {
    clearTimeout(timer);
  }
  const straightMiles = haversineMiles(origin, room);
  const miles = Math.round(straightMiles * 1.35 * 10) / 10;
  return { minutes: roadMinutes(straightMiles), miles };
}

function DriveIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-[#0284C7]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="10" cy="10" r="6.5" />
      <path strokeLinecap="round" d="M10 7v3.2l2 1.3" />
    </svg>
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
