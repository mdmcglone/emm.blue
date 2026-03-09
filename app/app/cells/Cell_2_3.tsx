import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_2_3: CellConfig = {
  content: (
    <>
      <div className="w-[90vw] md:w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full min-h-[calc(100dvh-11rem)] md:min-h-0 content-center grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-span-2 md:row-start-1"
            className="p-4 w-[90vw] md:w-full md:max-w-[26rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={0}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">Hobbies</h1>
            I love to hike. It is physically straining for me to be too far from nature.
          </GlassBubble>


          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-1 md:row-start-2 md:justify-self-end"
            className="p-4 w-[90vw] md:w-full md:max-w-[26rem] md:ml-auto text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={150}
          >
            I have about several coding projects going at any time. I especially like making silly conveniences for myself, like a YouTube wrapper that only shows the most viewed parts.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-2 md:row-start-2 md:justify-self-start"
            className="p-4 w-[90vw] md:w-full md:max-w-[26rem] md:mr-auto text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={150}
          >
            I appreciate video games both as a toy and an art. I am excessively competitive when friends are playing with me. I like coding them too, but it is not exactly within my skillset.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-2 md:row-start-3 md:justify-self-start md:translate-x-8 lg:translate-x-12"
            className="p-4 w-[90vw] md:w-full md:max-w-[26rem] md:mr-auto text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={300}
          >
            I am an obsessive Game of Thrones fan. The most frequently used phrase in my whole life is "In the books..."
          </GlassBubble>
          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-1 md:row-start-3 md:justify-self-end md:-translate-x-8 lg:-translate-x-12"
            className="p-4 w-[90vw] md:w-full md:max-w-[26rem] md:ml-auto text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={300}
          >
            I like to keep active when life doesn't get in the way. I am a pretty good rock climber.
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up:"Home",
    left:"Pre-Career",
    right:"Exercise",
    down:"About",    
  },
};
