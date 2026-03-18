import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";
import { ProgressiveImage } from "../components/ProgressiveImage";

export const Cell_3_2: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 content-center grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 items-center justify-items-center">
          <div className="w-full flex items-center justify-center md:col-start-1 md:row-start-1 md:justify-self-start">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-left w-full">My life writ small</h1>

              I currently live in India. Despite the distance, I am very close with my family, and never miss a Christmas.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-start-3 md:row-start-1 md:justify-self-end">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={400}
            >
              I was born and grew up in Medfield, Massachusetts in 1999. I went to college just down the road at Harvard. Then I went to build my startup just down the road in Bangalore, India.
            </GlassBubble>
          </div>

          <GlassBubble
            wrapperClassName="w-full md:col-span-1 md:col-start-2 md:row-start-2"
            className="p-2 w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem] lg:max-w-[20rem] aspect-[2/1] md:aspect-[2/1] lg:aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1000}
          >
            <ProgressiveImage
              basePath="/photos/fam"
              fallbackSrc="/photos/fam.jpg"
              alt="Family"
              className="w-full h-full object-cover object-[50%_15%] lg:object-center rounded-[20px]"
              loading="eager"
            />
          </GlassBubble>

          <div className="w-full flex items-center justify-center md:col-start-1 md:row-start-3 md:justify-self-end">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={800}
            >
              I proposed to my fiancée, Vandhana, in Goa, the day after I quit my startup, in February 2026.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-start-3 md:row-start-3 md:justify-self-start">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              I use they/she pronouns, but I have dressed better in the past.
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    left: "Home",
    down: "Exercise",
    up: "Italiano",
    right: "Family"
  },
  imagePaths: ["/photos/fam"],
};
