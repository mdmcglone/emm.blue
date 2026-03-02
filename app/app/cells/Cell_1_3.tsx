import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_1_3: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(3rem,9vw,6rem)] py-[clamp(4rem,10vh,6rem)]">
        {/* On md+ treat as row, keep centered but allow bubble content no forced min-height */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 md:flex-row md:items-center md:justify-center md:gap-7 lg:gap-10">
          <GlassBubble
            className="
              p-4 w-full max-w-[28rem] text-xs sm:text-sm md:text-sm lg:text-base text-center
              md:max-w-[15rem] lg:max-w-[19rem]
            "
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={0}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center lg:hidden">
              Pre-Career
            </h1>
            I started my first job in 2016, as a “party attendant” for kids' birthday parties, at Jump Trax, a warehouse full of inflatable bouncy houses. Here I became good at cutting cakes and standing still. I took more shifts here than anyone besides the manager.
          </GlassBubble>

          <GlassBubble
            className="
              p-4 w-full max-w-[28rem] text-xs sm:text-sm md:text-sm lg:text-base text-center
              md:max-w-[15rem] lg:max-w-[19rem]
            "
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={150}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center hidden lg:block">
              Pre-Career
            </h1>
            Throughout college and COVID, I tutored high school students online. Primarily, I taught SAT Prep, but I quite enjoyed the few classes where I taught AP Physics and Python.
          </GlassBubble>

          <GlassBubble
            className="
              p-4 w-full max-w-[28rem] text-xs sm:text-sm md:text-sm lg:text-base text-center
              md:max-w-[15rem] lg:max-w-[19rem]
            "
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={300}
          >
            In early 2022, I consulted for an Associate Professor at University of Utah, Dr. Shawna Sisler. I helped her with R code associated with a suicidology paper she was writing, and assisted her with some PCA / hyperparameter tuning methods. I spoke about our use of these methods at an American Association of Suicidology conference.
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up: "Work",
    down: "About",
    left: "jhana",
    right: "Hobbies",
  },
};
