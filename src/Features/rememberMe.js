import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mail: "",
    remember: false
} 

const {actions, reducer} = createSlice({
    name: "rememberUser",
initialState,
reducers: {
stockUserName : {
    reducer: (draft, action) => {
        draft.mail = action.payload
        draft.remember = true
    }
},
dontStock : {
    reducer: (draft) => {
        draft.mail = ""
        draft.remember = false
    }
}
}
})

export const {stockUserName, dontStock} = actions;

export default reducer;