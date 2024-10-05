import { Accordion, Space } from "@mantine/core";
import { ConfigList } from "./configList";
import { ConfigForm } from "./configForm";

export const Config = () => {
	return (
		<Accordion.Item value="config">
			<Accordion.Control>Konfiguration</Accordion.Control>
			<Accordion.Panel>
				<ConfigForm />

				<Space h="md" />

				<ConfigList />
			</Accordion.Panel>
		</Accordion.Item>
	);
};
