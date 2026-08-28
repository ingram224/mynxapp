import Image from "next/image";
import LeadForm from "./LeadForm";
import AppMock from "./AppMock";
import Tilt from "./Tilt";
import MouseParallax from "./MouseParallax";

const badges = ["100% офлайн", "Без подписки", "Windows"];

const chips = [
  { text: "Буфер обмена очищен", className: "-top-9 right-2 md:-right-6", depth: 60, delay: "0s" },
  { text: "Резервная копия создана", className: "right-full top-1/4 mr-4 hidden md:block", depth: 40, delay: "1.2s" },
  { text: "Security Score: 92", className: "-bottom-9 right-4", depth: 80, delay: "2.1s" },
];

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pb-24 pt-16 md:pt-24">
      <MouseParallax className="relative">
        {/* Параллакс-орбы на фоне */}
        <div data-depth="30" className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div data-depth="55" className="absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div data-depth="40" className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

        <div className="glow left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2" />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-14 w-14" style={{ transformStyle: "preserve-3d" }}>
                <span className="orbit orbit-ring" aria-hidden />
                <span className="orbit orbit-ring--outer" aria-hidden />
                <span className="orbit orbit-dot" aria-hidden />
                <span className="orbit orbit-dot--outer" aria-hidden />
                <Image
                  src="/icon.svg"
                  alt="Логотип Mynx"
                  width={56}
                  height={56}
                  className="animate-shield drop-shadow-[0_8px_24px_rgba(16,185,129,0.35)]"
                />
              </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b} className="glass rounded-full px-3 py-1 text-xs font-medium text-primary">
                  {b}
                </span>
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Ваше офлайн-хранилище паролей. <span className="text-gradient">Без облака.</span>{" "}
            Максимальная безопасность.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            Mynx хранит пароли только на вашем компьютере. Ни аккаунтов, ни серверов,
            ни телеметрии, ни подписок — только вы и ваши данные.
          </p>
          <div className="relative mt-8">
            <LeadForm source="hero" />
          </div>
          <p className="mt-3 text-xs text-dim">
            Цена будет объявлена до запуска. Оставьте email — сообщим первым.
          </p>
        </div>

        <div className="relative" style={{ perspective: "1200px" }}>
          <Tilt max={7} scale={1.01} className="relative">
            <AppMock />
            {chips.map((chip) => (
              <div
                key={chip.text}
                className={`absolute ${chip.className}`}
                style={{ transform: `translateZ(${chip.depth}px)` }}
              >
                <span
                  className="glass animate-float block whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium text-primary shadow-lg shadow-black/30"
                  style={{ animationDelay: chip.delay }}
                >
                  {chip.text}
                </span>
              </div>
            ))}
          </Tilt>
        </div>
      </div>
        <div className="grid-floor" aria-hidden />
      </MouseParallax>
    </section>
  );
}
