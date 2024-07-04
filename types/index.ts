import type { Vector2Tuple } from "three";

export enum DeviceTypeEnum {
    BATTERY = 'BATTERY',
    TRANSFORMER = 'TRANSFORMER'
}

export enum EnergyUnitEnum {
    MWh = 'MWh',
    kWh = 'kWh',
    Wh = 'Wh'
}

export type DeviceType = DeviceTypeEnum | `${DeviceTypeEnum}`
export type EnergyUnit = EnergyUnitEnum | `${EnergyUnitEnum}`

export interface Device {
    id: string;
    name: string;
    width: number;
    height: number;
    energy: number;
    energyUnit: EnergyUnit | `${EnergyUnit}`;
    cost: number;
    releaseDateYear?: string;
    type: DeviceType | `${DeviceType}`;
}
export type Battery = Device & { type: DeviceTypeEnum.BATTERY };
export type BatteryWithQuantity = Battery & { quantity: number };

export interface SiteLayoutSummary {
    /**
     * Total price in dollars
     */
    totalPrice: number;
    /**
     * Land size in width x height
     */
    landSize: Vector2Tuple;
    /**
     * Energy density in Wh/m²
     */
    energyDensity: number;

    /**
     * Number of transformers required
     */
    transformerCount: number;
}
