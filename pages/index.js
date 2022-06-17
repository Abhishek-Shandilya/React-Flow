import { useCallback } from "react"
import ReactFlow, { addEdge, useEdgesState, useNodesState } from "react-flow-renderer"
import initialNodes from "../data/nodes"
import initialEdges from "../data/edges"
import DataSourceNode from "../components/nodeTypes/DataSourceNode";
import Controllers from "../components/Controllers/Controllers";
import { useDispatch } from "react-redux";
import EvaluatorNode from "../components/nodeTypes/EvaluatorNode";
import ActionNode from "../components/nodeTypes/ActionNode";
import { useSelector } from "react-redux";
import styles from '../styles/Home.module.css'

const nodeTypes = { datasource: DataSourceNode, evaluator: EvaluatorNode, action: ActionNode }
const defaultEdgeOptions = { animated: false }

export default function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState([])

    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { selectedNode, propsVisible } = useSelector(state => state.botData.dataProps)
    const darkMode = useSelector(state => state.global.darkMode)

    const onConnect = useCallback(connection => setEdges(eds => addEdge(connection, eds)), [setEdges])

    const dispatch = useDispatch()


    const toggleMiniMap = () => {
        setMiniMap(!miniMap)
    }
    const onNodeClick = (e) => {
        let targetId = e.target.id
        if (propsVisible !== true) {
            dispatch({ type: "botData/setPropsVisible", payload: true })
        }
        if (selectedNode?.id !== targetId) {
            // ids start with one
            // indices start with zero
            dispatch({ type: "botData/setSelectedNode", payload: nodes[targetId - 1] })
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
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    defaultEdgeOptions={defaultEdgeOptions}
                    nodeTypes={nodeTypes}
                    onNodeClick={(e) => onNodeClick(e)}
                    onNodesDelete={(nodes) => onNodesDelete(nodes)}
                    fitView >
                    <Controllers nodes={nodes} setNodes={setNodes} />
                </ReactFlow>
            </div>
        </div>
    )
}