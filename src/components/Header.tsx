"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState, type MouseEvent } from "react";
import { BOOKING_URL } from "@/config/links";
import { services } from "@/lib/services";

type NavChild = {
  label: string;
  href: string;
  serviceId?: string;
};

type NavEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; items: NavChild[] };

const navigation: NavEntry[] = [
  { kind: "link", label: "Home", href: "/" },
  {
    kind: "menu",
    label: "Services",
    items: services.map((service) => ({
      label: service.title,
      href:
        service.id === "window-replacement"
          ? "/services/window-replacement/materials"
          : service.id === "door-replacement"
            ? "/services/door-replacement/types"
            : service.id === "shower-door-replacement"
              ? "/services/shower-door-replacement/types"
              : service.id === "glass-replacement"
                ? "/services/glass-replacement/types"
                : service.id === "window-blinds-shades"
                  ? "/services/window-blinds-shades"
                  : `/services/${service.id}`,
      serviceId: service.id,
    })),
  },
  {
    kind: "menu",
    label: "Resources",
    items: [
      { label: "Financing", href: "/financing" },
      {
        label: "Energy Rebates for Windows & Doors",
        href: "/energy-rebates",
      },
      { label: "Blog & Guides", href: "/blog" },
    ],
  },
  {
    kind: "menu",
    label: "Showrooms",
    items: [
      { label: "Lake City Showroom", href: "/showrooms/lake-city" },
      { label: "West Queen Anne Showroom", href: "/showrooms/west-queen-anne" },
      {
        label: "Bellevue Showroom (By Appointment ONLY)",
        href: "/showrooms/bellevue",
      },
    ],
  },
  { kind: "link", label: "Portfolio", href: "/portfolio" },
  { kind: "link", label: "About", href: "/about" },
  { kind: "link", label: "Contact Us", href: "/contact" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

type HeaderProps = {
  onServiceSelect?: (serviceId: string) => void;
};

export function Header({ onServiceSelect }: HeaderProps) {
  const baseId = useId();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function selectService(event: MouseEvent, serviceId: string) {
    setOpenMenu(null);
    setMobileOpen(false);
    if (
      !onServiceSelect ||
      serviceId === "window-replacement" ||
      serviceId === "door-replacement" ||
      serviceId === "shower-door-replacement" ||
      serviceId === "glass-replacement" ||
      serviceId === "window-blinds-shades" ||
      serviceId === "glass-railing-installation"
    ) {
      return;
    }
    event.preventDefault();
    onServiceSelect(serviceId);
  }

  return (
    <header className="relative z-40 shrink-0 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center gap-2 px-4 py-2.5 sm:gap-3 sm:px-5">
        <Link
          href="/"
          className={`flex min-w-0 items-center gap-2 rounded-md ${focusRing}`}
        >
          <Image
            src="/logo.png"
            alt=""
            width={1024}
            height={1024}
            preload
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span className="text-[13px] font-semibold leading-tight tracking-tight text-slate-800 sm:text-base">
            <span className="block">Sound View</span>
            <span className="block">Window & Door</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 lg:flex">
          {navigation.map((entry) =>
            entry.kind === "link" ? (
              <Link
                key={entry.label}
                href={entry.href}
                className={`rounded-md px-2 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-800 hover:text-sky-600 xl:px-2.5 xl:text-xs ${focusRing}`}
              >
                {entry.label}
              </Link>
            ) : (
              <DesktopMenu
                key={entry.label}
                label={entry.label}
                items={entry.items}
                menuId={`${baseId}-${entry.label}`}
                open={openMenu === entry.label}
                onOpen={() => setOpenMenu(entry.label)}
                onClose={() => setOpenMenu((current) => (current === entry.label ? null : current))}
                onToggle={() =>
                  setOpenMenu((current) => (current === entry.label ? null : entry.label))
                }
                onServiceSelect={selectService}
              />
            ),
          )}
        </nav>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`shrink-0 rounded-full bg-[#0B192C] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#15263F] sm:px-4 sm:text-sm ${focusRing}`}
        >
          Book Appointment
        </a>

        <button
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-800 hover:text-sky-600 lg:hidden ${focusRing}`}
          aria-expanded={mobileOpen}
          aria-controls={`${baseId}-mobile`}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          <Hamburger open={mobileOpen} />
        </button>
      </div>

      {mobileOpen ? (
        <div
          id={`${baseId}-mobile`}
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-slate-200 bg-white shadow-lg lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto flex max-w-[1440px] flex-col px-4 py-2 sm:px-5">
            {navigation.map((entry) =>
              entry.kind === "link" ? (
                <Link
                  key={entry.label}
                  href={entry.href}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-slate-200 px-2 py-3 text-sm font-medium uppercase tracking-wide text-slate-800 hover:text-sky-600 ${focusRing}`}
                >
                  {entry.label}
                </Link>
              ) : (
                <div key={entry.label} className="border-b border-slate-200">
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between px-2 py-3 text-left text-sm font-medium uppercase tracking-wide text-slate-800 hover:text-sky-600 ${focusRing}`}
                    aria-expanded={mobileSection === entry.label}
                    onClick={() =>
                      setMobileSection((current) =>
                        current === entry.label ? null : entry.label,
                      )
                    }
                  >
                    {entry.label}
                    <Chevron open={mobileSection === entry.label} />
                  </button>
                  {mobileSection === entry.label ? (
                    <ul className="mb-2 border-t border-slate-200">
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={(event) =>
                              item.serviceId
                                ? selectService(event, item.serviceId)
                                : setMobileOpen(false)
                            }
                            className={`block px-4 py-3 text-sm text-slate-800 hover:bg-slate-50 hover:text-sky-600 ${focusRing}`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ),
            )}
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className={`border-b border-slate-200 px-2 py-3 text-sm font-medium uppercase tracking-wide text-slate-800 hover:text-sky-600 ${focusRing}`}
            >
              Blog
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className={`my-3 inline-flex items-center justify-center rounded-full bg-[#0B192C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#15263F] ${focusRing}`}
            >
              Book Appointment
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function DesktopMenu({
  label,
  items,
  menuId,
  open,
  onOpen,
  onClose,
  onToggle,
  onServiceSelect,
}: {
  label: string;
  items: NavChild[];
  menuId: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onServiceSelect: (event: MouseEvent, serviceId: string) => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        className={`flex items-center gap-1 rounded-md px-2 py-2 text-[11px] font-medium uppercase tracking-wide text-slate-800 hover:text-sky-600 xl:px-2.5 xl:text-xs ${focusRing}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(event) => {
          if (event.detail === 0) onToggle();
          else onOpen();
        }}
      >
        {label}
        <Chevron open={open} />
      </button>
      {open ? (
        <div id={menuId} className="absolute left-0 top-full z-50 pt-2">
          <ul className="min-w-64 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
            {items.map((item) => (
              <li key={item.href} className="border-b border-slate-200 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={(event) =>
                    item.serviceId ? onServiceSelect(event, item.serviceId) : onClose()
                  }
                  className={`block px-4 py-3 text-sm normal-case tracking-normal text-slate-800 hover:bg-slate-50 hover:text-sky-600 ${focusRing}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      {open ? (
        <path strokeLinecap="round" d="M6 6 18 18M18 6 6 18" />
      ) : (
        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}
