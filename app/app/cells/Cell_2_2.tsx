import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_2_2: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full grid-cols-2 md:grid-cols-3 items-center justify-items-center gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-2 sm:gap-y-3 md:gap-y-2">
          <GlassBubble
            wrapperClassName="col-span-2 row-start-1 justify-self-center md:col-span-1 md:col-start-2 md:row-start-1"
            className="p-3 text-xs max-w-[16rem] sm:max-w-[18rem] md:p-4 md:text-sm md:max-w-[21rem] lg:text-lg"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={800}
          >
            <h1 className="font-semibold text-sm md:text-base lg:text-xl flex justify-center items-center">Hi!</h1>
            <div className="text-[11px] md:text-sm lg:text-base">My name is Em McGlone, welcome to my site. If you'd like to get to know me better, personally or professionally, feel free to explore.</div>
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-span-2 row-start-2 justify-self-center md:col-span-1 md:col-start-2 md:row-start-3 md:-mt-6 lg:-mt-8"
            className="p-3 text-xs max-w-[16rem] sm:max-w-[18rem] md:p-4 md:text-sm md:max-w-[21rem] lg:text-lg"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={900}
          >
            <div className="text-[11px] md:text-sm lg:text-base">This site is loosely organized like a mood board - whatever you want to learn about, move in that direction, and I&apos;ll divulge more specifics as you go.</div>
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-start-1 row-start-3 w-full justify-self-center md:col-start-1 md:row-start-2 md:-mt-3"
            className="p-2 w-full max-w-[7.25rem] sm:max-w-[8.5rem] md:max-w-[10rem] lg:max-w-[12rem] aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1000}
          >
            <img
              src="/chair.jpeg"
              alt="Relaxing in a chair with coffee"
              className="w-full h-full object-cover rounded-[20px]"
            />
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-start-2 row-start-3 w-full justify-self-center md:col-start-3 md:row-start-2 md:-mt-3"
            className="p-2 w-full max-w-[7.25rem] sm:max-w-[8.5rem] md:max-w-[10rem] lg:max-w-[12rem] aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1100}
          >
            <img
              src="/binocularts.jpeg"
              alt="Looking through binoculars"
              className="w-full h-full object-cover rounded-[20px]"
            />
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up: "Education",
    down: "Hobbies",
    left: "Work",
    right: "Personal",
  },
};
