import React from "react";

import { Checkbox } from "~/app/_components/ui/checkbox";
import { Label } from "~/app/_components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/app/_components/ui/select";
import { Card, CardContent } from "../ui/card";

const SortCard = () => {
    return (
        <Card>
            <CardContent className="flex justify-end gap-4 space-x-2 p-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id="stock" />
                    <Label
                        htmlFor="stock"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Products in stock
                    </Label>
                </div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Newest first</SelectItem>
                        <SelectItem value="dark">Oldest first</SelectItem>
                        <SelectItem value="dark">Price: low to high</SelectItem>
                        <SelectItem value="dark">Price: high to low</SelectItem>
                        <SelectItem value="system">Name: A-Z</SelectItem>
                        <SelectItem value="system">Name: Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
};

export default SortCard;
