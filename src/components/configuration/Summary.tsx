"use client";

import { useBatteries } from "@/contexts/ConfiguratorProvider";
import { convertEnergy } from "@/lib/utils/convert-energy";
import { SiteLayoutSummary } from "@/types";
import { useEffect, useState } from "react";

const Summary: React.FC = () => {
    const query = useSummaryQueryParams();
    const [summary, setSummary] = useState<SiteLayoutSummary>();

    // Fetch summary data from the server when the query changes (i.e. when the user adds or removes batteries from the configuration)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/summary?${query}`);
                const data = await res.json();
                setSummary(data);
            } catch (err) {
                console.error('Error fetching summary data:', err);
            }
        };
        fetchData();
    }, [query]);

    // Display a loading message while the summary is being fetched for the first time
    if (!summary) {
        return <p className="text-md capitalize italic">Initializing summary...</p>;
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-pretty text-center capitalize hidden lg:block">Configuration Summary</h2>
            <div className="flex flex-col">
                <TextSummary summary={summary} />
            </div>
        </div>
    );
};

function useSummaryQueryParams(): string {
    const batteries = useBatteries();
    // Filter out batteries with a quantity of 0 from the query string
    const batteriesWithQuantities = batteries.filter((battery) => battery.quantity > 0);

    // If there are no batteries with quantities, return an empty string
    if (!batteriesWithQuantities.length) {
        return "";
    }

    // Get the quantities of the batteries
    const quantities = batteriesWithQuantities.map((battery) => battery.quantity);

    // Create a query string with the battery IDs and quantities mapped to each other
    const query = new URLSearchParams();
    batteriesWithQuantities
        .map((battery) => battery.id)
        .forEach((id) => query.append("id", id));
    quantities.forEach((qty) => query.append("qty", qty.toString()));

    return query.toString();
}

const TextSummary = ({ summary }: { summary: SiteLayoutSummary }) => {
    const landSqft = summary.landSize[0] * summary.landSize[1];
    const energyDensityMWh = convertEnergy(summary.energyDensity, 'kWh', 'MWh');
    return (
        <div className="flex flex-col text-md">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">Land Size</h3>
                <p className="text-right text-nowraps">{Number(landSqft).toLocaleString()} ft</p>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">Energy Density</h3>
                <p className="text-right text-nowrap">{Number(energyDensityMWh).toLocaleString()} MWh</p>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">Estimated Budget</h3>
                <p className="text-right text-nowrap">${Number(summary.totalPrice).toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between pt-6">
                <h3 className="font-semibold">Transformer Count</h3>
                <p className="text-right text-nowrap">{Number(summary.transformerCount).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default Summary;