"use client";

import SingleParameterChart from "@/components/grafik/SingleParameterChart";
import React, { useEffect, useState } from "react";

export interface WaterQualityData {
  _id: string;
  ph: number;
  temperature: number;
  amonia: number;
  tds: number;
  classification: "Aman" | "Waspada" | "Berbahaya" | "Belum diklasifikasi";
  timestamp: string;
  __v: number;
}

const DetailParameter = () => {
  const [data, setData] = useState<WaterQualityData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://thesis-api-kappa.vercel.app/api/sensor"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      setData(result?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Convert data to chart-friendly format
  const getChartData = (key: keyof WaterQualityData) =>
    data.map((item) => ({
      timestamp: new Date(item.timestamp).toLocaleTimeString(), // or toLocaleString()
      value: item[key] as number,
    }));

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-xl font-bold mb-4 text-center font-mono">
        Tren Perubahan Parameter Air
      </h1>
      {loading ? <p>Loading data...</p> : null}
      {data?.length > 0 ? (
        <>
          <SingleParameterChart
            data={getChartData("temperature")}
            label="Suhu (°C)"
          />
          <SingleParameterChart data={getChartData("ph")} label="pH" />
          <SingleParameterChart data={getChartData("tds")} label="TDS" />
          <SingleParameterChart data={getChartData("amonia")} label="Amonia" />
        </>
      ) : null}
    </div>
  );
};

export default DetailParameter;
