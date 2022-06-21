import { createSlice } from "@reduxjs/toolkit";

const selectedNodeInitialState = {
    id: null,
    data: { label: "", type: null, arn: null, integration: "" }
}
const nodesQInitialState = []
const edgesQInitialState = []

export const botDataSlice = createSlice({
    name: "botData",
    initialState: {
        dataProps: {
            propsVisible: true,
            selectedNode: selectedNodeInitialState,
            nodes: [],
            nodesQ: nodesQInitialState,
            edgesQ: edgesQInitialState
        },
    },
    reducers: {
        setPropsVisible: (state, { payload }) => {
            state.dataProps.propsVisible = payload
        },
        setSelectedNode: (state, { payload }) => {
            state.dataProps.selectedNode = payload
        },
        resetSelectedNode: (state) => {
            state.dataProps.selectedNode = selectedNodeInitialState
        },
    }
})

export const { setPropsVisible, setSelectedNode, setSelectedNodeLabel, setSelectedNodeArn, resetSelectedNode, setSelectedNodeDataType } = botDataSlice.actions

export default botDataSlice.reducer