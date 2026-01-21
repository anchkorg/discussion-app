"use client";

import {  Card,
    CardHeader,
    CardBody, } from "@heroui/card";
    
export default function WeatherArrangement(){
    const arrangements = [
    "在崇拜進行前兩小時，天文台發出八號或以上風球、黑色暴雨生效時，聚會暫停。",
    "如八號或以上風球、黑色暴雨在崇拜聚會時發出，會友應留在敎會，直至聚會完結而情況亦適宜回家，才可離開。"
    ];

    return(
    <div className="flex flex-col w-full mx-auto p-2.5 gap-2">
    <Card className="w-full h-full min-h-[200px]">
        <CardHeader>
            <h1 className="text-4xl font-bold mb-4">惡劣天氣安排</h1>
        </CardHeader>
        <CardBody className="text-lg leading-relaxed">
            {/* Changed <ul> to <ol> for numbered list */}
            <ol className="list-decimal pl-6 space-y-4">
                {arrangements.map((rule, index) => (
                    <li key={index}>{rule}</li>
                ))}
            </ol>
        </CardBody>
    </Card>
    </div>
    );
}