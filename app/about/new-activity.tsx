
"use client";

import {  Card,
    CardHeader,
    CardBody, } from "@heroui/card";

// 1. Define your data outside the component for better performance and readability
const activities = [
    "透過團契、小組聯合活動建立關係與信任" ,
    "定期探訪，關心肢體及親友" ,
    "繼續積極發展青少年事工，包括：彩虹計劃，青少年門訓班，保良局羅傑承1983 中學團契" ,
    "兒童崇拜與手工活動：高小主日學班（小四至小六）" ,
    "讀經計劃：創世記、出埃及記、馬可福音、腓立比書及使徒行傳" ,
    "讀經日營（七一回歸紀念日）" ,
];
export default function NewActivity(){
    return(
    <div className="flex flex-col w-full mx-auto p-2.5 gap-2">
    <Card className="w-full h-full min-h-[200px]">
        <CardHeader>
            <h1 className="text-4xl font-bold mb-4">最新活動</h1>
        </CardHeader>
        <CardBody className="text-lg leading-relaxed">
            {/* Changed <ul> to <ol> for numbered list */}
            <ol className="list-decimal pl-6 space-y-4">
                {activities.map((rule, index) => (
                    <li key={index}>{rule}</li>
                ))}
            </ol>
        </CardBody>
    </Card>
    </div>
    );
}