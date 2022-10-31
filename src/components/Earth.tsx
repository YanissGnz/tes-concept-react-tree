import { Mesh, MeshStandardMaterial } from "three";
import { CameraShake, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { motion } from "framer-motion-3d";
type GLTFResult = GLTF & {
	nodes: {
		Object_4: Mesh;
	};
	materials: {
		["Scene_-_Root"]: MeshStandardMaterial;
	};
};

type EarthProps = JSX.IntrinsicElements["group"] & { currentPage: number };

export function Earth(props: EarthProps) {
	const { nodes, materials } = useGLTF(
		"/earth/earth.gltf"
	) as unknown as GLTFResult;

	return (
		<group scale={1.5} {...props}>
			<group scale={1}>
				<motion.mesh
					position={[0, 0.5, 0]}
					rotation={[Math.PI / 16, -Math.PI / 2, 0]}
					geometry={nodes.Object_4.geometry}
					material={materials["Scene_-_Root"]}
					animate={props.currentPage.toString()}
					variants={{
						1: {
							x: 3,
							y: 0,
							scale: 2,
							rotateY: -Math.PI / 16,
						},
					}}
					transition={{
						type: "keyframes",
						duration: 3,
					}}
				/>
				<CameraShake intensity={0.2} />
			</group>
		</group>
	);
}

useGLTF.preload("/earth.gltf");
