import Image from "next/image";
import { Chrome, Zap, WifiOff, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: Zap,
    title: "Автозаполнение на сайтах",
    text: "Расширение для Chrome подставляет логины, генерирует пароли и показывает одноразовые коды прямо в браузере.",
  },
  {
    icon: WifiOff,
    title: "Прямая связь с приложением",
    text: "Расширение общается с Mynx напрямую на вашем компьютере. Ни один байт не уходит в интернет — проверьте сами в мониторе трафика.",
  },
  {
    icon: ShieldCheck,
    title: "Безопасно по устройству",
    text: "Расширение — лишь мост к приложению: пароли хранятся только в зашифрованном хранилище на вашем ПК, а в браузере появляются лишь на мгновение автозаполнения.",
  },
];

export default function Extension() {
  return (
    <section className="border-y border-white/5 bg-black/30 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Chrome className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Расширение для Chrome</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            Браузер под контролем. Сеть — нет.
          </h2>
          <div className="mt-6 space-y-5">
            {points.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="glass flex h-10 w-10 shrink-0 items-center justify-center">
                  <p.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-strong p-3">
          <Image
            src="/marquee.png"
            alt="Mynx — расширение для Chrome"
            width={1400}
            height={560}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
