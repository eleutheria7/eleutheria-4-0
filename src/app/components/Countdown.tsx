"use client";

import { useEffect, useState } from "react";

const targetDate = new Date("2026-07-31T19:00:00");

type TimeLeft = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const dias = Math.floor(difference / (1000 * 60 * 60 * 24));
        const horas = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((difference / (1000 * 60)) % 60);
        const segundos = Math.floor((difference / 1000) % 60);

        setTimeLeft({ dias, horas, minutos, segundos });
      } else {
        setTimeLeft({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });
      }
    };

    calculateTimeLeft(); // calcula imediatamente
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white p-6 h-[110px] flex items-center justify-center gap-10 rounded-2xl">
      <TimeBox value={timeLeft.dias} label="Dias" />
      <TimeBox value={timeLeft.horas} label="Horas" />
      <TimeBox value={timeLeft.minutos} label="Min" />
      <TimeBox value={timeLeft.segundos} label="Seg" />
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}