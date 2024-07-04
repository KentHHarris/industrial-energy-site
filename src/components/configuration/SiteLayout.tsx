// Component to generate and display the site layout
"use client";

import { Battery, Device, SiteLayout } from "@/lib/utils/site-layout";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import { useBatteries } from "@/contexts/ConfiguratorProvider";

type TerrainProps = {
    width: number;
    height: number;
};

type DeviceProps = {
    position: THREE.Vector3Tuple;
    device: Device;
};

const DEVICE_SHORT_HEIGHT = 5;
const DEVICE_COLORS: Record<string, string> = {
    'Megapack': '#FF8888', // light red
    'Megapack 2': 'red',
    'Megapack 2XL': 'darkRed',
    'Powerpack': 'orange',
    'Transformer': 'black',
} as const;

const TerrainModel: React.FC<TerrainProps> = ({
    width,
    height,
}) => {
    // Load the base color texture
    const texture = useLoader(THREE.TextureLoader, '/models/Concrete034_1K-JPG/Concrete034_1K-JPG_Color.jpg');

    // Create a custom shader material using the loaded texture
    const customMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            baseColorTexture: { value: texture },
        },
        vertexShader: `
            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D baseColorTexture;
            varying vec2 vUv;

            void main() {
                vec3 baseColor = texture2D(baseColorTexture, vUv).rgb;
                gl_FragColor = vec4(baseColor, 1.0);
            }
        `,
    }), [texture]);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[width, height]} />
            <primitive attach="material" object={customMaterial} />
        </mesh>
    );
};

const DeviceModel: React.FC<DeviceProps> = ({
    position,
    device,
}) => {
    // Memoize the geometry
    const geometry = useMemo(() => new THREE.BoxGeometry(
        device.width,
        DEVICE_SHORT_HEIGHT,
        device.height,
    ), [device.width, device.height]);

    // Memoize the material
    const material = useMemo(() => {
        const color = DEVICE_COLORS[device.name];
        return new THREE.MeshBasicMaterial({ color });
    }, [device.name]);

    return (
        <mesh position={position} geometry={geometry} material={material} castShadow />
    );
};

const SiteLayoutComponent = () => {
    const batteries = useBatteries();

    // TODO: Implement the site layout algorithm on the server so that an API returns the layout with positions
    // TODO: Instead of reconstructing the site layout each time we modify the batteries, we can just update the components with the new positions?
    const siteLayout = useMemo(() => {
        // Create n number of batteries based on the quantity
        const B: Battery[] = [];
        batteries.forEach((battery) => {
            for (let i = 0; i < battery.quantity; i++) {
                B.push(new Battery(battery.width, battery.height, battery.name));
            }
        });
        return new SiteLayout(100, 2.5, 150).init(B);
    }, [batteries]);

    const camera = useMemo(() => {
        if (typeof window !== 'undefined') {
            const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 2000);
            camera.lookAt(0, 0, 0);

            // Scale the camera height based on the site layout height (zooms out if the site layout is taller)
            const baseCameraHeight = 75;
            const y = baseCameraHeight + (siteLayout.height * 2)
            camera.position.set(0, y, Math.PI * 2);

            return camera;
        }
    }, [siteLayout]);

    return (
        <div className="w-full h-full flex">
            <div className="flex-none flex flex-col items-start justify-end">
                <h4 className="text-lg font-semibold underline">Legend</h4>
                <ul>
                    {Object.entries(DEVICE_COLORS).map(([device, color]) => (
                        <li key={device} className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                            <span>{device}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Canvas shadows camera={camera}>
                <TerrainModel
                    width={siteLayout.width}
                    height={siteLayout.height}
                />

                {siteLayout.devices.map((device, index) => (
                    <DeviceModel
                        key={`${device.name}_${index}`}
                        position={device.position}
                        device={device}
                    />
                ))}

                <OrbitControls target={[0, 0, 0]} enablePan enableRotate={false} />
            </Canvas>
        </div>
    );
};

export default SiteLayoutComponent;
