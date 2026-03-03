"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CellConfig } from "./types";

type Ship = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  cooldown: number;
  invulnerable: number;
};

type Asteroid = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

type Bullet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

type GameState = {
  ship: Ship;
  asteroids: Asteroid[];
  bullets: Bullet[];
  score: number;
  lives: number;
  level: number;
  gameOver: boolean;
};

type Bounds = {
  w: number;
  h: number;
};

function wrap(value: number, max: number): number {
  if (max <= 0) return 0;
  if (value < 0) return value + max;
  if (value > max) return value - max;
  return value;
}

function spawnAsteroids(level: number, bounds: Bounds): Asteroid[] {
  const count = Math.min(4 + level, 10);
  const asteroids: Asteroid[] = [];
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 30 + Math.random() * 50 + level * 4;
    asteroids.push({
      x: Math.random() * bounds.w,
      y: Math.random() * bounds.h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 26 + Math.random() * 14,
    });
  }
  return asteroids;
}

function createInitialState(bounds: Bounds): GameState {
  return {
    ship: {
      x: bounds.w / 2,
      y: bounds.h / 2,
      vx: 0,
      vy: 0,
      angle: -Math.PI / 2,
      cooldown: 0,
      invulnerable: 0,
    },
    asteroids: spawnAsteroids(1, bounds),
    bullets: [],
    score: 0,
    lives: 3,
    level: 1,
    gameOver: false,
  };
}

function AsteroidsGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boundsRef = useRef<Bounds>({ w: 1, h: 1 });
  const gameRef = useRef<GameState>(createInitialState(boundsRef.current));
  const keysRef = useRef<Record<string, boolean>>({});
  const hudRef = useRef({ score: 0, lives: 3, level: 1, gameOver: false });
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);
  const [hasTouched, setHasTouched] = useState(false);
  const [joystickOffset, setJoystickOffset] = useState(0);
  const joystickPointerIdRef = useRef<number | null>(null);
  const thrustPointerIdRef = useRef<number | null>(null);
  const firePointerIdRef = useRef<number | null>(null);
  const JOYSTICK_RADIUS = 34;
  const DEAD_ZONE = 8;
  const [hud, setHud] = useState(hudRef.current);

  const syncHud = useCallback((state: GameState) => {
    const next = {
      score: state.score,
      lives: state.lives,
      level: state.level,
      gameOver: state.gameOver,
    };
    const current = hudRef.current;
    if (
      current.score !== next.score ||
      current.lives !== next.lives ||
      current.level !== next.level ||
      current.gameOver !== next.gameOver
    ) {
      hudRef.current = next;
      setHud(next);
    }
  }, []);

  const resetGame = useCallback(() => {
    const fresh = createInitialState(boundsRef.current);
    gameRef.current = fresh;
    syncHud(fresh);
  }, [syncHud]);

  useEffect(() => {
    const applySize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = Math.max(1, window.innerWidth);
      const h = Math.max(1, window.innerHeight);
      boundsRef.current = { w, h };
      canvas.width = w;
      canvas.height = h;
    };
    applySize();
    window.addEventListener("resize", applySize);
    return () => window.removeEventListener("resize", applySize);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["Space", "KeyA", "KeyD", "KeyW", "KeyR"].includes(event.code)) {
        event.preventDefault();
      }
      if (event.code === "KeyR" && hudRef.current.gameOver) {
        resetGame();
        return;
      }
      keysRef.current[event.code] = true;
    };
    const onKeyUp = (event: KeyboardEvent) => {
      keysRef.current[event.code] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const step = (dt: number) => {
      const state = gameRef.current;
      if (state.gameOver) return;
      const { w, h } = boundsRef.current;

      const keys = keysRef.current;
      const left = keys.KeyA;
      const right = keys.KeyD;
      const thrust = keys.KeyW;
      const shoot = keys.Space;

      if (left) state.ship.angle -= 3.4 * dt;
      if (right) state.ship.angle += 3.4 * dt;

      if (thrust) {
        state.ship.vx += Math.cos(state.ship.angle) * 210 * dt;
        state.ship.vy += Math.sin(state.ship.angle) * 210 * dt;
      }

      const friction = Math.pow(0.985, dt * 60);
      state.ship.vx *= friction;
      state.ship.vy *= friction;

      state.ship.x = wrap(state.ship.x + state.ship.vx * dt, w);
      state.ship.y = wrap(state.ship.y + state.ship.vy * dt, h);

      state.ship.cooldown = Math.max(0, state.ship.cooldown - dt);
      state.ship.invulnerable = Math.max(0, state.ship.invulnerable - dt);

      if (shoot && state.ship.cooldown <= 0) {
        state.ship.cooldown = 0.18;
        state.bullets.push({
          x: state.ship.x + Math.cos(state.ship.angle) * 14,
          y: state.ship.y + Math.sin(state.ship.angle) * 14,
          vx: Math.cos(state.ship.angle) * 360 + state.ship.vx,
          vy: Math.sin(state.ship.angle) * 360 + state.ship.vy,
          life: 1.2,
        });
      }

      state.bullets = state.bullets
        .map((bullet) => ({
          ...bullet,
          x: wrap(bullet.x + bullet.vx * dt, w),
          y: wrap(bullet.y + bullet.vy * dt, h),
          life: bullet.life - dt,
        }))
        .filter((bullet) => bullet.life > 0);

      state.asteroids = state.asteroids.map((asteroid) => ({
        ...asteroid,
        x: wrap(asteroid.x + asteroid.vx * dt, w),
        y: wrap(asteroid.y + asteroid.vy * dt, h),
      }));

      const remainingBullets: Bullet[] = [];
      const nextAsteroids = [...state.asteroids];

      for (const bullet of state.bullets) {
        let hitIndex = -1;
        for (let i = 0; i < nextAsteroids.length; i += 1) {
          const asteroid = nextAsteroids[i];
          const dx = bullet.x - asteroid.x;
          const dy = bullet.y - asteroid.y;
          if (dx * dx + dy * dy <= asteroid.radius * asteroid.radius) {
            hitIndex = i;
            break;
          }
        }

        if (hitIndex === -1) {
          remainingBullets.push(bullet);
          continue;
        }

        const hit = nextAsteroids[hitIndex];
        nextAsteroids.splice(hitIndex, 1);
        state.score += hit.radius > 22 ? 20 : 50;

        if (hit.radius > 22) {
          for (let split = 0; split < 2; split += 1) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 55 + Math.random() * 45;
            nextAsteroids.push({
              x: hit.x,
              y: hit.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              radius: hit.radius * 0.62,
            });
          }
        }
      }

      state.bullets = remainingBullets;
      state.asteroids = nextAsteroids;

      if (state.ship.invulnerable <= 0) {
        const shipRadius = 10;
        for (const asteroid of state.asteroids) {
          const dx = state.ship.x - asteroid.x;
          const dy = state.ship.y - asteroid.y;
          if (dx * dx + dy * dy <= (shipRadius + asteroid.radius) * (shipRadius + asteroid.radius)) {
            state.lives -= 1;
            state.ship.x = w / 2;
            state.ship.y = h / 2;
            state.ship.vx = 0;
            state.ship.vy = 0;
            state.ship.invulnerable = 1.8;
            if (state.lives <= 0) state.gameOver = true;
            break;
          }
        }
      }

      if (!state.gameOver && state.asteroids.length === 0) {
        state.level += 1;
        state.asteroids = spawnAsteroids(state.level, boundsRef.current);
      }

      syncHud(state);
    };

    const draw = () => {
      const state = gameRef.current;
      const { w, h } = boundsRef.current;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "#dbeafe";
      ctx.lineWidth = 2;
      for (const asteroid of state.asteroids) {
        ctx.beginPath();
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = "#e2e8f0";
      for (const bullet of state.bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 2.3, 0, Math.PI * 2);
        ctx.fill();
      }

      const blink = state.ship.invulnerable > 0 && Math.floor(state.ship.invulnerable * 10) % 2 === 0;
      if (!state.gameOver && !blink) {
        ctx.save();
        ctx.translate(state.ship.x, state.ship.y);
        ctx.rotate(state.ship.angle);
        ctx.strokeStyle = "#f8fafc";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(14, 0);
        ctx.lineTo(-10, -9);
        ctx.lineTo(-6, 0);
        ctx.lineTo(-10, 9);
        ctx.closePath();
        ctx.stroke();
        if (keysRef.current.KeyW) {
          ctx.strokeStyle = "#f59e0b";
          ctx.beginPath();
          ctx.moveTo(-8, -4);
          ctx.lineTo(-16 - Math.random() * 6, 0);
          ctx.lineTo(-8, 4);
          ctx.stroke();
        }
        ctx.restore();
      }
    };

    const loop = (timestamp: number) => {
      if (!lastFrameRef.current) lastFrameRef.current = timestamp;
      const dt = Math.min((timestamp - lastFrameRef.current) / 1000, 0.033);
      lastFrameRef.current = timestamp;

      step(dt);
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastFrameRef.current = 0;
    };
  }, [syncHud]);

  const setKey = (code: string, pressed: boolean) => {
    keysRef.current[code] = pressed;
  };

  const clearRotateKeys = useCallback(() => {
    setKey("KeyA", false);
    setKey("KeyD", false);
  }, []);

  const applyJoystick = useCallback(
    (dx: number) => {
      const clampedX = Math.max(-JOYSTICK_RADIUS, Math.min(JOYSTICK_RADIUS, dx));
      setJoystickOffset(clampedX);
      setKey("KeyA", clampedX < -DEAD_ZONE);
      setKey("KeyD", clampedX > DEAD_ZONE);
    },
    [DEAD_ZONE, JOYSTICK_RADIUS],
  );

  const handleJoystickPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "touch") return;
    event.preventDefault();
    event.stopPropagation();
    setHasTouched(true);
    joystickPointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    applyJoystick(0);
  };

  const handleJoystickPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerId !== joystickPointerIdRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    applyJoystick(event.clientX - centerX);
  };

  const handleJoystickPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerId !== joystickPointerIdRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    joystickPointerIdRef.current = null;
    clearRotateKeys();
    setJoystickOffset(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleThrustPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "touch") return;
    event.preventDefault();
    event.stopPropagation();
    setHasTouched(true);
    thrustPointerIdRef.current = event.pointerId;
    setKey("KeyW", true);
  };

  const handleThrustPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerId !== thrustPointerIdRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    thrustPointerIdRef.current = null;
    setKey("KeyW", false);
  };

  const handleFirePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "touch") return;
    event.preventDefault();
    event.stopPropagation();
    setHasTouched(true);
    firePointerIdRef.current = event.pointerId;
    setKey("Space", true);
  };

  const handleFirePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerId !== firePointerIdRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    firePointerIdRef.current = null;
    setKey("Space", false);
  };

  return (
    <div
      className="relative w-full h-full"
      onPointerDownCapture={(event) => {
        if (event.pointerType === "touch") {
          setHasTouched(true);
          event.stopPropagation();
        }
      }}
      onTouchStartCapture={(event) => event.stopPropagation()}
      onTouchEndCapture={(event) => event.stopPropagation()}
      onTouchMoveCapture={(event) => event.stopPropagation()}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-sm md:text-base font-medium [font-family:Inter,system-ui,-apple-system,sans-serif] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
        <div className="inline-flex items-center gap-5 md:gap-8">
          <span>Score: {hud.score}</span>
          <span>Lives: {hud.lives}</span>
          <span>Wave: {hud.level}</span>
          {hud.gameOver && <span>Game Over (Press R to restart)</span>}
        </div>
      </div>

      {hasTouched && (
        <>
          <div className="absolute left-4 bottom-6 z-20 flex items-end gap-3">
            <button
              type="button"
              aria-label="Left-right joystick"
              className="relative w-[116px] h-[68px] rounded-full border border-white/40 bg-white/10 touch-none"
              onPointerDown={handleJoystickPointerDown}
              onPointerMove={handleJoystickPointerMove}
              onPointerUp={handleJoystickPointerUp}
              onPointerCancel={handleJoystickPointerUp}
              onPointerLeave={handleJoystickPointerUp}
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-white/80">L</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/80">R</span>
              <span
                className="absolute left-1/2 top-1/2 block w-10 h-10 rounded-full bg-white/75 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(calc(-50% + ${joystickOffset}px), -50%)`,
                }}
              />
            </button>

            <button
              type="button"
              aria-label="Thrust"
              className="w-[76px] h-[76px] rounded-full border border-white/40 bg-white/15 text-white text-xs font-semibold touch-none"
              onPointerDown={handleThrustPointerDown}
              onPointerUp={handleThrustPointerUp}
              onPointerCancel={handleThrustPointerUp}
              onPointerLeave={handleThrustPointerUp}
            >
              Thrust
            </button>
          </div>

          <div className="absolute right-4 bottom-6 z-20">
            <button
              type="button"
              aria-label="Fire"
              className="w-[90px] h-[90px] rounded-full border border-white/40 bg-white/15 text-white text-sm font-semibold touch-none"
              onPointerDown={handleFirePointerDown}
              onPointerUp={handleFirePointerUp}
              onPointerCancel={handleFirePointerUp}
              onPointerLeave={handleFirePointerUp}
            >
              Fire
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export const Cell_4_4: CellConfig = {
  content: (
    <>
      <div className="w-screen h-screen max-w-none p-0">
        <AsteroidsGame />
      </div>
    </>
  ),
  chevronLabels: {
    up: "Exercise",
    left: "Projects",
  },
};
