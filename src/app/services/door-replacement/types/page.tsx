import { DoorStepNav } from "@/components/DoorStepNav";
import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { SkipAhead } from "@/components/SkipAhead";
import { doorStyles } from "@/lib/door-funnel";

export default function DoorTypesPage() {
  return (
    <div className="bg-home-canvas text-[#E7EEF3]">
      <Header />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-5">
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
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
          <div className="mx-auto max-w-[1440px] px-4 py-10 text-center sm:px-5">
            <SkipAhead theme="home" href="/services/door-replacement/materials?type=undecided">
              Not sure yet? Continue to Door Materials
            </SkipAhead>
          </div>
        </section>
      </main>
    </div>
  );
}
