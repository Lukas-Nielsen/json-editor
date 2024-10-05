import { createFormContext } from "@mantine/form";
import { IConfig } from "./model";
import { createContext, useContext } from "react";
import { randomId } from "@mantine/hooks";

export const [ConfigFormProvider, useConfigFormContext, useConfigForm] =
	createFormContext<IConfig>();

export const [JsonFormProvider, useJsonFormContext, useJsonForm] =
	createFormContext<{ data: { [key: string]: any }[] }>();

export const ConfigContext = createContext<{
	setConfig: (
		val:
			| { [key: string]: IConfig }
			| ((prevState: { [key: string]: IConfig }) => {
					[key: string]: IConfig;
			  })
	) => void;
	config: { [key: string]: IConfig };
}>({ setConfig: () => null, config: {} });

export const useConfig = () => {
	return useContext(ConfigContext);
};

export const CurrentConfigContext = createContext<{
	setCurrentConfig: React.Dispatch<React.SetStateAction<string>>;
	currentConfig: string;
}>({ setCurrentConfig: () => null, currentConfig: randomId() });

export const useCurrentConfig = () => {
	return useContext(CurrentConfigContext);
};
