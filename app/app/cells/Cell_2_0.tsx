import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_2_0: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="flex flex-col md:relative w-full md:h-screen justify-center md:justify-center gap-4 md:gap-0">
          {/* Bubble 1 - Left, touches center with right edge */}
          <div className="md:absolute md:left-1/2 md:-translate-x-full md:top-[25%] md:-translate-y-1/2 md:mr-[clamp(1rem,3vw,2rem)]">
            <GlassBubble
              className="p-4 w-full max-w-[22rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={0}
            >
                                  <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-left w-full">Physics</h1>
              My bachelor's degree is in physics. I was considering many courses of study in STEM fields, but I chose physics because it captured my interest the most, while also seeming a practical choice.
            </GlassBubble>
          </div>

          {/* Bubble 2 - Right, touches center with left edge */}
          <div className="md:absolute md:left-1/2 md:top-[37%] md:-translate-y-1/2 md:ml-[clamp(1rem,3vw,2rem)]">
            <GlassBubble
              className="p-4 w-full max-w-[22rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={100}
            >
              My most advanced coursework included quantum mechanics, special relativity, and electromagnetism. I worked in a lab at Harvard as well, where we demonstrated general relativity by replicating the Mössbauer effect.
            </GlassBubble>
          </div>

          {/* Bubble 3 - Left, touches center with right edge */}
          <div className="md:absolute md:left-1/2 md:-translate-x-full md:top-[55%] md:-translate-y-1/2 md:mr-[clamp(1rem,3vw,2rem)]">
            <GlassBubble
              className="p-4 w-full max-w-[22rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              I participated in an exchange program with UNIST, a university in South Korea. This was an intensive research internship focusing on renewable energy, where we studied, built, tested, and optimized solar cells and seawater batteries.
            </GlassBubble>
          </div>

          {/* Bubble 4 - Right, touches center with left edge */}
          <div className="md:absolute md:left-1/2 md:top-[67%] md:-translate-y-1/2 md:ml-[clamp(1rem,3vw,2rem)]">
            <GlassBubble
              className="p-4 w-full max-w-[22rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={300}
            >
              My experience in the labs both at Harvard and at UNIST taught me that, while I like physics and do well in the lab, I didn't see myself having a career in research. The work was too repetitive and felt too far from real problems in the real world. I finished my degree, but recommitted my education towards data and computer science instead.
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    down:"Education",
  },
};
