"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function TanggalWaktuSekarang() {
  const [waktu, setWaktu] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setWaktu(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const tanggal = format(waktu, "EEEE, dd MMMM yyyy", { locale: id });
  const jam = format(waktu, "HH:mm:ss", { locale: id });

  return (
    <div className="text-center font-mono mt-5">
      <p className="text-lg font-semibold">{tanggal}</p>
      {/* <p className="text-sm text-blue-600">{jam}</p> */}
    </div>
  );
}
