import { useState } from "react";
import { useSelector } from "react-redux";
import ActionsMenu from '../ActionsMenu'
import PropsMenu from '../PropsMenu'
import { Background, MiniMap } from "reactflow";

export default function Controllers({ nodes, setNodes }) {
    const [miniMap, setMiniMap] = useState(false)
    const darkMode = useSelector(state => state.global.darkMode)
    return (
        <>
            <ActionsMenu nodes={nodes} setNodes={setNodes} />
            {miniMap && <MiniMap />}
            {/* <Controls style={{
                        insetInlineStart: "calc(12.5% + 1rem)"
                    }}>
                        <style jsx> {`
            button:hover{
              background:red;
              }
            `}
                        </style>
                        <button
                            style={{
                                // background: "inherit",
                                border: "inherit"
                            }}
                            onClick={toggleMiniMap}>M</button></Controls> */}
            <PropsMenu nodes={nodes} setNodes={setNodes} />
            <Background style={darkMode ? { background: "var(--light10)" } : { background: "white" }} />
        </>
    )
}