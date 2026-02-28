import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_2_1: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-start">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-full max-w-[75%] mx-auto">
            <GlassBubble
              className="p-4 w-full text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={0}
            >
                    <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">Education</h1>
              I graduated from my hometown&apos;s Medfield High in 2018. Back then, I loved building sets for the theater club.
            </GlassBubble>

            <GlassBubble
              className="p-4 w-full text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={150}
            >
              I enjoyed my time at Harvard from 2018 to 2022. I got my B.A. in physics, and dedicated significant parts of my studies to computer science, data, and mathematics. I also received a language citation, which is like a minor, in Italian.
            </GlassBubble>

            <GlassBubble
              className="p-4 w-full text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={300}
            >
              During the COVID-19 pandemic, I took my college classes online from an apartment in Burlington, Vermont that I shared with several classmates. I tutored online for cash and learned to hate skiing in the one semester I took off.
            </GlassBubble>
          </div>

          <GlassBubble
            className="p-2 w-full max-w-[11.5rem] sm:max-w-[13rem] md:max-w-[18rem] lg:max-w-[22rem] aspect-[2/1] md:aspect-[3/4] mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={100}
          >
            <img
              src="/photos/0D5FA583-.jpg"
              alt="Graduation photo"
              className="w-full h-full object-cover object-[55%_15%] md:object-center rounded-[20px]"
            />
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    down:"Home",
    up:"Physics",
    right:"Italian",
    left:"CompSci"
  },
};
