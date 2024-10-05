import { Accordion } from "@mantine/core";
import { JsonInput } from "./jsonInput";
import { KEY } from "./main";
import { useConfig, useCurrentConfig, useJsonFormContext } from "./context";
import { useState } from "react";

export const Json = () => {
	const [jsonAcc, setJsonAcc] = useState<string>("");
	const { config } = useConfig();
	const jsonForm = useJsonFormContext();
	const { currentConfig } = useCurrentConfig();

	return (
		<Accordion.Item value="json">
			<Accordion.Control>Daten bearbeiten</Accordion.Control>
			<Accordion.Panel>
				<form>
					<Accordion
						value={jsonAcc}
						onChange={(e) => setJsonAcc(e || "")}
					>
						{config &&
							Object.keys(config).includes(currentConfig) &&
							jsonForm.getValues().data.map((e, i) => {
								return (
									<Accordion.Item value={e[KEY]} key={e[KEY]}>
										<Accordion.Control>
											{config[currentConfig].displayName
												.map((d) =>
													Object.keys(e).includes(d)
														? e[d]
														: "???"
												)
												.join(" - ")}
										</Accordion.Control>
										{jsonAcc === e[KEY] && (
											<Accordion.Panel>
												{Object.keys(e).map((k) => (
													<JsonInput
														key={k}
														k={k}
														object={e}
														index={i}
													/>
												))}
											</Accordion.Panel>
										)}
									</Accordion.Item>
								);
							})}
					</Accordion>
				</form>
			</Accordion.Panel>
		</Accordion.Item>
	);
};
