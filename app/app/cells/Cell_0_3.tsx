import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_0_3: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 content-center grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-center md:items-start">
          <div className="order-2 md:order-2 w-full flex items-center justify-center md:items-start">
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 w-[90vw] md:w-full md:max-w-none">
              <GlassBubble
                className="p-4 w-full text-xs sm:text-sm md:text-sm lg:text-base"
                smallFont
                fadeIn
                fadeDurationMs={800}
                fadeDelayMs={350}
              >
                      <h1 className="font-semibold text-sm md:text-base lg:text-lg mb-2 text-center w-full">As Coufounder</h1>
                  In our first month, we went door-to-door at law firms, chambers, and in-house legal teams in Delhi and Chennai. Wherever we’d be heard out, we presented our first product concept, which was a searchable legal database and AI chatbot, and refined our product and target market based on these conversations.
                  </GlassBubble>

              <GlassBubble
                className="p-4 w-full text-xs sm:text-sm md:text-sm lg:text-base"
                smallFont
                fadeIn
                fadeDurationMs={800}
                fadeDelayMs={550}
              >
                We received an initial $40k in grants from Emergent Ventures and ZFellows. During this time, we worked for no pay, and all went into personal debt to get jhana off the ground. That funding went to bare minimum corporate and living expenses, as well as to our first employee, Amanullah Qaiser, a recent law school grad. 
                </GlassBubble>

              <GlassBubble
                className="p-4 w-full text-xs sm:text-sm md:text-sm lg:text-base"
                smallFont
                fadeIn
                fadeDurationMs={800}
                fadeDelayMs={750}
              >
                By late 2023, we were raising our first funding round. We quickly received a lot of VC attention, even in a funding drought, and accepted an investment from Together Fund of 1.5 million dollars. For the next half year, we rounded up family, friends, and other contacts to add another 100k to this round. 
                </GlassBubble>
            </div>
          </div>

          <GlassBubble
            wrapperClassName="order-1 md:order-1 md:self-center"
            className="p-2 w-full max-w-[15rem] sm:max-w-[17rem] md:max-w-[24rem] lg:max-w-[26rem] xl:max-w-[30rem] aspect-[2/1] md:aspect-auto mx-auto"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={200}
          >
            <img
              src="/photos/tf1.jpg"
              alt="Graduation photo"
              className="w-full h-full md:h-auto object-cover md:object-contain rounded-[20px]"
              loading="eager"
            />
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up: "jhana",
    right: "Pre-Career",
  },
  imagePaths: ["/photos/tf1"],
};
