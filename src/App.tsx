import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

const LazyCategoryLib = React.lazy(() =>
	import("./components/category-library/category-library.component")
);
const LazyProjectLib = React.lazy(() =>
	import("./components/project-library/project-library.component")
);

function App() {
	return (
		<BrowserRouter basename="/libraries">
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path="/category-library" component={LazyCategoryLib} />
					<Route path="/project-library" component={LazyProjectLib} />
					<Redirect from="*" to="/" />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
