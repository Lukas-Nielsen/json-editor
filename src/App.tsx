import classes from "./app.module.css";
import { Accordion, Center, Stack } from "@mantine/core";
import { Config } from "./config";
import { Json } from "./json";

function App() {
	return (
		<Center>
			<Stack component="main" className={classes.main}>
				<h1>JSON Editor</h1>
				<Accordion>
					<Config />

					<Json />
				</Accordion>
			</Stack>
		</Center>
	);
}

export default App;
