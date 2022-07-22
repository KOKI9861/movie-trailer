import { Route, Routes } from "solid-app-router";

import TopPage from "./TopPage";
import TrailerPage from "./TrailerPage";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<TopPage/>}/>
				<Route path="/theater/:method" element={<TrailerPage/>}/>
			</Routes>
		</>
	);
}

export default App;