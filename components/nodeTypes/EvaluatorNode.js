import { useMemo } from "react";
import { Handle } from "react-flow-renderer";
import { useSelector } from "react-redux";
import Add from "../Add/Add";
import styles from './nodes.module.css'

export default function EvaluatorNode({ data, sourcePosition, targetPosition, id }) {
    const darkMode = useSelector(state => state.global.darkMode)
    const selectedNode = useSelector(state => state.botData.dataProps.selectedNode)
    const nodeSelected = useMemo(() => selectedNode?.id === id ? styles.nodeSelected : "", [selectedNode?.id])
    return (
        <div
            id={id}
            className={`${styles.node} ${nodeSelected}`}
            data-darkmode={darkMode}
        >
            <Handle type="source" position={sourcePosition} />
            <Handle type="target" position={targetPosition} />
            <div>
                <p
                    id={id}
                    className={styles.arn}>{data.label}</p>
            </div>
            <Add id={id} data={data} className={styles.add_container} buttons={["action"]} />
        </div>
    )
}