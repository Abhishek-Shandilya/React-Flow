import { useMemo, useState } from "react"
import { useReactFlow } from "react-flow-renderer"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import fetchers from "../data/fetchers"
import styles from "./ActionsMenu.module.css"

const initialMinimizeState = true

export default function ActionsMenu({ nodes, setNodes }) {
    const dispatch = useDispatch()
    const darkMode = useSelector(state => state.global.darkMode)
    const [minimize, setMinimize] = useState(initialMinimizeState)
    const dataSourceNode = useMemo(() => nodes.find(node => node.type === 'datasource'), [nodes])
    const { setCenter, toObject } = useReactFlow()
    const addNode = (label, type, dataType) => {
        let x = label === "Action" ? 210 : 110
        let y = 50
        let temp = null;
        if (type === 'datasource') {
            temp = {
                id: `${nodes.length + 1}`,//it needs to be a string
                type: 'datasource',
                data: { label: label, type: dataType, ...fetchers[0] },
                position: { x: x, y: y },
                sourcePosition: "right"
            }
        }
        else {
            temp = {
                id: `${nodes.length + 1}`,//it needs to be a string
                type: type,
                data: { label: label },
                position: { x: x, y: y },
                targetPosition: "left",
                sourcePosition: "right"
            }
        }
        setNodes([...nodes, temp])
        setCenter(x, y, { duration: 250 })
    }
    const className = useMemo(() => minimize ? "rotate-right" : "rotate-left", [minimize])
    const widthTransition = useMemo(() => minimize ? "small-width" : "large-width", [minimize])
    const buttons = [
        {
            onClick: () => addNode("Evaluator", "evaluator"),
            text: "Add Evaluator",
            logo: "/images/find_in_page.svg"
        },
        {
            onClick: () => addNode("Action", "action"),
            text: "Add Action",
            logo: "/images/move_up.svg"
        },
        {
            onClick: () => dispatch({ type: 'global/toggleDarkMode' }),
            text: "Toggle DarkMode",
            logo: darkMode ? "/images/dark_mode_filled.svg" : "/images/dark_mode.svg"
        },
        {
            onClick: () => console.log(toObject()),
            text: "Save"
        }
    ]
    return (
        <>
            <div className={`${styles[widthTransition]} ${styles.container}`} data-darkmode={darkMode}>
                <div className={styles.relative}>
                    {minimize === false &&
                        <div className={styles.buttons}>
                            {!dataSourceNode &&
                                <button
                                    onClick={() => addNode("DataSource", "datasource", "fetcher")}
                                    className={styles.button}
                                    data-darkmode={darkMode}
                                ><img
                                        src="/images/adf_scanner.svg"
                                        height={24}
                                        className={styles.button_logo}
                                        data-darkmode={darkMode} />Add DataSource</button>
                            }
                            {buttons.map((button, index) => <button
                                onClick={button.onClick}
                                className={styles.button}
                                data-darkmode={darkMode}
                                key={index}><img
                                    src={button.logo}
                                    height={24}
                                    className={styles.button_logo}
                                    data-darkmode={darkMode} />{button.text}</button>)}
                        </div>
                    }
                    <button
                        onClick={() => setMinimize(!minimize)}>
                        <img
                            src="/images/chevron_right.svg"
                            className={`${styles[className]} ${styles.icon}`}
                            data-darkmode={darkMode} /></button>
                </div>
            </div>
        </>
    )
}