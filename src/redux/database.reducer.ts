const defaultState = {
    bom: {},
    categories: {
        _records: {},
        records: {},
        links: {}
    },
    projects: {
        _records: {},
        records: {}
    }
};

type Actions =  'updateCategoryRecords' | 'updateCategoryLinks' | 'updateProjects' | 'updateBoM';

const databaseReducer = (state = defaultState, action: Actions) => {
    switch(action) {
        case "updateBoM":
            break;
        case "updateCategoryLinks":
            break;
        case "updateCategoryRecords":
            break;
        case "updateProjects":
            break;
        default:
            return state;
    }
}

export default databaseReducer;