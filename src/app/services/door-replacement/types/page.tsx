import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { SkipAhead } from "@/components/SkipAhead";
import { doorStyles } from "@/lib/door-funnel";

export default function DoorTypesPage() {
  return (
    <div className="flex flex-1 flex-col bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-[#0B192C]">
        <div className="pointer-events-none select-none absolute inset-0 z-0">
          <img
            src="/images/door-styles-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/65 via-[#0B192C]/45 to-[#0B192C]/75" />
        </div>
        <div className="relative z-10 flex flex-1 flex-col py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5">
          <DoorStepNav step={1} />
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mb-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Select the Door Style for Your Home
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Select an entryway or patio configuration to explore available materials.
                Not sure what fits? You can select &apos;Open to advice&apos; to continue.
              </p>
            </div>
            <SkipAhead theme="home" href="/services/door-replacement/materials?type=undecided">
              Not sure yet? Continue to Door Materials
            </SkipAhead>
          </div>
        </div>

        <section>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-4">
            {doorStyles.map((style) => (
              <SelectionCard
                key={style.slug}
                href={`/services/door-replacement/materials?type=${style.slug}`}
                image={style.image}
                alt={style.alt}
                title={style.name}
                description={style.body}
                detail={style.detail}
                theme="home"
                layout="type"
                surface="veil"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-[1440px] px-4 text-center sm:px-5">
            <SkipAhead theme="home" href="/services/door-replacement/materials?type=undecided">
              Not sure yet? Continue to Door Materials
            </SkipAhead>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
}
