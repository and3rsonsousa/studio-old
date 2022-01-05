import { requireUserId, getUser } from "~/utils/session.server";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import Layout from "~/components/Layout";
import { useState, useEffect } from "react";
import Color from "color";

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await requireUserId(request);
	const user = await getUser(request);
	return user;
};

export default () => {
	const user = useLoaderData();
	const [h, setH] = useState("0");
	const [s, setS] = useState("50");
	const [l, setL] = useState("50");
	const [color, setColor] = useState(Color({ h, s, l }));

	useEffect(() => {
		setColor(Color({ h, s, l }));
	}, [h, s, l]);
	return (
		<Layout user={user}>
			<div className="p-2">
				<div className="py-8 prose">
					<h1>Pallete</h1>
				</div>
				<div className="grid grid-cols-2 gap-8">
					<div className="space-y-4 ">
						<div className="flex space-x-2">
							<input
								type="range"
								name=""
								id=""
								step=".1"
								min={0}
								max={359}
								className="w-full"
								value={h}
								onChange={(event) => {
									setH(event.target.value);
								}}
							/>
							<div>
								<input
									type="text"
									value={h}
									onChange={(event) =>
										setH(event?.target.value)
									}
									className="w-16 text-right border-gray-200"
								/>
							</div>
						</div>
						<div className="flex space-x-2">
							<input
								type="range"
								name=""
								id=""
								step=".1"
								min={0}
								max={100}
								className="w-full"
								value={s}
								onChange={(event) => {
									setS(event.target.value);
								}}
							/>
							<div>
								<input
									type="text"
									value={s}
									onChange={(event) =>
										setH(event?.target.value)
									}
									className="w-16 text-right border-gray-200"
								/>
							</div>
						</div>
						<div className="flex space-x-2">
							<input
								type="range"
								name=""
								id=""
								step=".1"
								min={0}
								max={100}
								className="w-full"
								value={l}
								onChange={(event) => {
									setL(event.target.value);
								}}
							/>
							<div>
								<input
									type="text"
									value={l}
									onChange={(event) =>
										setH(event?.target.value)
									}
									className="w-16 text-right border-gray-200"
								/>
							</div>
						</div>
					</div>
					<div>
						<div className="flex">
							<div
								className="w-16 h-16 rounded-lg"
								style={{ backgroundColor: color.hex() }}
							></div>

							<div className="ml-8">{color.hex()}</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};
