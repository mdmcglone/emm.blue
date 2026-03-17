import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_1_0: CellConfig = {
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
              Other education
            </h1>
            To support my physics and data courses, I studied multivariate calculus, linear math, ordinary and partial
            differential equations and statistics.
          </GlassBubble>

          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={400}
          >
            I’m a history buff, especially for US and European history. At university, I took classes about
            pre-Columbian America and the American Civil War.
          </GlassBubble>

          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={600}
          >
            While I’ve never formally studied either, I love maps and geography. I’m quite good at Geoguessr, and I
            like trying to guess what data blank maps represent.
          </GlassBubble>

          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={800}
          >
            Linguistics is another area of study I like. While I don’t speak very many languages, I know a bit about a
            lot of languages; grammar, language families, history, some vocab.
          </GlassBubble>

          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1000}
          >
            I’ve always tried to be a bit of a polymath, so I also studied some economics, philosophy, writing,
            astronomy, and more.
          </GlassBubble>
        </div>

        {/* Desktop: sideways pentagon - left column (3 bubbles), right column (2 bubbles), both vertically centered */}
        <div className="hidden md:flex w-full min-h-[calc(100vh-11rem)] md:min-h-0 items-center justify-center gap-4 md:gap-5">
          {/* Left column: 3 bubbles */}
          <div className="flex flex-col items-center justify-center gap-4 md:gap-5">
            {/* 1 */}
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">
                Other education
              </h1>
              To support my physics and data courses, I studied multivariate calculus, linear math, ordinary and
              partial differential equations and statistics.
            </GlassBubble>

            {/* 2 */}
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={400}
            >
              While I've never formally studied either, I love maps and geography. I'm quite good at Geoguessr, and I
              like trying to guess what data blank maps represent.
            </GlassBubble>

            {/* 3 */}
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              I've always tried to be a bit of a polymath, so I also studied some economics, philosophy, writing,
              astronomy, and more.
            </GlassBubble>
          </div>

          {/* Right column: 2 bubbles, vertically centered */}
          <div className="flex flex-col items-center justify-center gap-4 md:gap-5">
            {/* 4 */}
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={800}
            >
              I'm a history buff, especially for US and European history. At university, I took classes about
              pre-Columbian America and the American Civil War.
            </GlassBubble>

            {/* 5 */}
            <GlassBubble
              className="p-4 w-full md:max-w-[24rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1000}
            >
              Linguistics is another area of study I like. While I don't speak very many languages, I know a bit about
              a lot of languages; grammar, language families, history, some vocab.
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    down: "Coding",
    right: "Physics"
  },
};
