import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_3_2: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 items-center justify-items-center">
          <GlassBubble
            wrapperClassName="col-start-1 row-start-1 justify-self-start w-full"
            className="p-4 w-full max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={800}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-left w-full">My life writ small</h1>

            I currently live in India. Despite the distance, I am very close with my family, and never miss a Christmas.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-start-2 row-start-1 md:col-start-3 justify-self-end w-full"
            className="p-4 w-full max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={900}
          >
            I was born and grew up in Medfield, Massachusetts in 1999. I went to college just down the road at Harvard. Then I went to build my startup just down the road in Bangalore, India.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-span-2 sm:col-span-2 md:col-span-1 md:col-start-2 md:row-start-2 w-full"
            className="p-2 w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem] lg:max-w-[20rem] aspect-[2/1] md:aspect-[2/1] lg:aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={950}
          >
            <img
              src="/photos/fam.jpg"
              alt="Family"
              className="w-full h-full object-cover object-[50%_15%] lg:object-center rounded-[20px]"
            />
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-start-1 row-start-3 md:col-start-1 md:row-start-3 justify-self-end w-full"
            className="p-4 w-full max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1050}
          >
            I proposed to my fiancée, Vandhana, in Goa, the day after I quit my startup, in February 2026.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="col-start-2 row-start-3 md:col-start-3 md:row-start-3 justify-self-start w-full"
            className="p-4 w-full max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1150}
          >
            I use they/she pronouns, but I have dressed better in the past.
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    left: "Home",
    down: "Exercise",
    up: "Italian",
    right: "Family"
  },
};
