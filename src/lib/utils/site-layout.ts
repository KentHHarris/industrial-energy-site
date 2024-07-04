import { DeviceTypeEnum as DeviceType } from "@/types";
import type { Vector3Tuple } from "three";

type DeviceWithPosition = Device & {
    position: Vector3Tuple;
};

export abstract class Device {
    constructor(
        public width: number,
        public height: number,
        public readonly name: string,
        public readonly type: DeviceType = DeviceType.BATTERY,
    ) { }
}

export class Battery extends Device {
    constructor(
        width: number,
        height: number,
        name: string,
    ) {
        super(width, height, name, DeviceType.BATTERY);
    }
}

export class Transformer extends Device {
    constructor() {
        super(10, 10, Transformer.name, DeviceType.TRANSFORMER);
    }
}

/**
 * Represents a row in the site layout
 */
class SiteLayoutRow {
    private _components: Device[] = [];
    private _runningWidth: number = 0;
    private _batteryCount: number = 0;
    private _transformerCount: number = 0;
    constructor(
        public readonly width: number,
        public readonly padding: number = 0,
    ) { };

    public get devices(): DeviceWithPosition[] {
        // Adjust the widths of the components to fit within the maximum width if padding is enabled
        const components = this.padding
            ? this.adjustComponentWidths()
            : this._components;

        // Map the components to include their positions
        return components
            .map((component) => ({
                ...component,
                position: [0, 0, 0] as Vector3Tuple, // Placeholder for actual position calculations
            }))
    }

    public get remainingWidth(): number {
        return Math.floor(this.width - this._runningWidth);
    }

    public get batteryCount(): number {
        return this._batteryCount;
    }

    public get transformerCount(): number {
        return this._transformerCount;
    }

    public get MAX_HEIGHT(): number {
        return this._components.reduce((maxHeight, component) => Math.max(maxHeight, component.height), 0);
    }

    /**
     * Add a battery to the site layout
     * @param component The battery to add to the site layout
     * @throws Error if the total width of the components exceeds the maximum width
     * @throws Error if the component is not a battery
     */
    public addComponent(component: Device) {
        // Add the battery to the list of components
        this._components.push(component);

        // Increment the component count and running width
        this.incrementCount(component);
        this._runningWidth += component.width;

        // Check if the total width of the components exceeds the maximum width after adding the component
        if (this._runningWidth > this.width) {
            this.removeComponent(component.name);
            throw new Error("The total width of the components exceeds the maximum width.");
        }
    }

    /**
     *  Removes one of the components from the site layout
     * @param name The name of the component to remove
     * @returns true if a component is removed, false otherwise
     */
    public removeComponent(name: string): boolean {
        // [NOTE]: Get the index of the battery to remove. Find the index of the last component with the given name to remove the most recently added component. Otherwise, the order in which the components are added will be shuffled
        const index = this._components.findLastIndex((component) => component.name === name);

        // If the battery is found, remove it
        if (index !== -1) {
            const [component] = this._components.splice(index, 1);

            // Decrement the component count and running width
            this.decrementCount(component);
            this._runningWidth -= component.width;

            return true;
        }

        return false;
    }

    private incrementCount(component: Device) {
        if (component.type === DeviceType.BATTERY) {
            this._batteryCount++;
        } else if (component.type === DeviceType.TRANSFORMER) {
            this._transformerCount++;
        }
    }

    private decrementCount(component: Device) {
        if (component.type === DeviceType.BATTERY) {
            this._batteryCount--;
        } else if (component.type === DeviceType.TRANSFORMER) {
            this._transformerCount--;
        }
    }

    /**
     * Adjust the widths of the items to fit within the maximum width. Does not mutate the original items
     */
    private adjustComponentWidths(): Device[] {
        const items = this._components;

        const numberOfItems = items.length;

        // Calculate the total original width of all items
        const totalOriginalWidth = items.reduce((sum, item) => sum + item.width, 0);

        // Calculate the total padding required
        const totalPadding = (numberOfItems - 1) * this.padding;

        // Calculate the total width including padding
        const totalWidthWithPadding = totalOriginalWidth + totalPadding;

        // Determine if scaling is necessary
        let scalingFactor = 1;
        if (totalWidthWithPadding > this.width) {
            scalingFactor = (this.width - totalPadding) / totalOriginalWidth;
        }

        // Adjust the widths of the items
        return items.map((item) => ({
            ...item,
            width: item.width * scalingFactor,
        }));
    }
}

/**
 * Represents the layout of a site with rows of devices
 */
