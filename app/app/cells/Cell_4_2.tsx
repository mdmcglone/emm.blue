import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";
import { ProgressiveImage } from "../components/ProgressiveImage";

export const Cell_4_2: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(2.5rem,8vw,5rem)] py-[clamp(3rem,8vh,5rem)]">
        <div className="grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 content-center grid-cols-1 gap-x-3 sm:gap-x-3 md:gap-x-4 lg:gap-x-4 xl:gap-x-5 gap-y-2 sm:gap-y-3 md:gap-y-3 lg:gap-y-3 items-center justify-items-center lg:grid-cols-4 lg:grid-rows-4">
          {/* Top photos - mobile corners */}
          <div className="w-full flex items-center justify-between px-4 lg:hidden">
            <GlassBubble
              className="p-2 flex-shrink-0 w-[9rem] sm:w-[10rem] aspect-[2/1] sm:aspect-[2/1]"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <ProgressiveImage
                basePath="/photos/dad"
                fallbackSrc="/photos/dad.jpeg"
                alt="Dad"
                className="w-full h-full object-cover object-center rounded-[20px]"
                loading="eager"
              />
            </GlassBubble>
            <GlassBubble
              className="p-2 flex-shrink-0 w-[9rem] sm:w-[10rem] aspect-[2/1] sm:aspect-[2/1]"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={400}
            >
              <ProgressiveImage
                basePath="/photos/mom"
                fallbackSrc="/photos/mom.jpg"
                alt="Mom"
                className="w-full h-full object-cover rounded-[20px] object-[50%_25%] sm:object-[50%_25%]"
                loading="eager"
              />
            </GlassBubble>
          </div>

          {/* Top photos - desktop */}
          <GlassBubble
            wrapperClassName="hidden lg:flex w-full items-center justify-center lg:col-start-1 lg:row-start-2"
            wrapperStyle={{ transform: "translateY(clamp(-20vh, -8rem, -2rem))" }}
            className="p-2 w-full max-w-[11rem] xl:max-w-[12rem] aspect-square"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={200}
          >
            <ProgressiveImage
              basePath="/photos/dad"
              fallbackSrc="/photos/dad.jpeg"
              alt="Dad"
              className="w-full h-full object-cover object-center rounded-[20px]"
              loading="eager"
            />
          </GlassBubble>
          <GlassBubble
            wrapperClassName="hidden lg:flex w-full items-center justify-center lg:col-start-4 lg:row-start-2"
            wrapperStyle={{ transform: "translateY(clamp(-20vh, -8rem, -2rem))" }}
            className="p-2 w-full max-w-[11rem] xl:max-w-[12rem] aspect-square"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={400}
          >
            <ProgressiveImage
              basePath="/photos/mom"
              fallbackSrc="/photos/mom.jpg"
              alt="Mom"
              className="w-full h-full object-cover rounded-[20px] object-center"
              loading="eager"
            />
          </GlassBubble>

          {/* Middle blurbs */}
          <div className="w-full flex items-center justify-center lg:col-start-2 lg:row-start-2">
            <GlassBubble
              className="p-3 w-[90vw] lg:w-full lg:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base mx-auto text-center"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              My dad lives in New Hampshire with his girlfriend. They have a French Bulldog called Kash. He is a lawyer by trade (my dad not the dog).
            </GlassBubble>
          </div>
          <div className="w-full flex items-center justify-center lg:col-start-3 lg:row-start-2">
            <GlassBubble
              className="p-3 w-[90vw] lg:w-full lg:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base mx-auto text-center"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={800}
            >
              My mom lives in Massachusetts with her husband. Her house is always my home when I am in the US. She has always worked in communications, besides when she was raising me and my sister.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center lg:col-start-2 lg:row-start-3">
            <GlassBubble
              className="p-3 w-[90vw] lg:w-full lg:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base mx-auto text-center"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1000}
            >
              I met my fiancée, Vandhana, at Chennai Pride in 2023. We have been inseparable since. She studied economics and works in development.
            </GlassBubble>
          </div>
          <div className="w-full flex items-center justify-center lg:col-start-3 lg:row-start-3">
            <GlassBubble
              className="p-3 w-[90vw] lg:w-full lg:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base mx-auto text-center"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1200}
            >
              My sister, Abi, lives in New York City with her cat and her boyfriend. Her cat's name is Gigi, she is from Florida. Abi is an incredible social worker.
            </GlassBubble>
          </div>

          {/* Bottom photos - mobile corners */}
          <div className="w-full flex items-center justify-between px-4 lg:hidden">
            <GlassBubble
              className="p-2 flex-shrink-0 w-[9rem] sm:w-[10rem] aspect-[2/1] sm:aspect-[2/1]"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1400}
            >
              <ProgressiveImage
                basePath="/photos/vandhana"
                fallbackSrc="/photos/vandhana.jpeg"
                alt="Vandhana"
                className="w-full h-full object-cover object-center rounded-[20px]"
                loading="lazy"
              />
            </GlassBubble>
            <GlassBubble
              className="p-2 flex-shrink-0 w-[9rem] sm:w-[10rem] aspect-[2/1] sm:aspect-[2/1]"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={1600}
            >
              <ProgressiveImage
                basePath="/photos/abi"
                fallbackSrc="/photos/abi.jpeg"
                alt="Abi"
                className="w-full h-full object-cover object-center rounded-[20px]"
                loading="lazy"
              />
            </GlassBubble>
          </div>

          {/* Bottom photos - desktop */}
          <GlassBubble
            wrapperClassName="hidden lg:flex w-full items-center justify-center lg:col-start-1 lg:row-start-3"
            wrapperStyle={{ transform: "translateY(clamp(2rem, 20vh, 8rem))" }}
            className="p-2 w-full max-w-[11rem] xl:max-w-[12rem] aspect-square"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1400}
          >
            <ProgressiveImage
              basePath="/photos/vandhana"
              fallbackSrc="/photos/vandhana.jpeg"
              alt="Vandhana"
              className="w-full h-full object-cover object-center rounded-[20px]"
              loading="lazy"
            />
          </GlassBubble>
          <GlassBubble
            wrapperClassName="hidden lg:flex w-full items-center justify-center lg:col-start-4 lg:row-start-3"
            wrapperStyle={{ transform: "translateY(clamp(2rem, 20vh, 8rem))" }}
            className="p-2 w-full max-w-[11rem] xl:max-w-[12rem] aspect-square"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={1600}
          >
            <ProgressiveImage
              basePath="/photos/abi"
              fallbackSrc="/photos/abi.jpeg"
              alt="Abi"
              className="w-full h-full object-cover object-center rounded-[20px]"
              loading="lazy"
            />
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up: "Travel",
    left: "Me"
  },
  imagePaths: ["/photos/dad", "/photos/mom", "/photos/vandhana", "/photos/abi"],
};
