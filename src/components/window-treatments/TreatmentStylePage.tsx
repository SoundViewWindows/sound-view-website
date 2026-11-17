import Link from "next/link";
import { Header } from "@/components/Header";
import {
  shopTreatmentsHref,
  type TreatmentStyle,
} from "@/lib/window-treatments";
import { ProductGallery } from "@/components/window-treatments/ProductGallery";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]";

export function TreatmentStylePage({ style }: { style: TreatmentStyle }) {
  return (
    <div>
      <Header />
      <main>
        <section className="border-b border-slate-200 bg-white text-[#0B192C]">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <nav aria-label="Breadcrumb" className="text-sm text-[#556980]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className={`rounded-sm hover:text-[#0B192C] ${focusRing}`}>
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  <span>Services</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  <Link
                    href="/services/window-blinds-shades"
                    className={`rounded-sm hover:text-[#0B192C] ${focusRing}`}
                  >
                    Window Blinds & Shades
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">&gt;</span>
                  <span aria-current="page" className="font-medium text-[#0B192C]">
                    {style.productTitle}
                  </span>
                </li>
              </ol>
            </nav>
            <a
              href={shopTreatmentsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-[4px] bg-[#38BDF8] px-6 py-3 text-sm font-semibold text-[#0B192C] transition-colors hover:bg-[#0284C7] hover:text-white lg:self-center ${focusRing}`}
            >
              <ShoppingBagIcon />
              Shop Window Treatments Online
            </a>
          </div>
        </section>

        <section className="bg-[#F4F6F9] pb-14 pt-8 text-[#0B192C] md:pb-16 md:pt-10">
          <div className="mx-auto grid max-w-[1440px] items-start gap-10 px-4 sm:px-5 lg:grid-cols-2 lg:gap-14">
            <ProductGallery images={style.images} />
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                {style.categoryEyebrow}
              </p>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#0B192C] sm:text-4xl">
                {style.productTitle}
              </h1>
              <div className="mt-4 space-y-4 text-base leading-7 text-[#556980]">
                {style.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-6 space-y-2 text-sm leading-6 text-[#0B192C]">
                {style.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0284C7]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={style.shopifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center rounded-[4px] bg-[#38BDF8] px-6 py-3 text-sm font-semibold text-[#0B192C] transition-colors hover:bg-[#0284C7] hover:text-white ${focusRing}`}
                >
                  {style.shopifyLabel ?? "View This Product on Shopify"}
                </a>
                <Link
                  href="/book-appointment"
                  className={`inline-flex items-center justify-center rounded-[4px] border border-[#0B192C] bg-white px-6 py-3 text-sm font-semibold text-[#0B192C] transition-colors hover:bg-[#0B192C] hover:text-white ${focusRing}`}
                >
                  Schedule Free Measurement
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#E6ECF2] py-14 text-[#0B192C] md:py-16">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-5">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B192C] sm:text-4xl">
              Specs and Showroom Help
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#556980]">
              Light control, comfort, sizing, and how the shade is operated. We
              walk through these choices in the showroom or at your home.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {style.specs.map((spec) => (
                <article
                  key={spec.label}
                  className="rounded-[4px] border border-slate-200/80 bg-white p-6"
                >
                  <h3 className="text-lg font-bold text-[#0B192C]">{spec.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#556980]">{spec.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <section className="bg-[#182B3E] px-4 py-16 text-center text-white md:py-20">
        <h2 className="text-3xl font-black text-white sm:text-5xl">
          See This Style in Greater Seattle
        </h2>
        <p className="mx-auto mb-8 mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
          Compare fabrics and controls at our showrooms, or book a free in-home
          consultation and we will measure the windows with you.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/showrooms"
            className={`inline-flex items-center justify-center rounded-[4px] bg-[#38BDF8] px-8 py-3.5 font-bold text-[#0B192C] transition-colors hover:bg-[#0284C7] hover:text-white ${focusRing}`}
          >
            Visit Our Showrooms
          </Link>
          <Link
            href="/book-appointment"
            className={`inline-flex items-center justify-center rounded-[4px] border border-white px-8 py-3.5 font-bold text-white transition-colors hover:bg-white hover:text-[#0B192C] ${focusRing}`}
          >
            Book an In-Home Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 8.5h11l-.7 10.2a1.5 1.5 0 0 1-1.5 1.4H8.7a1.5 1.5 0 0 1-1.5-1.4L6.5 8.5Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
      />
    </svg>
  );
}
