import { type Device } from "@/types";

export const DEVICES: Device[] = [
    {
        name: 'Megapack 2XL', type: 'BATTERY', width: 40, height: 10, energy: 4, cost: 120000, releaseDateYear: '2022', energyUnit: 'MWh',
        id: '1'
    },
    {
        name: 'Megapack 2', type: 'BATTERY', width: 30, height: 10, energy: 3, cost: 80000, releaseDateYear: '2021', energyUnit: 'MWh',
        id: '2'
    },
    {
        name: 'Megapack', type: 'BATTERY', width: 30, height: 10, energy: 2, cost: 50000, releaseDateYear: '2005', energyUnit: 'MWh',
        id: '3'
    },
    {
        name: 'Powerpack', type: 'BATTERY', width: 10, height: 10, energy: 1, cost: 20000, releaseDateYear: '2000', energyUnit: 'MWh',
        id: '4'
    },
    {
        name: 'Transformer', type: 'TRANSFORMER', width: 10, height: 10, energy: -0.25, cost: 10000, energyUnit: 'MWh',
        id: '5'
    },
] satisfies Device[];

export default DEVICES;