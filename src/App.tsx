import { Suspense, useState } from "react";
import { motion as motion3d } from "framer-motion-3d";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
	HiOutlineArrowNarrowLeft,
	HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { Earth } from "./components/Earth";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

const noise =
	"data:image/png;base64,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";

function App() {
	const [currentPage, setCurrentPage] = useState(0);

	return (
		<div className="h-screen w-screen bg-gradient-to-r from-yellow/80 to-cyan relative overflow-hidden">
			<div
				className="fixed top-0 left-0 h-screen w-screen"
				style={{ backgroundImage: `url(${noise})` }}
			></div>
			<div className="h-full w-full flex flex-col">
				<nav className="w-full p-10 flex items-center justify-between  text-white z-10">
					<img
						src="/TES-Logo-RGB-SemiWhite-Small.png"
						alt="logo"
						className="h-14"
					/>
					<button className="p-2 bg-black/30 rounded-2xl flex items-center justify-between gap-4 ">
						<div className="flex items-center justify-center bg-black/40 p-2 rounded-xl text-yellow">
							<HiOutlineArrowNarrowLeft size={20} />
						</div>
						<h1 className="px-2 text-xl font-medium">back to website</h1>
					</button>
				</nav>
				<div className="h-screen w-screen absolute top-0 left-0 ">
					<Canvas
						className=" h-full w-full"
						orthographic
						camera={{ zoom: 150 }}
					>
						<Suspense fallback={null}>
							<Earth currentPage={currentPage} />
							<motion3d.pointLight position={[10, 5, 10]} />
							<motion3d.ambientLight intensity={0.1} />
						</Suspense>
					</Canvas>
				</div>
				<motion.div className="z-10 flex-1 relative">
					<motion.div
						className="w-screen h-full flex flex-col items-center justify-end pb-16  text-white absolute"
						animate={currentPage.toString()}
						initial={{ opacity: 0 }}
						variants={{
							0: { opacity: 1 },
						}}
					>
						<h1 className="uppercase text-7xl font-extralight mb-6">
							<strong className="font-medium">Our</strong> World
						</h1>
						<h2 className="text-4xl font-semibold mb-2 w-3/6  opacity-100 text-center leading-loose">
							spinning on green hydrogen
						</h2>
						<h3 className="w-3/6 text-2xl opacity-70 mb-6 text-center leading-loose">
							by offering a large-scale, cost-effictive hydrogen solution -
							accelerating us towards a successful energy turnaround by 2025
						</h3>
						<div className="h-14 w-8 bg-gray-900/40 rounded-full flex justify-center p-3">
							<div className="h-3 w-1 bg-yellow rounded-full"></div>
						</div>
					</motion.div>
					<motion.div
						className="w-screen h-full flex flex-col items-start justify-center p-20  text-white absolute gap-4"
						animate={currentPage.toString()}
						initial={{ opacity: 0 }}
						variants={{
							1: { opacity: 1 },
						}}
					>
						<h1 className="text-6xl font-medium">Renewable energy</h1>
						<h3 className="text-2xl leading-7">
							It all starts in regions with an abundance of space sun and wind
						</h3>
						<button className="p-2 bg-black/30 rounded-2xl flex items-center justify-between gap-4 ">
							<h1 className="px-2 text-xl font-medium">read more</h1>
							<div className="flex items-center justify-center bg-black/40 p-2 rounded-xl text-yellow">
								<HiOutlineArrowNarrowRight size={20} />
							</div>
						</button>
					</motion.div>
				</motion.div>
				<footer className="w-full h-8 bg-black/30 flex items-center justify-around gap-3 p-2 z-10">
					<button
						className="h-full w-20 bg-black/40 rounded-full flex items-center justify-center text-yellow"
						onClick={() =>
							setCurrentPage((prevState) => {
								if (prevState > 0) return (prevState -= 1);
								return prevState;
							})
						}
					>
						<HiOutlineArrowNarrowLeft size={20} />
					</button>
					<div className="h-full flex-1 flex items-center justify-center gap-3">
						{Array.from(Array(12).keys()).map((item) => (
							<button
								key={item}
								className="h-full w-1/12 p-1 bg-black/40 rounded-full flex items-center justify-center"
								onClick={() => {
									console.log(item);
									setCurrentPage(item);
								}}
							>
								{item === currentPage && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="h-full w-full bg-yellow/80 rounded-full"
									></motion.div>
								)}
							</button>
						))}
					</div>
					<button
						className="h-full w-20 bg-black/40 rounded-full flex items-center justify-center text-yellow"
						onClick={() =>
							setCurrentPage((prevState) => {
								if (prevState < 11) return (prevState += 1);
								return prevState;
							})
						}
					>
						<HiOutlineArrowNarrowRight size={20} />
					</button>
				</footer>
			</div>
		</div>
	);
}

export default App;
