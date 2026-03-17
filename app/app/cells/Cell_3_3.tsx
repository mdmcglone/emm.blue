import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";
import { ProgressiveImage } from "../components/ProgressiveImage";

export const Cell_3_3: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(3.5rem,10vw,7rem)] py-[clamp(2.25rem,6vh,4rem)]">
        <div className="grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 content-center grid-cols-1 md:grid-cols-3 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-2 sm:gap-y-3 md:gap-y-3 items-center justify-items-center">
          <div className="w-full flex items-center justify-center md:col-start-3 md:row-start-1">
            <GlassBubble
              className="p-3 sm:p-4 w-[90vw] md:w-full md:max-w-[38rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-1.5 text-center w-full">Exercise</h1>
              I started indoor rock climbing in 2021 and have continued the sport on and off since. I&apos;ve
              participated in a few competitions, and at my peak, won a small one in Chennai. Only once did I climb
              outdoors, and it was great, but shredded my callouses horribly.
            </GlassBubble>
          </div>

          <GlassBubble
            wrapperClassName="w-full md:col-start-2 md:row-start-2 justify-self-center"
            className="p-2 w-full max-w-[17rem] mx-auto aspect-[2/1] md:aspect-square"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={400}
          >
            
            <ProgressiveImage
              basePath="/photos/outdoorclimbing"
              fallbackSrc="/photos/outdoorclimbing.jpg"
              alt="Outdoor climbing"
              className="w-full h-full object-cover object-center rounded-[20px]"
              loading="eager"
            />


          </GlassBubble>

          <div className="w-full flex items-center justify-center md:col-start-1 md:row-start-3">
            <GlassBubble
              className="p-3 sm:p-4 w-[90vw] md:w-full md:max-w-[25rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              Rock climbing, however, is a high-impact and high-effort sport, and doesn&apos;t serve well for consistent
              exercise, so lately I&apos;ve been focusing on my cardio and getting into running.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-start-3 md:row-start-3">
            <GlassBubble
              className="p-3 sm:p-4 w-[90vw] md:w-full md:max-w-[25rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={800}
            >
              When possible, my favorite exercise is hiking. I especially like climbing smallish mountains like the
              White Mountains in New Hampshire. I once got lost in the New Hampshire woods with my dad, and we hiked an
              extra ten miles in the rain to get out.
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up: "Family",
    left: "Hobbies",
    down:  "Games"
  },
  imagePaths: ["/photos/outdoorclimbing"],
};
