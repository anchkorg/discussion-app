import TodayWeather from "@/components/today-weather";
import Calendar from "./calendar";
import NewActivity from "./new-activity";
import WeatherArrangement from "./weather-arrangment";
import {  Card,
    CardHeader,
    CardBody, } from "@heroui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-7xl mx-auto w-full">
      <div className="w-full">
        <NewActivity />
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex-1 w-full">
          <Calendar />
        </div>
        <div className="flex-1 w-full">
          <div className="flex flex-col w-full mx-auto p-2.5 gap-2">
            <Card className="w-full h-full min-h-[200px]">
              <CardHeader>
                  <h4 className="text-4xl font-bold mb-4">香港實時天氣</h4>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                  {/* Live Weather Section */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-between">
                    <TodayWeather />
                  </div>
              </CardBody>
            </Card>
          </div>
            <WeatherArrangement />
          </div>
      </div>
    </div>
  );
}
