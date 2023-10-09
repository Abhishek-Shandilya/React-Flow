import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import styles from "./Add.module.css"
import { useReactFlow } from "reactflow"

export default function Add({ id, className, buttons, data }) {
    const [addError, setAddError] = useState("")
    const { setCenter, addEdges, getNodes, addNodes, getEdges, fitView } = useReactFlow()
    const dispatch = useDispatch()
    const [menu, setMenu] = useState(false)
    const toggleMenu = () => {
        setMenu(!menu)
    }
    const onClick = (type) => {
        let nodes = getNodes()
        let edges = getEdges()
        if (data.type === "datasource" || data.type === "fetcher" || data.type === "listener") {
            if ((!data.arn || data.arn === "choose") || !data.integration) {
                setAddError("Fill the datasource fields first")
                return
            }
        }
        {
            setAddError("")
            setMenu(false)
            let thisNode = nodes.find(node => node.id === id)
            let x = thisNode.position.x + thisNode.width + 40
            let y = thisNode.position.y + thisNode.height / 8
            let edgesFilter = edges.filter(edge => edge.source === `${id}`)
            if (edgesFilter) {
                let divide = edgesFilter.length / 2
                let round = Math.round(divide)
                let calc = divide % 1
                if (calc === 0) {
                    y = y + round * 40
                }
                else {
                    y = y - round * 40
                }
            }
            let positionCheckY = (y) => nodes.find(node => node.position.y === y)
            let i = true
            while (i) {
                if (positionCheckY(y)) {
                    y = y - 40
                }
                else {
                    i = false
                }
            }
            let temp = {
                id: `${nodes.length + 1}`,//it needs to be a string
                type: type,
                data: { label: type },
                position: { x: x, y: y },
                targetPosition: "left",
                sourcePosition: "right"
            }
            let tempEdge = {
                id: `edge-${id}-${nodes.length + 1}`,
                source: `${id}`,
                target: `${nodes.length + 1}`
            }
            addNodes(temp)
            addEdges(tempEdge)
            // setCenter(x, y, { duration: 250 })
            dispatch({ type: 'botData/setSelectedNode', payload: temp })
        }
        return
    }
    const side = useMemo(() => menu ? styles.side : "", [menu])
    return (
        <>
            <div className={className} id={id}>
                <div className={styles.relative}>
                    <button
                        className={`${styles.add_button} ${side}`}
                        onClick={toggleMenu}
                        id={id}
                    ><img src="/images/add.svg" className={styles.add_icon} id={id} /></button>
                    {menu &&
                        <div className={styles.add_dropdown}>
                            {buttons.map((button, index) => <button onClick={() => onClick(button)} key={index}>{button}</button>)}</div>
                    }
                </div>
            </div>
            {addError && <p className={styles.addError}>{addError}</p>}
        </>
    )
}