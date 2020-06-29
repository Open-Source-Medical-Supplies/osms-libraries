import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import "./index.scss";
import { rootReducer } from "./redux/root.reducer";

const store = createStore(rootReducer);
const Index = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(Index, document.getElementById("osms-lib"));
