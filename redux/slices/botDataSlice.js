import { createSlice } from "@reduxjs/toolkit";

const selectedNodeInitialState = {
    id: null,
    data: { label: "", type: null, arn: null }
}

export const botDataSlice = createSlice({
    name: "botData",
    initialState: {
        dataProps: {
            propsVisible: false,
            selectedNode: selectedNodeInitialState
        }
    },
    reducers: {
        setPropsVisible: (state, { payload }) => {
            state.dataProps.propsVisible = payload
        },
        setSelectedNode: (state, { payload }) => {
            state.dataProps.selectedNode = payload
        },
        setSelectedNodeLabel: (state, { payload }) => {
            state.dataProps.selectedNode.data.label = payload
        },
        setSelectedNodeDataType: (state, { payload }) => {
            state.dataProps.selectedNode.data.type = payload
        },
        setSelectedNodeArn: (state, { payload }) => {
            state.dataProps.selectedNode.data.arn = payload
        },
        resetSelectedNode: (state) => {
            state.dataProps.selectedNode = selectedNodeInitialState
        }
    }
})

export const { setPropsVisible, setSelectedNode, setSelectedNodeLabel, setSelectedNodeArn, resetSelectedNode } = botDataSlice.actions

export default botDataSlice.reducer