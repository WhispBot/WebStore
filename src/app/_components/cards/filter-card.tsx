"use client";
import { Filter } from "lucide-react";
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/app/_components/ui/accordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const games = [
    {
        value: "wow",
        title: "World of warcraft",
    },
    {
        value: "grimdawn",
        title: "Grim dawn",
    },
];

const FilterCard = () => {
    return (
        <Card className="hidden h-[32rem] w-52 flex-col lg:flex">
            <CardHeader className="p-2">
                <CardTitle className="flex items-center text-base">
                    <Filter size={20} /> Fitler
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Accordion type="multiple" className="">
                    <AccordionItem value="item-1" className=" px-4">
                        <AccordionTrigger>Games</AccordionTrigger>
                        <AccordionContent className="space-y-2">
                            {games.map((item) => (
                                <div
                                    className="flex items-center justify-between space-x-2"
                                    key={item.value}
                                >
                                    <Checkbox id={item.value} />
                                    <Label
                                        htmlFor={item.value}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item.title}
                                    </Label>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
};

export default FilterCard;
