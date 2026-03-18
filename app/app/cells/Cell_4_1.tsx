import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_4_1: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(2.5rem,8vw,5rem)] py-[clamp(3rem,8vh,5rem)]">
        <div className="grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 content-center grid-cols-1 gap-3 sm:gap-4 md:grid-cols-5 md:grid-rows-3 md:gap-2 items-center justify-items-center">
          <div className="w-full flex items-center justify-center md:col-start-3 md:row-start-1">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[24rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">Travel</h1>
              I&apos;ve travelled a lot, and sometimes even for vacation.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-start-2 md:row-start-2 md:justify-self-end">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[23rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1000}
            >
              As part of school programs, I&apos;ve been to Washington DC, South Korea, Italy, and Ecuador (including
              the Galapagos Islands).
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-start-4 md:row-start-2 md:justify-self-start">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[23rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={400}
            >
              For work, I&apos;ve been all around India, and to Sri Lanka and Singapore, and to exotic Utah.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-start-2 md:row-start-3 md:justify-self-end md:translate-x-12 lg:translate-x-16">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[22rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={800}
            >
              For pleasure, I&apos;ve been to Canada, Ireland, and Colombia.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-start-4 md:row-start-3 md:justify-self-start md:-translate-x-12 lg:-translate-x-16">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[22rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              For family and friends, I&apos;ve been to all the US northeast states, and Florida, and Chicago.
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    left: "Italiano",
    down: "Family",
  },
};
