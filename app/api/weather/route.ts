import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = "Hong Kong"; // Target City
    const units = "metric"; // Use Celsius

    if (!apiKey) {
        return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    );

    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch weather" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}