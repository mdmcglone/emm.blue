import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_2_3: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          <GlassBubble
            wrapperClassName="col-span-2 row-start-1 justify-self-center"
            className="p-4 w-full max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={800}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">Hobbies</h1>
            I love to hike. It is physically straining for me to be too far from nature.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-start-1 row-start-3 justify-self-end w-full"
            className="p-4 w-full max-w-[26rem] ml-auto text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={900}
          >
            I like to keep active when life does not get in the way. I am a pretty good rock climber.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-start-1 row-start-2 justify-self-end w-full"
            className="p-4 w-full max-w-[26rem] ml-auto text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1000}
          >
            I have about several coding projects going at any time. I especially like making silly conveniences for myself, like a YouTube wrapper that only shows the most viewed parts.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-start-2 row-start-2 justify-self-start w-full"
            className="p-4 w-full max-w-[26rem] mr-auto text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1100}
          >
            I appreciate video games both as a toy and an art. I am excessively competitive when friends are playing with me. I like coding them too, but it is not exactly within my skillset.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-start-2 row-start-3 justify-self-start w-full"
            className="p-4 w-full max-w-[26rem] mr-auto text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1200}
          >
            I am an obsessive Game of Thrones fan. The most frequently used phrase in my whole life is "In the books..."
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up:"Home",
    left:"Pre-Career",
    right:"Exercise",
    down:"Projects",    
  },
};
