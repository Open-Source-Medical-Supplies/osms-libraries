import classNames from "classnames";
import { Sidebar } from "primereact/sidebar";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { LANG_ACTIONS } from "../redux/language.reducer";
import { LibAction, LIB_ACTIONS } from "../redux/lib.reducer";
import { useTypedSelector } from "../redux/root.reducer";
import popsicle from "../shared/assets/404-popsicle.svg";
import { CategoryInfo } from "../shared/classes/category-info.class";
import { Project } from "../shared/classes/project.class";
import CardContainer from "../shared/components/card-container/card-container";
import FilterMenu from "../shared/components/filter-menu/filter-menu";
import Loading from "../shared/components/loading";
import { TABLE_MAPPING } from "../shared/constants/general.constants";
import { SELECTED_ACTIONS } from "../shared/constants/selected.constants";
import ActiveLib, { ActiveLibToClassName } from "../shared/types/lib.enum";
import { SelectAction } from "../shared/types/selected.type";
import FullCard from "./selected-cards/full-card";
import "./_library-main.scss";

const LibraryMain = () => {
  const dispatch = useDispatch();
  const { isMobile, tables, lib, selected, filter } = useTypedSelector(
    ({ env, ...libs }) => ({
      isMobile: env.isMobile,
      ...libs,
    }),
    shallowEqual
  );

  const hide = () => dispatch<SelectAction>({
    type: SELECTED_ACTIONS.CLEAR_SELECTED
  });

  // load initial tables / change on lib-change
  useEffect(() => {
    if (tables.completed && !(tables.error && tables.error.full)) {
      const focus = tables.loaded[
        TABLE_MAPPING[ActiveLibToClassName[lib.active]]
      ] as Project[] | CategoryInfo[];

      new Promise(resolve => {
        dispatch({
          type: LANG_ACTIONS.INIT_LANGS,
          base: tables.loaded[TABLE_MAPPING.Translations]
        })
  
        dispatch<LibAction>({
          type: LIB_ACTIONS.SET_LIB,
          _data: focus,
          data: focus,
        });
        return resolve();
      }).then(() => {
        dispatch<SelectAction>({
          type: SELECTED_ACTIONS.CHECK_SELECTED,
          dataSet: focus,
          supportingDataSet: tables.loaded,
        });
      })

    }
	}, [tables.completed]); // eslint-disable-line react-hooks/exhaustive-deps
	
	useEffect(() => {
		if (tables.error) {
			if (tables.error.partial) {
				console.error('partial table error ' + navigator.language, tables)
			} else if (tables.error.full) {
				console.error('full table error ' + navigator.language)
			}
		}
	}, [tables.error]) // eslint-disable-line react-hooks/exhaustive-deps

  // updated selected on lib change
  useEffect(() => {
    if (lib._data.length > 0) {
      dispatch<SelectAction>({
        type: SELECTED_ACTIONS.CHECK_SELECTED,
        dataSet: lib._data,
        supportingDataSet: tables.loaded,
      });
    }
  }, [lib._data.length > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const libContainerClasses = classNames(
    "library-main-container",
    lib.active,
    {
      "library-main-container__grid__menu-closed": !filter.show,
      "library-main-container__grid__menu-open": filter.show,
      mobile: isMobile,
      desktop: !isMobile,
    }
  );

	const LibraryElement = (
		<div className={libContainerClasses}>
      <FilterMenu disabled={lib.active === ActiveLib.CATEGORY} />
      <Loading loading={!tables.completed}>
        <CardContainer records={lib.data} />
      </Loading>
      <Sidebar
        position="right"
        fullScreen={isMobile}
        visible={!!selected.data}
        onHide={hide}
        className={isMobile ? "" : "p-sidebar-lg"}
      >
        <FullCard />
      </Sidebar>
    </div>
	);

	const ErrorElement = (
		<div className='main-error-element'>
			<h2>
				A critical error occured when loading the database.
			</h2>
			<span>Please contact&nbsp;
				<a 
					href={
						"mailto:dev@opensourcemedicalsupplies.org" +
						"?subject=Table Load Error" +
						"&body=" +
						"lang:" + navigator.language + "%0A" +
						"tables: " + 
						Object.keys(tables.loaded)
							.map(k => (tables.loaded[k] as any).error ? k : null ).join(' ')
					}>
						dev@opensourcemedicalsupplies.org</a>
			</span>
			<img src={popsicle} alt="error"/>
		</div>
	)
	
  return tables.error ? ErrorElement : LibraryElement;
};
export default LibraryMain;
