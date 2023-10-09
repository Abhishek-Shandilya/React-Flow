
import { useSelector } from "react-redux";
import styles from './nodes.module.css'
import { useMemo } from "react";
import Add from "../Add/Add";
import { Handle } from "reactflow";

export default function DataSourceNode({ data, sourcePosition, id }) {
    const darkMode = useSelector(state => state.global.darkMode)
    const iconSrc = data.type === "listener" ? "/images/conversion_path.svg" : "/images/cable.svg"
    const integrationSrc = useMemo(() => `/images/${data.integration}.svg`, [data])
    const selectedNode = useSelector(state => state.botData.dataProps.selectedNode)
    const nodeSelected = useMemo(() => selectedNode?.id === id ? styles.nodeSelected : "", [selectedNode?.id])
    return (
        <div
            id={id}
            className={`${styles.node} ${nodeSelected}`}
            data-darkmode={darkMode}>
            <Handle type="source" position={sourcePosition} />
            <div
                id={id}
                className={styles.content}>
                {data.integration &&
                    <img src={integrationSrc} className={styles.integrationIcon} />
                }
                <div>
                    <div
                        id={id}
                        style={{
                            fontSize: "0.5rem"
                        }}
                        className={styles.content_firstRow}>
                        <img
                            id={id}
                            src={iconSrc}
                            height={10}
                            className={styles.content_icon}
                        />
                        {data.type}</div>
                    <p
                        id={id}
                        className={styles.arn}>{data.arn}</p></div>
                <Add id={id} className={styles.add_container} buttons={["evaluator", "action"]} data={data} />
            </div>
        </div >
    )
}