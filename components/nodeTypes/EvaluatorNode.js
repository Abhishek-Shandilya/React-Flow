import { Handle } from "react-flow-renderer";
import { useSelector } from "react-redux";
import styles from './nodes.module.css'

export default function EvaluatorNode({ data, sourcePosition, targetPosition, id }) {
    const darkMode = useSelector(state => state.global.darkMode)
    return (
        <div
            id={id}
            className={styles.node}
            data-darkmode={darkMode}
        >
            <Handle type="source" position={sourcePosition} />
            <Handle type="target" position={targetPosition} />
            <div>
                <p
                    id={id}
                    style={{
                        fontSize: "0.8rem"
                    }}>{data.label}</p>
            </div>
        </div>
    )
}