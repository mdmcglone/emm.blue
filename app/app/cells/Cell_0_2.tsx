import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";
import { ProgressiveImage } from "../components/ProgressiveImage";

export const Cell_0_2: CellConfig = {
  content: (
    <div className="w-screen max-w-none px-0 md:px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
      {/* Desktop: 2x2 square. Mobile: single-column stack. */}
      <div className="grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 content-center grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-3 sm:gap-4 md:gap-5 items-center justify-items-center">
        {/* 1: top-left */}
        <div className="w-full flex items-center justify-center md:col-start-1 md:row-start-1 md:justify-self-start">
          <GlassBubble
            className="p-4 w-[90vw] md:w-full md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
            smallFont
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={200}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-left w-full">jhana</h1>
            My cofounders, Hemanth Bharatha Chakvravarthy, and Ben Hoffner-Brodsky, and I came up with the idea for
            jhana in mid-2022 – to create an AI-focused intervention in India’s sluggish legal system, that would
            make the law easier to search, understand, and work with. I moved to India in February 2023 to that
            end, and have lived here since.
          </GlassBubble>
        </div>

        {/* 2: bottom-left */}
        <div className="w-full flex items-center justify-center md:col-start-1 md:row-start-2 md:justify-self-start">
          <GlassBubble
            className="p-4 w-[90vw] md:w-full md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
            smallFont
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={400}
          >
            My first major task at jhana was to scrape what was at the time some 12 million legal documents across
            judicial, legislative, and tribunal databases. I set it up to run autonomously, and they have been
            running since.
          </GlassBubble>
        </div>

        {/* 3: bottom-right */}
        <div className="w-full flex items-center justify-center md:col-start-2 md:row-start-2 md:justify-self-end">
          <GlassBubble
            className="p-4 w-[90vw] md:w-full md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
            smallFont
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={600}
          >
            We received an initial $40k in grants from Emergent Ventures and ZFellows. During this time, we worked
            for no pay, and went into personal debt to get jhana off the ground. That funding went to bare minimum
            corporate and living expenses, as well as to our first employee, Amanullah Qaiser, a recent law school
            grad.
          </GlassBubble>
        </div>

        {/* 4: top-right image (must appear last) */}
        <GlassBubble
          wrapperClassName="w-full md:col-span-1 md:col-start-2 md:row-start-1"
          // Mobile: shorter bubble (half-height-ish) with centered crop; Desktop: square
          className="p-2 w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem] lg:max-w-[20rem] aspect-[2/1] md:aspect-square mx-auto"
          fadeIn
          fadeDurationMs={800}
          fadeDelayMs={800}
        >
          <ProgressiveImage
            basePath="/photos/IMG_6426"
            fallbackSrc="/photos/IMG_6426.jpeg"
            alt="IMG_6426"
            className="w-full h-full object-cover object-center rounded-[20px]"
            loading="eager"
          />
        </GlassBubble>
      </div>
    </div>
  ),
  chevronLabels: {
    right: "Work",
    up: "As CTO",
    down: "As Founder",
  },
  mapTitle: "jhana",
};
