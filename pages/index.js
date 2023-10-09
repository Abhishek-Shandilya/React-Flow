import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, { addEdge, useEdgesState, useNodesState, useReactFlow, ReactFlowProvider } from "reactflow"
import DataSourceNode from "../components/nodeTypes/DataSourceNode";
import Controllers from "../components/Controllers/Controllers";
import EvaluatorNode from "../components/nodeTypes/EvaluatorNode";
import ActionNode from "../components/nodeTypes/ActionNode";
import styles from '../styles/Home.module.css'
import initialNodes from "../data/nodes"

const nodeTypes = { datasource: DataSourceNode, evaluator: EvaluatorNode, action: ActionNode }
const defaultEdgeOptions = { animated: false }

export function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { selectedNode, propsVisible } = useSelector(state => state.botData.dataProps)
    const darkMode = useSelector(state => state.global.darkMode)
    const onConnect = useCallback(connection => setEdges(eds => addEdge(connection, eds)), [setEdges])
    const dispatch = useDispatch()
    const { setCenter } = useReactFlow()
    const onNodeClick = (e) => {
        let targetId = e.target.id
        if (propsVisible !== true) {
            dispatch({ type: "botData/setPropsVisible", payload: true })
        }
        if (targetId) {
            if (selectedNode?.id !== targetId) {
                // ids start with one
                // indices start with zero
                dispatch({ type: "botData/setSelectedNode", payload: nodes.find(node => node.id === targetId) })
            }
        }
    }
    const onNodesDelete = (nodes) => {
        for (let index in nodes) {
            if (nodes[index].id === selectedNode?.id) {
                dispatch({ type: "botData/resetSelectedNode" })
            }
        }
    }
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
            data-darkmode={darkMode}
            className={styles.container}>
            <div style={{
                height: "80vh",
                width: "80vw",
                border: "hsl(300, 100%, 15%) 1px solid"
            }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onInit={() => {
                        dispatch({ type: 'botData/setSelectedNode', payload: nodes[0] })
                        setCenter(300, 50, { zoom: 2, duration: 800 })
                    }}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    defaultEdgeOptions={defaultEdgeOptions}
                    nodeTypes={nodeTypes}
                    onNodeClick={(e) => onNodeClick(e)}
                    onNodesDelete={(nodes) => onNodesDelete(nodes)}
                    fitView
                >
                    <Controllers nodes={nodes} setNodes={setNodes} />
                </ReactFlow>
            </div>
        </div>
    )
}

export default () => (
    <ReactFlowProvider>
        <Flow />
    </ReactFlowProvider>
)