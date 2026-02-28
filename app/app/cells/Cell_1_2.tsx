import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_1_2: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:grid-rows-3 md:gap-6">
          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-1 md:row-start-1 md:justify-self-start"
            className="p-4 w-full max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={0}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2">Career</h1>
            My entire career since graduation has been dedicated to founding my legal tech startup in India, jhana. I have left the company as of early 2026, after nearly four years.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-2 md:row-start-2"
            className="p-4 w-full max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={150}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2">Pre-Career</h1>
            Before jhana, I worked from my sophomore year of high school through college graduation, in the service industry, then in various online gigs, then as a freelance data science consultant.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-3 md:row-start-3 md:justify-self-end"
            className="p-4 w-full max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={300}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2">What's Next</h1>
            My new career goal is to find a software engineering job in Europe. My dream is to lead a small, scrappy team, where we make products that improve people&apos;s lives.
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    right: "Home",
    left: "jhana",
    up: "CompSci",
    down: "Pre-Career"
  },
};
