import type { Battery, BatteryWithQuantity } from "@/types";

function getBatteriesWithQuantity(battery: Battery): BatteryWithQuantity;
function getBatteriesWithQuantity(battery: Battery[]): BatteryWithQuantity[];
function getBatteriesWithQuantity(battery: Battery | Battery[]): BatteryWithQuantity | BatteryWithQuantity[] {
    if (Array.isArray(battery)) {
        return battery.map((battery) => ({ ...battery, quantity: 0 })) satisfies BatteryWithQuantity[];
    }
    return { ...battery, quantity: 0 };
};

export default getBatteriesWithQuantity;
