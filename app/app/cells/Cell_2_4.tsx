import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_2_4: CellConfig = {
  content: (
    <>
      <div className="w-[90vw] md:w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(3rem,8vh,5rem)]">
        <div className="grid w-full min-h-[calc(100dvh-11rem)] md:min-h-0 content-center grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:grid-rows-4 md:gap-5 items-center justify-items-center">
          <GlassBubble
            wrapperClassName="w-full md:col-start-2 md:row-start-1 justify-self-center"
            className="p-4 w-[90vw] md:w-full md:max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={0}
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

          <GlassBubble
            wrapperClassName="w-full md:col-start-1 md:row-start-2 md:justify-self-end"
            className="p-4 w-[90vw] md:w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={100}
          >
            This site is rendered via static export and CSR on Vercel. It's coded from scratch (no template) in React / Next.js using Typescript.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full md:col-start-3 md:row-start-2 md:justify-self-start"
            className="p-4 w-[90vw] md:w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={180}
          >
            emm.blue stands for Em McGlone, and blue happens to be my favorite color.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full md:col-start-1 md:row-start-3 md:justify-self-end"
            className="p-4 w-[90vw] md:w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={260}
          >
            This site costs $0 to maintain, with the exception of DNS, which costs some $30 per year. While I
            would&apos;ve normally limited costs, I couldn&apos;t resist having such a short personal domain.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full md:col-start-3 md:row-start-3 md:justify-self-start"
            className="p-4 w-[90vw] md:w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={340}
          >
            Originally, I wanted to manually host this site on GCP using Cloud Storage and Cloud CDN, but this turned
            out to be more expensive.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full md:col-start-2 md:row-start-4 justify-self-center"
            className="p-4 w-[90vw] md:w-full md:max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={420}
          >
            There&apos;s an easter egg hidden in one of the panels.
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up: "Hobbies",
  },
};
