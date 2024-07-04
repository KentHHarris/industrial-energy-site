import type { Battery } from "@/types";
import { isBattery } from "../validators/is-battery";
import { DEVICES } from "@/data";

export async function getBatteries(id?: string | string[]): Promise<Battery[]> {
    let batteries = DEVICES.filter(isBattery);
    if (id) {
        if (Array.isArray(id)) {
            batteries = batteries.filter(battery => id.includes(battery.id));
        } else {
            batteries = batteries.filter(battery => battery.id === id);
        }
    }
    return batteries;
}
