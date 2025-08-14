"use client";

import { useEffect, useState } from "react";
import mqtt from "mqtt";

type DataSensor = {
  amonia: number;
  classification: "Aman" | "Berbahaya" | "Waspada";
  ph: number;
  temperature: number;
  tds: number;
};

export default function MqttClient() {
  const [message, setMessage] = useState<DataSensor | null>(null);

  useEffect(() => {
    const client = mqtt.connect(
      "wss://c1e8b4ae4ea04d9ea2f2696fb9ab84cd.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "thesis",
        password: "Thesis2025",
        connectTimeout: 4000,
        clean: true,
        reconnectPeriod: 1000,
      }
    );

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe("sensor/limbah");
    });

    client.on("message", (topic, payload) => {
      const msg = payload.toString();
      console.log("Received message:", JSON.parse(msg));
      setMessage(JSON.parse(msg));
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="w-full font-mono">
      <p className="text-center font-mono">{`Status : ${
        message?.classification || "Sensor tidak aktif"
      }`}</p>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="w-full aspect-square relative bg-white shadow-md rounded-full p-4 flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-blue-600">
            {message?.ph == 0.0 ? "Off" : message?.ph ?? "-"}
          </p>
          <p className="text-xs absolute bottom-3 text-gray-500">pH</p>
        </div>

        <div className="w-full aspect-square relative bg-white shadow-md rounded-full p-4 flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-red-500">
            {message?.temperature == -1.0 ? "Off" : message?.temperature ?? "-"}
          </p>
          <p className="text-xs text-gray-500 font-semibold">(°C)</p>
          <p className="text-xs absolute bottom-3 text-gray-500">Suhu</p>
        </div>

        <div className="w-full aspect-square relative bg-white shadow-md rounded-full p-4 flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-green-600">
            {message?.tds == -2 || message?.tds == 0
              ? "Off"
              : message?.tds ?? "-"}
          </p>
          <p className="text-xs text-gray-500 font-semibold">ppm</p>
          <div className="text-xs absolute bottom-3 text-gray-500">
            <p>TDS</p>
            <p className="-mt-1">(Kekeruhan)</p>
          </div>
        </div>

        <div className="w-full aspect-square relative bg-white shadow-md rounded-full p-4 flex flex-col items-center justify-center text-center">
          {/* TAMBAH TEGANGAN AOUT (TEGANGAN SINYAL SENSOR) */}
          <p className="text-4xl font-bold text-purple-600">
            {message?.amonia == -1 ? "Off" : message?.amonia ?? "-"}
          </p>
          <p className="text-xs text-gray-500 font-semibold">ppm</p>
          <div className="text-xs absolute bottom-3 text-gray-500">
            <p>Gas Amonia</p>
            <p className="-mt-1">(NH3)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
