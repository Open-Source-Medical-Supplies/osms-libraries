import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import "./index.css";
import { rootReducer } from "./redux/reducers/root.reducer";

const store = createStore(rootReducer);
const Index = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(Index, document.getElementById("root"));