export class SiteLayout {
    public static readonly TRANSFORMER_MOD = 4;
    private _rows: SiteLayoutRow[] = [];
    public height: number = 0;
    constructor(
        /** The width of the terrain */
        public readonly width: number,
        /** Padding between devices */
        public readonly padding: number = 0,
        private minHeight?: number,
    ) {
        // Initialize the site layout with an empty row
        this.createNewRow();
    }

    /**
     * Initialize the site layout with the given devices
     * @param devices The devices to add to the site layout
     */
    public init(batteries: Battery[]): this {
        // Add the batteries to the layout one by one until all batteries are added
        while (batteries.length) {
            const battery = batteries.shift();
            if (!battery) break; // Early return if no component
            this.addBattery(battery);
        }

        // Dynamically calculate the height of the terrain based on the height of the devices. Multiply padding by 2 to account for padding on both top and bottom; otherwise, the devices will overflow the terrain
        this.height = this._rows.reduce((height, row) => height + row.MAX_HEIGHT + (this.padding * 2), 0);

        if (this.minHeight) {
            this.height = Math.max(this.height, this.minHeight);
        }

        return this;
    }

    /**
     * A list of devices with their positions that can be used to render the site layout in 3D space
     */
    public get devices(): DeviceWithPosition[] {
        return this.calculatePositions(this._rows);
    }

    /**
     * Calculate the vector positions of the devices in the site layout
     * @param rows The rows of devices in the site layout
     * @returns A list of devices with their positions
     */
    private calculatePositions(rows: SiteLayoutRow[]): DeviceWithPosition[] {
        const devices: DeviceWithPosition[] = [];

        // We know that each row will have a width equal to the width of the terrain and a height equal to the height of the tallest device in the row

        // Initial y position
        let currentYPosition = -this.height / 2;

        for (const row of rows) {
            // Calculate the maximum height of the row
            const maxHeightInRow = row.MAX_HEIGHT;

            // The starting position of the first device in the row (left corner of the terrain)
            let currentXPosition = -this.width / 2;

            for (const device of row.devices) {
                let W = currentXPosition + device.width / 2;
                let H = currentYPosition + maxHeightInRow / 2;

                device.position = [W, device.height / 2, H];
                devices.push(device);

                // Update the current position for the next box
                currentXPosition = W + device.width / 2 + this.padding;
            }

            // Update the current y position for the next row
            currentYPosition += maxHeightInRow + (this.padding * 2);
        }

        return devices;
    }

    private get batteryCount(): number {
        return this._rows.reduce((count, row) => count + row.batteryCount, 0);
    }

    private get transformerCount(): number {
        return this._rows.reduce((count, row) => count + row.transformerCount, 0);
    }

    private get requiredNumberOfTransformers(): number {
        return Math.floor(this.batteryCount / SiteLayout.TRANSFORMER_MOD);
    }

    private addTransformer(transformer: Transformer) {
        let lastRow = this.getLastRow();

        try {
            lastRow.addComponent(transformer);
        } catch (error: any) {
            if (error.message === "The total width of the components exceeds the maximum width.") {
                // Handle the case where the current row cannot accommodate the transformer
                lastRow = this.createNewRow();
                lastRow.addComponent(transformer);
            } else {
                throw error; // Rethrow if error is not due to maximum width
            }
        }
    }

    private addBattery(battery: Battery) {
        let lastRow = this.getLastRow();

        try {
            lastRow.addComponent(battery);

            // Check if a transformer needs to be added after adding this battery
            if (this.requiredNumberOfTransformers > this.transformerCount) {
                // Assuming a Transformer instance can be created here or passed in some way
                const transformer = new Transformer(); // Placeholder for actual transformer creation
                this.addTransformer(transformer);
            }
        } catch (error: any) {
            if (error.message === "The total width of the components exceeds the maximum width.") {
                // TODO: Handle the case where the current row cannot accommodate the battery. Can we find a row that can accommodate the battery, or find a supplementary battery that can fit in the current row?s

                // Create a new row and add the component to the new row
                lastRow = this.createNewRow();
                lastRow.addComponent(battery);
            } else {
                throw error; // Rethrow if error is not due to maximum width
            }
        }
    }

    private createNewRow(): SiteLayoutRow {
        const newRow = new SiteLayoutRow(this.width, this.padding);
        this._rows.push(newRow);
        return newRow;
    }

    private getLastRow(): SiteLayoutRow {
        return this._rows[this._rows.length - 1];
    }

    /**
     * Find a device within the list of devices that has a width that is less than or equal to the specified width. In-place operation.
     * @param width The width of the device
     * @returns The device with the acceptable width
     */
    private findDeviceWithAcceptableWidth(
        batteries: Battery[],
        width: number,
    ): Battery | undefined {
        const index = batteries.findIndex((battery) => battery.width <= width);
        if (index !== -1) {
            return batteries.splice(index, 1)[0];
        }
    }
}
