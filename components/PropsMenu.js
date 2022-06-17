import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import fetchers from "../data/fetchers"
import listeners from "../data/listeners"
import styles from "./PropsMenu.module.css"

export default function PropsMenu({ nodes, setNodes }) {
    const { selectedNode, propsVisible } = useSelector(state => state.botData.dataProps)
    const darkMode = useSelector(state => state.global.darkMode)
    const [chooseDataSource, setChooseDataSource] = useState(false)
    const dispatch = useDispatch()
    const onInputChange = (e) => {
        const targetValue = e.target.value
        setNodes((nds) =>
            nds.map((node) => {
                let temp = { ...node }
                if (node.id === selectedNode.id) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    temp.data = {
                        ...temp.data,
                        type: targetValue,
                        arn: "Choose",
                        integration: ""
                    };
                }
                return temp;
            })
        );
        dispatch({ type: "botData/setSelectedNodeDataType", payload: targetValue })
    }
    const onDataSourceChange = (e) => {
        const targetValue = e.target.value
        let datasource = null
        setNodes((nds) =>
            nds.map((node) => {
                let temp = { ...node }
                if (temp.data.type === 'fetcher') {
                    datasource = fetchers.find(fetcher => fetcher.arn === targetValue)
                }
                else {
                    datasource = listeners.find(listener => listener.arn === targetValue)
                }
                if (node.id === selectedNode.id) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    temp.data = {
                        ...temp.data,
                        ...datasource
                    };
                }
                return temp;
            })
        );
        dispatch({ type: "botData/setSelectedNodeArn", payload: targetValue })
    }
    const options = [
        { value: "fetcher" },
        { value: "listener" }
    ]
    const dataSourceOptions = useMemo(() => selectedNode?.data.type === 'fetcher' ? fetchers : listeners, [fetchers, listeners, selectedNode])
    return (
        <>{propsVisible &&
            <div
                className={styles.propsMenuContainer}
                data-darkmode={darkMode}>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <button
                        onClick={() => dispatch({ type: "botData/setPropsVisible", payload: false })}
                        className={styles.close}
                        data-darkmode={darkMode}>
                        <img
                            src="/images/close.svg"
                            height={24} /></button>
                </div>
                {nodes.length > 0 &&
                    <div
                        className={styles.content}
                        data-darkmode={darkMode}>
                        {selectedNode?.id}
                        {selectedNode?.data.type &&
                            <>
                                {chooseDataSource === false &&
                                    <p
                                        onClick={() => setChooseDataSource(true)}
                                        className={styles.p}>{selectedNode.data.type}</p>}
                                {chooseDataSource === true &&
                                    <select
                                        value={selectedNode.data.type}
                                        onChange={(e) => onInputChange(e)}
                                        onBlur={() => setChooseDataSource(false)}
                                        className={styles.select}
                                    >
                                        {options.map((option, index) => <option
                                            value={option.value}
                                            key={index}
                                            style={{
                                                backgroundColor: "var(--light10)",
                                                color: "var(--light80)",
                                            }}>{option.value}</option>)}</select>}</>
                        }
                        {(selectedNode?.data.arn || selectedNode?.data.arn === "") && selectedNode?.data.arn !== null &&
                            <select
                                value={selectedNode?.data.arn}
                                onChange={(e) => onDataSourceChange(e)}
                                style={{
                                    backgroundColor: "inherit",
                                    color: "inherit",
                                    fontSize: "1rem",
                                    outline: "none",
                                    padding: "0.25rem 0.5rem",
                                    border: "none"
                                }}>
                                <option
                                    value={""}
                                    style={{
                                        backgroundColor: "var(--light10)",
                                        color: "var(--light80)",
                                    }}>Choose</option>
                                {dataSourceOptions.map((option, index) => <option
                                    value={option.arn}
                                    key={index}
                                    style={{
                                        backgroundColor: "var(--light10)",
                                        color: "var(--light80)",
                                    }}>{option.arn}</option>)}
                            </select>
                        }
                    </div>
                }
            </div>
        }
        </>
    )
}