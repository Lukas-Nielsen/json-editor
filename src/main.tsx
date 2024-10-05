import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App.tsx";
import "@mantine/core/styles.layer.css";
import "./app.module.css";
import {
	ConfigContext,
	ConfigFormProvider,
	CurrentConfigContext,
	JsonFormProvider,
	useConfigForm,
	useJsonForm,
} from "./context.tsx";
import { randomId, useLocalStorage } from "@mantine/hooks";
import { IConfig } from "./model";

export const KEY = "json-editor-key";

const Context = () => {
	const configForm = useConfigForm({
		initialValues: {
			displayName: [],
			name: "",
			url: "",
		},
	});

	const jsonForm = useJsonForm({
		initialValues: { data: [] },
	});

	const [config, setConfig] = useLocalStorage<{ [key: string]: IConfig }>({
		key: "history",
	});

	const [currentConfig, setCurrentConfig] = useState<string>(randomId());

	return (
		<ConfigFormProvider form={configForm}>
			<JsonFormProvider form={jsonForm}>
				<ConfigContext.Provider value={{ setConfig, config }}>
					<CurrentConfigContext.Provider
						value={{ currentConfig, setCurrentConfig }}
					>
						<App />
					</CurrentConfigContext.Provider>
				</ConfigContext.Provider>
			</JsonFormProvider>
		</ConfigFormProvider>
	);
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MantineProvider defaultColorScheme="auto">
			<Context />
		</MantineProvider>
	</StrictMode>
);
