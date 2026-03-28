import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_0_1: CellConfig = {
  content: (
    <div className="w-screen max-w-none px-0 md:px-[clamp(3rem,8vw,5.5rem)] py-[clamp(4rem,10vh,6rem)]">
      <div className="grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 items-center justify-items-center content-center">
        {/* Row 1: hiring */}
        <div className="w-full flex items-center justify-center md:col-span-2">
          <GlassBubble className="p-4 w-[92vw] md:w-full md:max-w-[38rem] text-xs sm:text-sm md:text-sm lg:text-base" smallFont fadeIn fadeDurationMs={800} fadeDelayMs={200}>
            <h1 className="font-semibold text-sm md:text-base lg:text-lg mb-2 text-center w-full">As CTO</h1>
            My small tech team created and maintained three products. First was{" "}
            <a
              href="https://jhana.ai"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-blue-300 underline-offset-2 text-blue-300 hover:cursor-pointer"
            >
              jhana.ai
            </a>
            , our main legal search and chat products, which by my exit had 9,000 weekly active users. Second was{" "}
            <a
              href="https://jhana.ai/courtroom"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-blue-300 underline-offset-2 text-blue-300 hover:cursor-pointer"
            >
              jhana Courtroom
            </a>
            , our public sector offerings, which I got the High Courts of Karnataka and Madras onboarded to. Finally, there was{" "}
            <a
              href="https://jhana.ai/steno/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-blue-300 underline-offset-2 text-blue-300 hover:cursor-pointer"
            >
              jhana Steno
            </a>
            , a multilingual voice-to-text service, which didn’t have much success on its own, but is now integrated across jhana products.
          </GlassBubble>
        </div>

        {/* Row 2: cloud + products */}
        <div className="w-full flex items-center justify-center">
          <GlassBubble className="p-4 w-[92vw] md:w-full md:max-w-[31rem] text-xs sm:text-sm md:text-sm lg:text-base" smallFont fadeIn fadeDurationMs={800} fadeDelayMs={350}>
            I was the cloud tsar at jhana; I became adept enough at AWS, GCP, and Azure to run all cloud services solo. I was also responsible for acquiring $500,000 in cloud credits, and migrating from AWS to GCP in order to utilize credits better.
          </GlassBubble>
        </div>

        <div className="w-full flex items-center justify-center">
          <GlassBubble className="p-4 w-[92vw] md:w-full md:max-w-[31rem] text-xs sm:text-sm md:text-sm lg:text-base" smallFont fadeIn fadeDurationMs={800} fadeDelayMs={500}>
            At jhana, we maintained a very strict hiring funnel, and high expectations for employees. I read hundreds of applications, chose dozens of people for multiple rounds of interviews, and hired eight. The hardest part, though, was firing underperforming employees. At peak, I managed a{" "}
            <a
              href="https://jhana.ai/about"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-blue-300 underline-offset-2 text-blue-300 hover:cursor-pointer"
            >
              team of five engineers
            </a>
            .
          </GlassBubble>
        </div>

        {/* Row 3: besides */}
        <div className="w-full flex items-center justify-center md:col-span-2">
          <GlassBubble className="p-4 w-[92vw] md:w-full md:max-w-[38rem] text-xs sm:text-sm md:text-sm lg:text-base" smallFont fadeIn fadeDurationMs={800} fadeDelayMs={650}>
            Besides product development, my team also worked on research and experimentation, data acquisition, bug fixing and maintenance, and forward-deployed engineering for our High Court contracts. Within all this, I handled project management, delegation and assignments, version control, all while writing much of the code myself.
          </GlassBubble>
        </div>
      </div>
    </div>
  ),
  chevronLabels: {
    right: "Coding",
    down: "jhana",
  },
  mapTitle: "As CTO",
};
