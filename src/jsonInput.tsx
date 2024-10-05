import { NumberInput, TextInput } from "@mantine/core";
import { useJsonFormContext } from "./context";
import { KEY } from "./main";

export const JsonInput = (props: {
	k: string;
	index: number;
	object: { [key: string]: any };
}) => {
	const jsonForm = useJsonFormContext();

	if (props.k === KEY) return null;
	switch (typeof props.object[props.k]) {
		case "number":
			return (
				<NumberInput
					{...jsonForm.getInputProps(
						`data.${props.index}.${props.k}`
					)}
					key={jsonForm.key(`data.${props.index}.${props.k}`)}
					hideControls
					label={props.k}
				/>
			);
		case "string":
			return (
				<TextInput
					{...jsonForm.getInputProps(
						`data.${props.index}.${props.k}`
					)}
					key={jsonForm.key(`data.${props.index}.${props.k}`)}
					label={props.k}
				/>
			);

		default:
			return null;
	}
};
