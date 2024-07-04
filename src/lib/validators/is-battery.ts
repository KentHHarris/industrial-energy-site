import type { Battery, Device } from "@/types";

export const isBattery = (device: Device): device is Battery => {
    return device.type === 'BATTERY';
};
