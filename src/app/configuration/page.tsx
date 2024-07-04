import { ConfiguratorProvider } from "@/contexts/ConfiguratorProvider";
import Summary from "@/components/configuration/Summary";
import BatteryCard from "@/components/configuration/BatteryCard";
import DeviceSelection from "@/components/configuration/DeviceSelection";
import SiteLayoutComponent from "@/components/configuration/SiteLayout";
import { getBatteries } from "@/lib/queries/getBatteries";

export default async function Composer() {
  const batteries = await getBatteries();
  return (
    <ConfiguratorProvider initialBatteries={batteries}>
      <main className="container mx-auto min-h-dvh p-2 lg:p-0 max-w-screen-xl">

        <div className="w-full h-96 p-6 pt-24">
          <SiteLayoutComponent />
        </div>

        <div className="w-full flex items-start flex-col">
          <div className="w-full py-6">
            <DeviceSelection />
          </div>

          <div className="w-full flex flex-row justify-around">
            {/* List of devices */}
            <div className="flex flex-col lg:flex-row lg:items-center flex-1 lg:flex-none gap-4">
              {batteries.length > 0 && batteries.map((battery) => (
                <BatteryCard key={battery.id} battery={battery} />
              ))}
            </div>

            <div className="flex-1 lg:flex-none px-4 md:px-0">
              <Summary />
            </div>
          </div>

        </div>
      </main>
    </ConfiguratorProvider>
  );
}
