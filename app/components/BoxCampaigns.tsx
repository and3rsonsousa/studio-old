import dayjs from "dayjs";
import { ICampaign } from "~/types";

export default function BoxCampaigns({
	campaigns,
}: {
	campaigns: ICampaign[];
}) {
	return (
		<>
			<div className="flex items-center justify-between pt-4 mb-4 space-x-4 snap-start">
				<div className="prose">
					<h2 className=" whitespace-nowrap">Campanhas</h2>
				</div>

				<div>
					<button className="button button-small button-ghost">
						Ver todos
					</button>
				</div>
			</div>
			<div className="p-0 mb-8 page-over">
				<div className="flex w-full overflow-x-auto divide-x scroll-smooth snap-x snap-mandatory">
					{campaigns.map((campaign: ICampaign) => (
						<div key={campaign.id} className="shrink-0 snap-start">
							<div className="p-8 shrink-0 w-52 md:w-80">
								<div className="text-lg font-medium leading-tight">
									{campaign.name}
								</div>
								<div className="font-medium tracking-wide text-gray-400 uppercase text-xx">
									{dayjs(campaign.start).format(
										"[De] D [de] MMMM"
									)}
									{dayjs(campaign.end).format(
										" [a] D [de] MMMM"
									)}
								</div>
								<div className="mt-2 text-sm text-gray-600">
									{campaign.actions.length > 0
										? `${campaign.actions.length} Ações`
										: "Nenhuma ação cadastrada até o momento."}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
