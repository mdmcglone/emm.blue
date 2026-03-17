import { CellConfig } from "./types";
import { GlassBubble } from "../components/GlassBubble";

export const Cell_3_4: CellConfig = {
  content: (
    <>
      <div className="w-screen max-w-none px-0 md:px-[clamp(3.5rem,10vw,7rem)] py-[clamp(2rem,5vh,3rem)]">
        {/* Mobile: simple vertical stack, centered */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-11rem)] gap-3 sm:gap-4 md:hidden">
          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={0}
          >
            <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">
              Video Games
            </h1>
            I've been a lifelong gamer, and I still play when I have the time, largely on Switch or PC.
          </GlassBubble>

          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={100}
          >
            I love indie games most of all. I think they contain not only the strongest expressions of art in this media
            format, through their sounds, visuals, and especially stories, but also consistently out-compete AAA games
            in terms of gameplay and mechanics.
          </GlassBubble>

          <GlassBubble
            className="p-4 w-[90vw] text-xs sm:text-sm md:text-sm lg:text-base text-center"
            fadeIn
            fadeDurationMs={800}
            fadeDelayMs={200}
          >
            <h2 className="font-semibold text-sm md:text-base lg:text-lg mb-2 text-center w-full">Stats</h2>
            <div className="space-y-1 text-xs sm:text-sm md:text-sm lg:text-base">
              <div><strong>Favorite Story</strong> - Undertale / Outer Wilds</div>
              <div><strong>Favorite Gameplay</strong> - Hollow Knight</div>
              <div><strong>Most Played Series</strong> - Pokémon</div>
              <div><strong>Most Played Game</strong> - Europa Universalis IV</div>
              <div><strong>Most Played Multiplayer Game</strong> - Overwatch</div>
              <div><strong>Preferred Battle Royale</strong> - Apex Legends</div>
              <div><strong>Best Party Game</strong> - Super Smash Bros</div>
              <div><strong>Current Game</strong> - Pokopia</div>
            </div>
          </GlassBubble>
        </div>

        {/* Desktop: 1 left, 2 right, 3 center */}
        <div className="hidden md:flex md:flex-col w-full min-h-[calc(100vh-11rem)] md:min-h-0 items-center justify-center relative">
          {/* Top row: 1 left, 2 right */}
          <div className="flex w-full items-start justify-between gap-4 md:gap-5 mb-4">
            {/* 1 - left */}
            <div className="flex-shrink-0 w-full max-w-[24rem]">
              <GlassBubble
                className="p-4 w-full text-xs sm:text-sm md:text-sm lg:text-base"
                fadeIn
                fadeDurationMs={800}
                fadeDelayMs={0}
              >
                <h1 className="font-semibold text-base md:text-lg lg:text-xl mb-2 text-center w-full">
                  Video Games
                </h1>
                I've been a lifelong gamer, I still play when I have the time, largely on Switch or PC.
              </GlassBubble>
            </div>

            {/* 2 - right, positioned slightly lower */}
            <div className="flex-shrink-0 w-full max-w-[24rem] mt-8">
              <GlassBubble
                className="p-4 w-full text-xs sm:text-sm md:text-sm lg:text-base"
                fadeIn
                fadeDurationMs={800}
                fadeDelayMs={100}
              >
                I love indie games most of all. I think they contain not only the strongest expressions of art in this
                media format, through their sounds, visuals, and especially stories, but also consistently out-compete
                AAA games in terms of gameplay and mechanics.
              </GlassBubble>
            </div>
          </div>

          {/* 3 - bottom center */}
          <div className="w-full max-w-[24rem]">
            <GlassBubble
              className="p-4 w-full text-xs sm:text-sm md:text-sm lg:text-base text-center"
              fadeIn
              fadeDurationMs={800}
              fadeDelayMs={200}
            >
              <h2 className="font-semibold text-sm md:text-base lg:text-lg mb-2 text-center w-full">Stats</h2>
              <div className="space-y-1 text-xs sm:text-sm md:text-sm lg:text-base">
                <div><strong>Favorite Story</strong> - Undertale / Outer Wilds</div>
                <div><strong>Favorite Gameplay</strong> - Hollow Knight</div>
                <div><strong>Most Played Series</strong> - Pokémon</div>
                <div><strong>Most Played Game</strong> - Europa Universalis IV</div>
                <div><strong>Most Played Multiplayer Game</strong> - Overwatch</div>
                <div><strong>Preferred Battle Royale</strong> - Apex Legends</div>
                <div><strong>Best Party Game</strong> - Super Smash Bros</div>
                <div><strong>Current Game</strong>: Pokopia</div>
              </div>
            </GlassBubble>
          </div>
        </div>
      </div>
    </>
  ),
  chevronLabels: {
    up: "Exercise",
    left: "About"
  },
};
