import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fetching: "void",
    status: null,
    message: null
}

const {actions, reducer} = createSlice({
    name: "createUser",
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
                    draft.message = null
                    return
                }
                
            }
        },
        resolved: {
            reducer: (draft, action) => {
                draft.fetching = "resolved"
                draft.status = action.payload.status
                draft.message = action.payload.message
                return
            }
        },
        rejected: {
            reducer: (draft, action) => {
                draft.fetching = "rejected"
                draft.message = action.payload.error
                return
            }
        },
        EraseNewUser : {
            reducer: (draft) => {
    return initialState
            }
        }
    }
})

export const {fetch, resolved, rejected, EraseNewUser} = actions;

export default reducer;