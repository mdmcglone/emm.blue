import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_3_1: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-[clamp(3.5rem,10vw,7rem)] py-[clamp(4rem,10vh,6rem)]">
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:grid-rows-3 md:gap-6">
          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-3 md:row-start-1 md:justify-self-end"
            className="p-4 w-full max-w-[26rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={0}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2">Italiano</h1>
            Ho studiato la lingua italiana per quattro anni all&apos;universita. All&apos;inizio dovevo solo studiare la
            lingua per un requisito di laurea, ma ho imparato presto ad amarla. Ho guadagnato una "Citazione" in
            italiano, che e un tipo di laurea breve.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-2 md:row-start-2"
            className="p-4 w-full max-w-[26rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={150}
          >
            Purtroppo, dal 2022, non ho avuto la fortuna di praticare il mio italiano, specialmente in una situazione
            di immersione linguistica. Spero di poter visitare, o forse lavorare, in Italia presto. Parlavo quasi
            fluentemente quattro anni fa; penso di riuscire a ricordarla in poco tempo.
          </GlassBubble>

          <GlassBubble
            wrapperClassName="w-full justify-self-center md:col-start-1 md:row-start-3 md:justify-self-start"
            className="p-4 w-full max-w-[26rem] mx-auto md:mx-0 text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={300}
          >
            Non sono un bravo scrittore, ma la mia cosa preferita che ho mai scritto e stato un breve racconto in
            italiano. Ho scritto della vita delle effimere, insetti che vivono solo un giorno. Pero, ho perso il
            file, cosi tanto come le effimere, il mio racconto e finito troppo presto.
          </GlassBubble>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    left: "Education",
    down: "Home",
    right: "Travel"
  },
};
