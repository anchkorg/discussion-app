"use client";

import {Spinner} from "@heroui/spinner";
import { useEffect, useState } from "react";

export default function TodayWeather(){
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const getWeatherEmoji = (main: string) => {
    const condition = main.toLowerCase();
    if (condition.includes("clear")) return "☀️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("drizzle")) return "🌦️";
    if (condition.includes("thunderstorm")) return "⛈️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) return "🌫️";
    return "🌤️"; // Default icon
  };
    useEffect(() => {
        async function fetchWeather() {
        try {
            // Call our internal API route created in Step 3
            const res = await fetch("/api/weather");
            const data = await res.json();
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather:", error);
        } finally {
            setLoading(false);
        }
        }
        fetchWeather();
    }, []);

    return(
            <div >
            {loading ? (
                <Spinner size="sm" color="primary" />
            ) : weather ? (
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                    {Math.round(weather.main.temp)}°C
                    </span>
                    <span className="text-5xl">
                        {getWeatherEmoji(weather.weather[0].main)}
                    </span>
                </div>
            ) : (
                <p className="text-gray-500">無法讀取天氣資料</p>
            )}
            </div>
    );
}