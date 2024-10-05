import {
	Accordion,
	Alert,
	Button,
	ButtonGroup,
	Stack,
	TagsInput,
	TextInput,
	Title,
} from "@mantine/core";
import { IconInfoCircle, IconTrash, IconUpload } from "@tabler/icons-react";
import { useConfig, useConfigFormContext, useCurrentConfig } from "./context";

export const ConfigList = () => {
	const { config, setConfig } = useConfig();
	const { setCurrentConfig } = useCurrentConfig();
	const configForm = useConfigFormContext();

	const handleConfigRemove = (key: string) => {
		const temp = { ...config };
		delete temp[key];
		setConfig(temp);
	};

	const handleConfigLoad = (key: string) => {
		setCurrentConfig(key);
		configForm.setValues(config[key]);
	};

	return (
		<>
			<Title order={3} mb="sm">
				vorhandene Einträge
			</Title>

			<Accordion>
				{config &&
					Object.keys(config).map((k) => {
						return (
							<Accordion.Item value={k} key={k}>
								<Accordion.Control>
									{config[k].name}
								</Accordion.Control>
								<Accordion.Panel>
									<Stack>
										<TextInput
											label="URL"
											defaultValue={config[k].url}
											readOnly
										/>
										<TagsInput
											label="Anzeigename"
											defaultValue={config[k].displayName}
											readOnly
										/>
										<ButtonGroup>
											<Button
												onClick={() =>
													handleConfigLoad(k)
												}
												leftSection={<IconUpload />}
											>
												laden
											</Button>
											<Button
												onClick={() =>
													handleConfigRemove(k)
												}
												leftSection={<IconTrash />}
												color="red"
											>
												löschen
											</Button>
										</ButtonGroup>
									</Stack>
								</Accordion.Panel>
							</Accordion.Item>
						);
					})}
				{!config && (
					<Alert
						title="keine Einträge gefunden"
						icon={<IconInfoCircle />}
					/>
				)}
			</Accordion>
		</>
	);
};
