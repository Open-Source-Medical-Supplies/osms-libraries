import "flag-icon-css/css/flag-icon.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import Router from "./router";
import "./index.scss";
import { rootReducer } from "./redux/root.reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

const Index = (
	<Provider store={store}>
		<Router />
	</Provider>
);

ReactDOM.render(Index, document.getElementById("osms-lib"));
