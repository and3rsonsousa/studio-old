import { IBasic } from "~/types";

export default function ({
	flows,
	steps,
	tags,
}: {
	flows: IBasic[];
	steps: IBasic[];
	tags: IBasic[];
}) {
	return (
		<div className="py-8">
			<div className="flex flex-wrap gap-2 mb-16">
				{flows.map((item: IBasic) => (
					<div className={`${item.slug}-bg badge`} key={item.id}>
						{item.name}
					</div>
				))}
			</div>
			<div className="flex flex-wrap gap-2 mb-16">
				{steps.map((item: IBasic) => (
					<div className={`${item.slug}-bg badge`} key={item.id}>
						{item.name}
					</div>
				))}
			</div>
			<div className="flex flex-wrap gap-2 mb-16">
				{tags.map((item: IBasic) => (
					<div className={`${item.slug}-bg badge`} key={item.id}>
						{item.name}
					</div>
				))}
			</div>
			<div className="flex flex-wrap gap-2 mb-16">
				{tags.map((item: IBasic) => (
					<div
						className={`action-${item.slug}-bg badge`}
						key={item.id}
					>
						{item.name}
					</div>
				))}
			</div>
		</div>
	);
}
