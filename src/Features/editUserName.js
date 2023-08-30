import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fetching: "void",
    status: null
}

const {actions, reducer} = createSlice({
    name: "editing",
    initialState,
    reducers: {
        fetch: {
            reducer: (draft) => {
                if (draft.fetching === "void") {
                    draft.fetching = "pending"
                    return
                }
                if (draft.fetching === "rejected") {
                    draft.fetching = "pending"
                    draft.status = null
                    return
                }
                
            }
        },
        resolved: {
            reducer: (draft, action) => {
                draft.fetching = "resolved"
                draft.status = action.payload.status
                return
            }
        },
        rejected: {
            reducer: (draft, action) => {
                draft.fetching = "rejected"
                return
            }
        } }})

export const {fetch, resolved, rejected} = actions;

export default reducer;