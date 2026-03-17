import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_3_1: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full min-h-[calc(100vh-11rem)] md:min-h-0 content-center grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:grid-rows-3 md:gap-6">
          <div className="w-full flex items-center justify-center md:col-start-3 md:row-start-1 md:justify-self-end">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[26rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2">Italiano</h1>
              Ho studiato la lingua italiana per quattro anni all&apos;universita. All&apos;inizio dovevo solo studiare la
              lingua per un requisito di laurea, ma ho imparato presto ad amarla. Ho guadagnato una "
              <a
                href="https://oue.fas.harvard.edu/academics/special-learning-opportunities/language-citation/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-blue-300 underline-offset-2 text-blue-300 hover:cursor-pointer"
              >
                Citazione di Lingua
              </a>
              " in italiano, che e un tipo di laurea breve.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-start-2 md:row-start-2">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[26rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={400}
            >
              Purtroppo, dal 2022, non ho avuto la fortuna di praticare il mio italiano, specialmente in una situazione
              di immersione linguistica. Spero di poter visitare, o forse lavorare, in Italia presto. Parlavo quasi
              fluentemente quattro anni fa; credo di riuscire a ricordarla in poco tempo.
            </GlassBubble>
          </div>

          <div className="w-full flex items-center justify-center md:col-start-1 md:row-start-3 md:justify-self-start">
            <GlassBubble
              className="p-4 w-[90vw] md:w-full md:max-w-[26rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={600}
            >
              Non sono un bravo scrittore, ma la mia cosa preferita che ho mai scritto e stato un breve racconto in
              italiano. Ho scritto della vita delle effimere, insetti che vivono solo un giorno. Pero, ho perso il
              file, cosi tanto come le effimere, il mio racconto e finito troppo presto.
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    left: "Education",
    down: "Me",
    right: "Travel"
  },
};
