import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_4_2: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(2.5rem,8vw,5rem)] py-[clamp(3rem,8vh,5rem)]">
        <div className="grid w-full grid-cols-2 gap-x-3 sm:gap-x-3 md:gap-x-4 lg:gap-x-4 xl:gap-x-5 gap-y-2 sm:gap-y-3 md:gap-y-3 lg:gap-y-3 items-center justify-items-center lg:grid-cols-4 lg:grid-rows-4">
          {/* Top photos */}
          <GlassBubble
            wrapperClassName="w-full lg:col-start-1 lg:row-start-1"
            className="p-2 w-full max-w-[9rem] sm:max-w-[10rem] md:max-w-[11rem] lg:max-w-[11rem] xl:max-w-[12rem] aspect-[2/1] sm:aspect-[2/1] md:aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={0}
          >
            <img
              src="/photos/dad.jpeg"
              alt="Dad"
              className="w-full h-full object-cover object-center rounded-[20px]"
            />
          </GlassBubble>
          <GlassBubble
            wrapperClassName="w-full lg:col-start-4 lg:row-start-1"
            className="p-2 w-full max-w-[9rem] sm:max-w-[10rem] md:max-w-[11rem] lg:max-w-[11rem] xl:max-w-[12rem] aspect-[2/1] sm:aspect-[2/1] md:aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={50}
          >
            <img
              src="/photos/mom.jpg"
              alt="Mom"
              className="w-full h-full object-cover rounded-[20px] object-[50%_25%] sm:object-[50%_25%] md:object-center lg:object-center"
            />
          </GlassBubble>

          {/* Middle blurbs */}
          <GlassBubble
            wrapperClassName="w-full lg:col-start-2 lg:row-start-2 lg:justify-self-center"
            className="p-3 w-full max-w-[18rem] sm:max-w-[19rem] md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base mx-auto text-center"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={100}
          >
            My dad lives in New Hampshire with his girlfriend. They have a French Bulldog called Kash. He is a lawyer by trade (my dad not the dog).
          </GlassBubble>
          <GlassBubble
            wrapperClassName="w-full lg:col-start-3 lg:row-start-2 lg:justify-self-center"
            className="p-3 w-full max-w-[18rem] sm:max-w-[19rem] md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base mx-auto text-center"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={150}
          >
            My mom lives in Massachusetts with her husband. Her house is always my home when I am in the US. She has always worked in communications, besides when she was raising me and my sister.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full lg:col-start-2 lg:row-start-3 lg:justify-self-center"
            className="p-3 w-full max-w-[18rem] sm:max-w-[19rem] md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base mx-auto text-center"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={300}
          >
            I met my fiancée, Vandhana, at Chennai Pride in 2023. We have been inseparable since. She studied economics and works in development.
          </GlassBubble>
          <GlassBubble
            wrapperClassName="w-full lg:col-start-3 lg:row-start-3 lg:justify-self-center"
            className="p-3 w-full max-w-[18rem] sm:max-w-[19rem] md:max-w-[20rem] text-xs sm:text-sm md:text-sm lg:text-base mx-auto text-center"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={350}
          >
            My sister, Abi, lives in New York City with her cat and her boyfriend. Her cat’s name is Gigi, she is from Florida. Abi is an incredible social worker.
          </GlassBubble>

          {/* Bottom photos */}
          <GlassBubble
            wrapperClassName="w-full lg:col-start-1 lg:row-start-4"
            className="p-2 w-full max-w-[9rem] sm:max-w-[10rem] md:max-w-[11rem] lg:max-w-[11rem] xl:max-w-[12rem] aspect-[2/1] sm:aspect-[2/1] md:aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={200}
          >
            <img
              src="/photos/vandhana.jpeg"
              alt="Vandhana"
              className="w-full h-full object-cover object-center rounded-[20px]"
            />
          </GlassBubble>
          <GlassBubble
            wrapperClassName="w-full lg:col-start-4 lg:row-start-4"
            className="p-2 w-full max-w-[9rem] sm:max-w-[10rem] md:max-w-[11rem] lg:max-w-[11rem] xl:max-w-[12rem] aspect-[2/1] sm:aspect-[2/1] md:aspect-square mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={250}
          >
            <img
              src="/photos/abi.jpeg"
              alt="Abi"
              className="w-full h-full object-cover object-center rounded-[20px]"
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
};
