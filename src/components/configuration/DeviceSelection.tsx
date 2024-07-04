"use client";

import { useBatteries, useGetBatteryQty, useSetBatteryQty } from "@/contexts/ConfiguratorProvider";
import Dropdown from "../shared/Dropdown";
import { Battery } from "@/types";
import { useState } from "react";

const DeviceSelection: React.FC = () => {
    const batteries = useBatteries();

    // Dropdown options for battery selection
    const options = batteries.map((battery) => battery.name);
    const [battery, setBattery] = useState<Battery>(batteries[0]);
    const handleBatteryChange = (value: string) => {
        const selectedDevice = batteries.find((battery) => battery.name === value);
        if (selectedDevice) {
            setBattery(selectedDevice);
        }
    };

    // Getter and setter for battery quantity
    const quantity = useGetBatteryQty(battery?.id);
    const setBatteryQty = useSetBatteryQty();
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setBatteryQty(battery.id, value);
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-xl lg:text-2xl font-semibold">Device Selection</h3>
            </div>
            <div className="flex flex-row lg:flex-col items-center lg:items-start lg:justify-center lg:space-y-2 space-x-2 lg:space-x-0 p-2 lg:p-0">
                <div className="w-fit lg:w-60">
                    <Dropdown options={options} value={battery?.name} onChange={handleBatteryChange} />
                </div>
                <div className="w-24 lg:w-60">
                    <label htmlFor="quantity" className="font-semibold text-gray-900 text-md hidden lg:block text-left">Quantity</label>
                    <input
                        type="number"
                        id="battery-quantity"
                        className="w-full"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min={0}
                        max={50}
                        title="Battery Quantity"
                        placeholder="0"
                    />
                </div>
            </div>
        </div>
    );
};

export default DeviceSelection;
