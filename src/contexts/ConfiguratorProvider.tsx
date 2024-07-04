"use client";

import getBatteriesWithQuantity from '@/lib/utils/getBatteriesWithQuantity';
import type { Battery, BatteryWithQuantity } from '@/types';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ConfiguratorContext {
    batteries: BatteryWithQuantity[];
    setBatteryQty: (batteryId: string, qty: number) => void;
}

export const ConfiguratorContext = createContext<ConfiguratorContext>({
    batteries: [],
    setBatteryQty: (batteryId, qty) => { },
});

export const ConfiguratorProvider: React.FC<{
    initialBatteries: Battery[] | BatteryWithQuantity[];
    children: React.ReactNode;
}> = ({
    initialBatteries,
    children,
}) => {
        const batteriesWithQuantities = getBatteriesWithQuantity(initialBatteries);

        const [batteries, setBatteries] = useState<BatteryWithQuantity[]>(batteriesWithQuantities);

        // Function to set the battery quantity
        const setBatteryQty = useCallback((batteryId: string, qty: number) => {
            setBatteries((prev) => {
                const updatedState = prev.map((battery) => {
                    if (battery.id === batteryId) {
                        return { ...battery, quantity: qty };
                    }
                    return battery;
                });
                return updatedState;
            });
        }, [setBatteries]);

        // Use useMemo to memoize the value object to avoid unnecessary re-renders of consumers when the state changes, but the value object remains the same
        const value = useMemo(() => ({
            batteries,
            setBatteryQty,
        }), [batteries, setBatteryQty]);

        return (
            <ConfiguratorContext.Provider value={value}>
                {children}
            </ConfiguratorContext.Provider>
        );
    };

export const useBatteries = () => {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error('useDevices must be used within a ConfiguratorProvider');
    }
    return context.batteries;
};

export const useSetBatteryQty = () => {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error('useSetBatteryQty must be used within a ConfiguratorProvider');
    }
    return context.setBatteryQty;
};

export const useGetBatteryQty = (batteryId: string): number => {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error('useGetBatteryQty must be used within a ConfiguratorProvider');
    }
    return context.batteries.find((battery) => battery.id === batteryId)?.quantity ?? 0;
}