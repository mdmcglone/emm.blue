import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_1_4: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(3.5rem,10vw,7rem)] py-[clamp(3rem,8vh,5rem)]">
        {/* Mobile: simple vertical stack, centered */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-11rem)] gap-3 sm:gap-4 md:hidden">
          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={200}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">
              Personal Projects
            </h1>
            In my spare time, I'm building up a few codebases. All my pre-jhana code looks juvenile now, so I'll get to
            repopulate my Git as well.
          </GlassBubble>

          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={400}
          >
            I built a Python utility that automatically skips through youtube videos, only showing you the most popular
            parts. I'm going to deploy it as a Chrome extension.
          </GlassBubble>

          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={600}
          >
            I'm working on a game like the 4X games I've spent so much time playing, but I want to boil the genre down to
            its bare parts. Strategy games are wonderful, but often so byzantine that they become inaccessible. I'm
            writing it in Rust, and I'm asking some friends to contribute to the art and sound design.
          </GlassBubble>

          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={800}
          >
            I've got a few smaller ones, but in the rest of my time, I'm sharpening up my résumé, LinkedIn, and code
            portfolio in order to land a dream job.
          </GlassBubble>
        </div>

        {/* Desktop: zigzag layout with tight vertical spacing */}
        <div className="hidden md:grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 content-center grid-cols-3 grid-rows-4 gap-x-4 md:gap-x-5 gap-y-0 items-center justify-items-center">
          {/* 1 - top, centered-right */}
          <div className="w-full flex items-center justify-center md:col-start-2 md:row-start-1 md:justify-self-start">
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">
                Personal Projects
              </h1>
              In my spare time, I'm building up a few codebases. All my pre-jhana code looks juvenile now, so I'll get to
              repopulate my Git as well.
            </GlassBubble>
          </div>

          {/* 2 - second row, left, pulled up to overlap with 1 */}
          <div className="w-full flex items-center justify-center md:col-start-1 md:row-start-2 md:justify-self-end -mt-16 md:-mt-20">
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={400}
            >
              I built a Python utility that automatically skips through youtube videos, only showing you the most popular
              parts. I'm going to deploy it as a Chrome extension.
            </GlassBubble>
          </div>

          {/* 3 - third row, centered-right, pulled up but not overlapping with 1 */}
          <div className="w-full flex items-center justify-center md:col-start-2 md:row-start-3 md:justify-self-start -mt-12 md:-mt-16">
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              I'm working on a game like the 4X games I've spent so much time playing, but I want to boil the genre down
              to its bare parts. Strategy games are wonderful, but often so byzantine that they become inaccessible. I'm
              writing it in Rust, and I'm asking some friends to contribute to the art and sound design.
            </GlassBubble>
          </div>

          {/* 4 - fourth row, far right, pulled up to overlap with 3 */}
          <div className="w-full flex items-center justify-center md:col-start-3 md:row-start-4 md:justify-self-start -mt-16 md:-mt-20">
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={800}
            >
              I've got a few smaller ones, but in the rest of my time, I'm sharpening up my résumé, LinkedIn, and code
              portfolio in order to land a dream job.
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up: "Pre-Career",
    right: "About"

  },
};
