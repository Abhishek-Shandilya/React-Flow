import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: "global",
    initialState: {
        darkMode: true
    },
    reducers: {
        setDarkMode: (state, { payload }) => {
            state.darkMode = payload
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        }
    }
})

export const { setDarkMode, toggleDarkMode } = globalSlice.actions

export default globalSlice.reducer