
"use client";

import { 
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell 
} from "@heroui/table";

import {  Card,
    CardHeader,
    CardBody, } from "@heroui/card";

// 1. Define your data outside the component for better performance and readability
const events = [
    { date: "04/01（日）", name: "🙏 感恩分享會暨聖經互動遊戲" },
    { date: "22/03（日）", name: "👥 第一次會員大會" },
    { date: "29/03（日）", name: "🌍 差傳年會" },
    { date: "03/04（五）下午", name: "✝️ 受難節聚會(聯會)" },
    { date: "16/05（六）中午", name: "🥳 懇親日活動" },
    { date: "01/07（三）全日", name: "📖 讀經日營(七一回歸紀念日)" },
    { date: "28/07-01/08（二至六）下午", name: "👶 兒童暑期聖經班" },
    { date: "23/08（日）", name: "🤝 第二次會員大會(上)、四團合一聯誼活動(下)" },
    { date: "30/8（日）下午", name: "💧 第38 屆浸禮（和樂浸信會）" },
    { date: "19/10（一）", name: "⛺ 事奉人員退修營（重陽節）" },
    { date: "01/11（日）", name: "👥 第三次會員大會(周年)" },
    { date: "13/12（日）", name: "🎂 四十四周年堂慶記念崇拜及愛筵" },
    { date: "24/12（三）晚上", name: "🎄 聖誕佈道會、愛筵及報佳音" },
];
export default function Calendar(){
    return(
    <div className="flex flex-col w-full mx-auto p-2.5 gap-2">
        <Card className="w-full h-full min-h-[200px]">
            <CardHeader><h1 className="text-4xl font-bold mb-4">行事曆</h1></CardHeader>
            <CardBody className="text-lg leading-relaxed">
                <Table
                    aria-label="Event Calendar"
                    removeWrapper // Removes the default card style to match your raw layout
                    classNames={{
                    th: "bg-[#789BAB] text-lg text-white text-left font-bold",
                    td: "text-lg text-left first:w-1/3", // First column flex:1, Second column takes rest
                    wrapper: "p-0 shadow-none bg-transparent",
                }}
                >
                <TableHeader>
                    <TableColumn>日 期</TableColumn>
                    <TableColumn>事 項</TableColumn>
                </TableHeader>
                <TableBody>
                    {events.map((item, index) => (
                        <TableRow 
                            key={item.date}
                            // Manually applying alternating colors to match original code
                            className={index % 2 === 0 ? "bg-[#C2C2C2]" : "bg-[#E5E5E5]"}
                        >
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                        ))}
                </TableBody>
                </Table>
            </CardBody>
        </Card>
    </div>
    );
}