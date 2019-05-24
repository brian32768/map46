export const actions = {
    // Bookmarks
    ADD_BOOKMARK: 'ADD_BOOKMARK',
    DELETE_BOOKMARK: 'DELETE_BOOKMARK',

    // Map extent
    SET_MAP_CENTER: 'SET_MAP_CENTER',
};

// FIXME this key is not going to be unique after reload
let _id = 1;
export function uniqueId() {
    return _id++;
}
