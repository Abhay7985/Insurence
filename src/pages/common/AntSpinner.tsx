import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const Spinner = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 20,color: 'white' }} spin />
    return (
        <>
            <Spin indicator={antIcon} />
        </>
    )
}
export default Spinner;