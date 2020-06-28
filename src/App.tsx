import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import CategoryLibrary from "./components/category-library/category-library.component";
import ProjectLibrary from "./components/project-library/project-library.component";

/* '20-06-28 * Can't get working due to bad path names after build + hosting */
// const LazyCategoryLib = React.lazy(() =>
// 	import("./components/category-library/category-library.component")
// );
// const LazyProjectLib = React.lazy(() =>
// 	import("./components/project-library/project-library.component")
// );

function App() {
	return (
		<BrowserRouter basename="/libraries">
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path="/category-library" component={CategoryLibrary} />
					<Route path="/project-library" component={ProjectLibrary} />
					<Redirect from="*" to="/" />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
