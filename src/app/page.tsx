// import dynamic from "next/dynamic";
"use client";

import Link from "next/link";
import { Button } from "../components/button/Button";
import TanggalWaktuSekarang from "../components/general/Date";
import MqttClient from "../components/monitoring/RealTimeMonitoring";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <TanggalWaktuSekarang />
      <MqttClient />

      <Link href={"/detail-parameter"}>
        <Button variant="secondary" size="sm">
          📊 Tampilkan Grafik Parameter
        </Button>
      </Link>
    </div>
  );
}
