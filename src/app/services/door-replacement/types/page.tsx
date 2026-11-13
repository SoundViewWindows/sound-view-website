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
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-10 pt-5 sm:px-6 md:pb-12 md:pt-7 lg:px-8">
        <div>
          <DoorStepNav step={1} />
          <div className="mb-5 flex flex-col gap-4 md:mb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="mb-1.5 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-[34px]">
                Select the Door Style for Your Home
              </h1>
              <p className="max-w-2xl text-sm leading-snug text-slate-200 md:text-[15px]">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="mt-10 text-center">
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
