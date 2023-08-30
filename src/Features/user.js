import { createSlice } from "@reduxjs/toolkit";
import { token } from "../Utils/Selectors";

const initialState = {
    fetching: "void",
    message: null,
    lastname: null,
    firstname: null,
    username: null
}

const { actions, reducer} = createSlice({
    name: "userDatas",
initialState,
reducers: {
    fetch: {
        reducer: (draft) => {
            if (draft.fetching === "void") {
                draft.fetching = "pending"
                draft.lastname = null
                draft.firstname = null
                draft.username = null
                draft.message = null
                return
            }
            if (draft.fetching === "rejected") {
                draft.fetching = "pending"
                draft.lastname = null
                draft.firstname = null
                draft.username = null
                draft.message = null
                return
            }
            
        }
    },
    resolved: {
        reducer: (draft, action) => {
            draft.fetching = "resolved"
            draft.lastname = action.payload.body.lastName
            draft.firstname = action.payload.body.firstName
            draft.username = action.payload.body.userName
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
    ActualizeUserName : {
reducer: (draft, action) => {
    draft.username = action.payload
    return
}
    },
    EraseUserState : {
        reducer: (draft) => {
return initialState
        }
    }
}
})

export async function fetchUsersInfs(dispatch, getState) {
const tokenActive = token(getState())
if(!tokenActive) {
    return
}
dispatch(actions.fetch())
try {
    let response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenActive}`
            },
          });
          let data = await response.json();
          dispatch(actions.resolved(data))
}
catch (error) {
    dispatch(actions.rejected(error))
}
}

export const {EraseUserState, ActualizeUserName} = actions;

export default reducer;