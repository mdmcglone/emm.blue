import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_1_1: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="flex flex-col md:grid w-full md:grid-cols-3 gap-4 md:gap-6 items-center justify-items-center md:h-screen">
          {/* Row 1, Col 1: Bubble 1 */}
          <div className="w-full md:h-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-full max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={0}
            >
              <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 w-full">Computer Science</h1>
              I first touched code in middle school as part of the "Hour of Code" movement, and took a few classes in high school, but my proper education started at Harvard.
            </GlassBubble>
          </div>

          {/* Row 1, Col 2: Bubble 2 */}
          <div className="w-full md:h-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-full max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={100}
            >
              At college, I studied both computer and data science, and learned to write C++, Python, R, SQL, and more. Around this time, GPT3 was released, which piqued my interest more than anything else. I felt that code was not only exciting and artful, but also had the ability to practically affect the world for the better, especially with the advent of LLMs.
            </GlassBubble>
          </div>

          {/* Row 1, Col 3: Empty */}
          <div className="hidden md:block w-full md:h-full"></div>

          {/* Row 2, Col 1: Empty */}
          <div className="hidden md:block w-full md:h-full"></div>

          {/* Row 2, Col 2: Bubble 3 */}
          <div className="w-full md:h-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-full max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              My real education, though, came when I started jhana. The first year of my startup was a trial-by-fire – by day, I built production systems for the first time, while by night, I was self-educating and self-improving.
            </GlassBubble>
          </div>

          {/* Row 2, Col 3: Bubble 4 */}
          <div className="w-full md:h-full flex items-center justify-center">
            <GlassBubble
              className="p-4 w-full max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={300}
            >
              After jhana was funded, I became CTO. I interviewed dozens of candidates and hired five engineers over two years. My job shifted more and more into giving technical leadership and reviewing code, than writing it myself. I learned client and employee management skills, agile development, and how to scale systems and teams.
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    down: "Work",
    left: "jhana",
    right: "Education"
  },
};
