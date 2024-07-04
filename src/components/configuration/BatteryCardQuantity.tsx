"use client";

import { useGetBatteryQty } from "@/contexts/ConfiguratorProvider";

type BatteryCardQuantityProps = {
    batteryId: string;
};

const BatteryCardQuantity: React.FC<BatteryCardQuantityProps> = ({
    batteryId,
}) => {
    const quantity = useGetBatteryQty(batteryId);
    return (<span>{quantity}</span>);
};

export default BatteryCardQuantity;
