import { configureStore } from "@reduxjs/toolkit"
import botDataReducer from "../slices/botDataSlice"
import globalReducer from "../slices/globalSlice"

export default configureStore({
    reducer: {
        botData: botDataReducer,
        global: globalReducer
    }
})