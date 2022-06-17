import { Handle } from "react-flow-renderer";
import { useSelector } from "react-redux";
import styles from './nodes.module.css'
import { useMemo } from "react";

export default function DataSourceNode({ data, sourcePosition, id }) {
    const darkMode = useSelector(state => state.global.darkMode)
    const iconSrc = data.type === "listener" ? "/images/conversion_path.svg" : "/images/cable.svg"
    const integrationSrc = useMemo(() => `/images/${data.integration}.svg`, [data])
    return (
        <div
            id={id}
            className={styles.node}
            data-darkmode={darkMode}>
            <Handle type="source" position={sourcePosition} />
            <div
                id={id}
                className={styles.content}>
                {data.integration &&
                    <img src={integrationSrc} height={24} />
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
                        style={{ fontSize: "0.8rem" }}>{data.arn}</p></div>
            </div>
        </div >
    )
}