import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";
import { ProgressiveImage } from "../components/ProgressiveImage";

export const Cell_2_2: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 content-center grid-cols-1 md:grid-cols-3 items-center justify-items-center gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-2 sm:gap-y-3 md:gap-y-2">
          <div className="w-full flex items-center justify-center md:col-span-1 md:col-start-2 md:row-start-1">
            <GlassBubble
              className="p-3 w-[90vw] md:w-full text-xs md:p-4 md:text-sm md:max-w-[21rem] lg:text-lg"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={0}
            >
              <h1 className="font-semibold text-sm md:text-base lg:text-xl flex justify-center items-center">Hi!</h1>
              <div className="text-[11px] md:text-sm lg:text-base">My name is Em McGlone, welcome to my site. If you'd like to get to know me better, personally or professionally, feel free to explore.</div>
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-span-1 md:col-start-2 md:row-start-3 md:-mt-6 lg:-mt-8">
            <GlassBubble
              className="p-3 w-[90vw] md:w-full text-xs md:p-4 md:text-sm md:max-w-[21rem] lg:text-lg"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={400}
            >
              <div className="text-[11px] md:text-sm lg:text-base">This site is loosely organized like a mood board - whatever you want to learn about, move in that direction, and I&apos;ll divulge more specifics as you go.</div>
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center gap-3 sm:gap-4 md:hidden">
            <GlassBubble
              className="p-2 flex-shrink-0 w-[7.25rem] sm:w-[8.5rem] aspect-square"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              <ProgressiveImage
                basePath="/photos/chair"
                fallbackSrc="/photos/chair.jpeg"
                alt="Relaxing in a chair with coffee"
                className="w-full h-full object-cover rounded-[20px]"
                loading="eager"
                fetchPriority="high"
              />
            </GlassBubble>

            <GlassBubble
              className="p-2 flex-shrink-0 w-[7.25rem] sm:w-[8.5rem] aspect-square"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={900}
            >
              <ProgressiveImage
                basePath="/photos/binocularts"
                fallbackSrc="/photos/binocularts.jpeg"
                alt="Looking through binoculars"
                className="w-full h-full object-cover rounded-[20px]"
                loading="eager"
                fetchPriority="high"
              />
            </GlassBubble>
          </div>

          <GlassBubble
            wrapperClassName="hidden md:block md:col-start-1 md:row-start-2 md:-mt-3 w-full justify-self-center"
            className="p-2 w-full max-w-[10rem] lg:max-w-[12rem] aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={200}
          >
            <ProgressiveImage
              basePath="/photos/chair"
              fallbackSrc="/photos/chair.jpeg"
              alt="Relaxing in a chair with coffee"
              className="w-full h-full object-cover rounded-[20px]"
              loading="eager"
              fetchPriority="high"
            />
          </GlassBubble>

          <GlassBubble
            wrapperClassName="hidden md:block md:col-start-3 md:row-start-2 md:-mt-3 w-full justify-self-center"
            className="p-2 w-full max-w-[10rem] lg:max-w-[12rem] aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={300}
          >
            <ProgressiveImage
              basePath="/photos/binocularts"
              fallbackSrc="/photos/binocularts.jpeg"
              alt="Looking through binoculars"
              className="w-full h-full object-cover rounded-[20px]"
              loading="eager"
              fetchPriority="high"
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
    right: "Me",
  },
  imagePaths: ["/photos/chair", "/photos/binocularts"],
};
