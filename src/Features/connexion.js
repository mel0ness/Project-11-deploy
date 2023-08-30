import { createSlice } from "@reduxjs/toolkit";
// import { connexion } from "../Utils/Selectors";

const initialState = {
fetching: "void",
connected: false,
token: null,
status: null,
message: null
}

const { actions, reducer} = createSlice({
name: "connexion",
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
            draft.token = action.payload.body
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

    connected : {
        reducer: (draft) => {
if (draft.status === 200) {
    draft.connected = true
    draft.message = null
    draft.fetching = "void"

}            
if (draft.status === 400) {
    draft.fetching = "void"
    draft.token = null

}
if (draft.status === 500) {
    draft.fetching = "void"
    draft.token = null
}
        }
    },
    Erase : {
        reducer: (draft) => {
return initialState
        }
    }


}

})

export const { fetch, resolved, rejected, connected, Erase } = actions;



export default reducer;