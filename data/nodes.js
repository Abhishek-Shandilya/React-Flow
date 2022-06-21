export const datasource = {
    type: "datasource",
    x: 0,
    y: 50
}
const initialNodes = [
    {
        id: "1",
        type: "datasource",
        data: { label: "Datasource", type: datasource.type, arn: "choose", integration: "" },
        position: { x: datasource.x, y: datasource.y },
        sourcePosition: "right"
    }
]
export default initialNodes