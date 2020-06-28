import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import CategoryLibrary from "./components/category-library/category-library.component";
import ProjectLibrary from "./components/project-library/project-library.component";
import { CHECK_MOBILE } from "./redux/actions/check-mobile.action";

/* '20-06-28 * Can't get working due to bad path names after build + hosting */
// const LazyCategoryLib = React.lazy(() =>
// 	import("./components/category-library/category-library.component")
// );
// const LazyProjectLib = React.lazy(() =>
// 	import("./components/project-library/project-library.component")
// );
const dispatch = useDispatch();

function App() {

  useEffect(() => {
    // may move / change to constantly check, but seems overkill
    dispatch({type: CHECK_MOBILE});
  }, [])

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
