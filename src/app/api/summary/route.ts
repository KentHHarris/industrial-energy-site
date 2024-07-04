import { getBatteries } from "@/lib/queries/getBatteries";
import { SiteLayout } from "@/lib/utils/site-layout";
import { convertEnergy } from "@/lib/utils/convert-energy";
import { SiteLayoutSummary, EnergyUnitEnum } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import type { Vector2Tuple } from "three";

export async function GET(req: NextRequest) {
    const batteryIds = req.nextUrl.searchParams.getAll("id");
    const batteryQuantities = req.nextUrl.searchParams.getAll("qty");

    // Create a map of battery IDs to quantities
    const id2qty = Object.fromEntries(
        batteryIds.map((id, index) => [id, parseInt(batteryQuantities[index])])
    );

    const batteries = await getBatteries(batteryIds);

    // Calculate the total cost of the batteries
    const budget = batteries.reduce((acc, battery) => {
        const quantity = id2qty[battery.id] ?? 0;
        return acc + battery.cost * quantity;
    }, 0);

    const requiredLandSize = batteries.reduce((acc, battery) => {
        const quantity = id2qty[battery.id] ?? 0;
        return [
            acc[0] + battery.width * quantity,
            acc[1] + battery.height * quantity,
        ];
    }, [0, 0,]) satisfies Vector2Tuple;

    // Calculate the total energy density of the batteries
    const energyDensity = batteries.reduce((acc, battery) => {
        let batteryEnergy = battery.energy;

        // Convert the energy to Wh if it's not already in Wh
        if (battery.energyUnit !== EnergyUnitEnum.Wh) {
            batteryEnergy = convertEnergy(
                battery.energy,
                battery.energyUnit,
                EnergyUnitEnum.Wh
            );
        }

        return acc + batteryEnergy;
    }, 0);

    // Calculate the number of transformers required
    const transformerCount = Math.floor(
        Object.values(id2qty).reduce((acc, qty) => acc + qty, 0) / SiteLayout.TRANSFORMER_MOD
    );

    const summary = {
        totalPrice: budget,
        landSize: requiredLandSize,
        energyDensity,
        transformerCount,
    } satisfies SiteLayoutSummary;
    return NextResponse.json(summary);
}