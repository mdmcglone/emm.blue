import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_2_4: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(3.5rem,10vw,7rem)] py-[clamp(3rem,8vh,5rem)]">
        {/* Mobile: flex column, centered */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-11rem)] gap-3 sm:gap-4 md:hidden">
          {/* About - First */}
          <div className="w-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">About this Site</h1>
              The background photo is from{" "}
              <a
                href="https://www.jpl.nasa.gov/images/pia26702-webb-data-reveals-dark-matter/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-blue-300 underline-offset-2 text-blue-300 hover:cursor-pointer"
              >
                NASA's JWST
              </a>
              , depicting some 800,000 galaxies, with invisible dark matter projected over the image in blue.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={800}
            >
              This site is rendered via static export and CSR on Vercel. It's coded from scratch (no template) in React / Next.js using Typescript.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              emm.blue stands for Em McGlone, and blue happens to be my favorite color.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={400}
            >
              This site costs $0 to maintain, with the exception of DNS, which costs some $30 per year. While I
              would&apos;ve normally limited costs, I couldn&apos;t resist having such a short personal domain.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1200}
            >
              Originally, I wanted to manually host this site on GCP using Cloud Storage and Cloud CDN, but this turned
              out to be more expensive.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1000}
            >
              There&apos;s an easter egg hidden in one of the pages.
            </GlassBubble>
          </div>
        </div>

        {/* Desktop: grid layout with hexagon pattern */}
        <div className="hidden md:grid w-full min-h-0 content-center grid-cols-3 grid-rows-2 gap-5 items-center justify-items-center">
          {/* Row 1 - Left */}
          <div className="w-full flex items-center justify-center md:col-start-1 md:row-start-1 md:justify-self-end">
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={800}
            >
              This site is rendered via static export and CSR on Vercel. It's coded from scratch (no template) in React / Next.js using Typescript.
            </GlassBubble>
          </div>

          {/* Row 1 - Center (pushed up) */}
          <div className="w-full flex items-center justify-center md:col-start-2 md:row-start-1" style={{ transform: 'translateY(clamp(-8vh, -4rem, -2rem))' }}>
            <GlassBubble
              className="p-4 w-full md:max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">About</h1>
              The background photo is from{" "}
              <a
                href="https://www.jpl.nasa.gov/images/pia26702-webb-data-reveals-dark-matter/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-blue-300 underline-offset-2 text-blue-300 hover:cursor-pointer"
              >
                NASA's JWST
              </a>
              , depicting some 800,000 galaxies, with invisible dark matter projected over the image in blue.
            </GlassBubble>
          </div>

          {/* Row 1 - Right */}
          <div className="w-full flex items-center justify-center md:col-start-3 md:row-start-1 md:justify-self-start">
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1200}
            >
              Originally, I wanted to manually host this site on GCP using Cloud Storage and Cloud CDN, but this turned
              out to be more expensive.
            </GlassBubble>
          </div>

          {/* Row 2 - Left */}
          <div className="w-full flex items-center justify-center md:col-start-1 md:row-start-2 md:justify-self-end">
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1000}
            >
              There's an easter egg hidden in one of the cells.
            </GlassBubble>
          </div>

          {/* Row 2 - Center (pushed down) */}
          <div className="w-full flex items-center justify-center md:col-start-2 md:row-start-2" style={{ transform: 'translateY(clamp(8vh, 4rem, 2rem))' }}>
            <GlassBubble
              className="p-4 w-full md:max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={400}
            >
              This site costs $0 to maintain, with the exception of DNS, which costs some $30 per year. While I
              would&apos;ve normally limited costs, I couldn&apos;t resist having such a short personal domain.
            </GlassBubble>
          </div>

          {/* Row 2 - Right */}
          <div className="w-full flex items-center justify-center md:col-start-3 md:row-start-2 md:justify-self-start">
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              emm.blue stands for Em McGlone, and blue happens to be my favorite color.
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up: "Hobbies",
    right: "Games",
    left: "Projects"
  },
};
