import { Select, Form } from "antd"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import fetchers from "../data/fetchers"
import listeners from "../data/listeners"
import styles from "./PropsMenu.module.css"

const { Item } = Form
const { Option } = Select;

export default function PropsMenu({ nodes, setNodes }) {
    const { selectedNode, propsVisible } = useSelector(state => state.botData.dataProps)
    const [form] = Form.useForm()
    const darkMode = useSelector(state => state.global.darkMode)
    const dispatch = useDispatch()
    const onInputChange = (value) => {
        setNodes((nds) =>
            nds.map((node) => {
                let temp = { ...node }
                if (node.id === selectedNode.id) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    temp.data = {
                        ...temp.data,
                        type: value,
                        arn: "choose",
                        integration: ""
                    };
                }
                return temp;
            })
        );
        form.resetFields(['arn'])
    }
    const onDataSourceChange = (value) => {
        let datasource = null
        setNodes((nds) =>
            nds.map((node) => {
                let temp = { ...node }
                if (temp.data.type === 'fetcher') {
                    datasource = fetchers.find(fetcher => fetcher.arn === value)
                }
                else {
                    datasource = listeners.find(listener => listener.arn === value)
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
    }
    const options = [
        { value: "fetcher" },
        { value: "listener" }
    ]
    const dataSourceOptions = useMemo(() => form.getFieldValue('type') === 'fetcher' ? fetchers : listeners, [fetchers, listeners, form.getFieldValue('type')])
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
                    <>
                        <p className={styles.id}>{selectedNode?.id}</p>
                        <div
                            className={styles.content}
                            data-darkmode={darkMode}>
                            <Form
                                name="props"
                                form={form}
                                className={styles.content}
                                initialValues={selectedNode?.data}>
                                {selectedNode?.data.type &&
                                    <Item name={"type"}>
                                        <Select
                                            placeholder={"Choose Datasource Type"}
                                            onChange={(value) => onInputChange(value)}
                                            className={styles.select}>
                                            {options.map((option, index) => <Option
                                                value={option.value}
                                                key={index}
                                                className={styles.option}
                                            >{option.value}</Option>)}
                                        </Select>
                                    </Item>
                                }
                                {(selectedNode?.data.arn || selectedNode?.data.arn === "") &&
                                    <Item
                                        noStyle
                                        dependencies={['type']}
                                    >
                                        {({ getFieldValue }) =>
                                            <>{getFieldValue('type') &&
                                                <Item name={"arn"}>
                                                    <Select
                                                        placeholder={"Choose Datasource"}
                                                        onChange={(value) => onDataSourceChange(value)}
                                                        className={styles.select}>
                                                        {dataSourceOptions.map((option, index) => <Option
                                                            value={option.arn}
                                                            key={index}
                                                        >{option.arn}</Option>)}
                                                    </Select>
                                                </Item>}</>
                                        }
                                    </Item>
                                }
                            </Form>
                        </div>
                    </>
                }
            </div>
        }
        </>
    )
}