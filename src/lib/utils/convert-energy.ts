import { EnergyUnit } from "@/types";

const conversionRates = {
    Wh: 1,
    kWh: 1e3,
    MWh: 1e6,
};

export function convertEnergy(
    value: number,
    fromUnit: EnergyUnit,
    toUnit: EnergyUnit,
): number {
    if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
        throw new Error("Invalid unit provided for conversion.");
    }

    // Convert the value to Wh, then to the target unit
    const valueInWh = value * conversionRates[fromUnit];
    // Return the value in the target unit
    return valueInWh / conversionRates[toUnit];
};

// TODO: Unit tests
