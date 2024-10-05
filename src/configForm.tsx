import { Button, Group, Stack, TagsInput, TextInput } from "@mantine/core";
import { IconDeviceFloppy, IconRestore, IconUpload } from "@tabler/icons-react";
import {
	useConfig,
	useConfigFormContext,
	useCurrentConfig,
	useJsonFormContext,
} from "./context";
import { randomId, useFetch } from "@mantine/hooks";
import { FormEvent, useState } from "react";
import { KEY } from "./main";

export const ConfigForm = () => {
	const configForm = useConfigFormContext();
	const jsonForm = useJsonFormContext();
	const { config, setConfig } = useConfig();
	const { currentConfig, setCurrentConfig } = useCurrentConfig();
	const [url, setUrl] = useState<string>("");

	const { data: json, refetch } = useFetch<{ [key: string]: any }[]>(
		`https://cors.lukasnielsen.de?url=${encodeURI(url)}`,
		{ autoInvoke: false }
	);

	const handleConfigSave = (e: FormEvent) => {
		e.preventDefault();
		const temp = { ...config };
		temp[currentConfig] = configForm.getValues();
		if (temp !== config) {
			setConfig(temp);
		}
	};

	const handleConfigReset = () => {
		setCurrentConfig(randomId());
		configForm.reset();
	};

	const handleLoadJSON = () => {
		refetch()?.then(() => {
			jsonForm.setValues({
				data: json?.map((e) => ({ ...e, [KEY]: randomId() })) || [],
			});
		});
	};

	configForm.watch("url", (e) => {
		setUrl(e.value);
	});

	return (
		<form onSubmit={handleConfigSave}>
			<Stack>
				<TextInput
					label="Name"
					description="aussagekräftiger Name um die Konfig wieder zufinden"
					{...configForm.getInputProps("name")}
					key={configForm.key("name")}
					placeholder="Name"
				/>
				<TextInput
					label="URL"
					description="Web URL zur JSON-Datei"
					{...configForm.getInputProps("url")}
					key={configForm.key("url")}
					placeholder="URL"
				/>
				<TagsInput
					label="Anzeigename"
					description="aus welchen Feldern der Anzeigename gebildet werden soll"
					{...configForm.getInputProps("displayName")}
					key={configForm.key("displayName")}
					placeholder="name, number ...."
				/>
				<Group wrap="wrap" gap="sm">
					<Button
						type="submit"
						onClick={handleConfigSave}
						leftSection={<IconDeviceFloppy />}
					>
						speichern
					</Button>
					<Button
						type="reset"
						onClick={handleConfigReset}
						leftSection={<IconRestore />}
						color="red"
					>
						zurücksetzten
					</Button>
					<Button
						onClick={handleLoadJSON}
						leftSection={<IconUpload />}
						color="lime"
					>
						JSON (neu) laden
					</Button>
				</Group>
			</Stack>
		</form>
	);
};
