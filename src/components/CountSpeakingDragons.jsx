import React, { useEffect, useState } from 'react';
import { Card, Spin, message } from 'antd';
import { getCountSpeakingDragons } from '../api/dragons';
import {useConfig} from "../contexts/ConfigContext";

const CountSpeakingDragons = () => {
    const { baseURL } = useConfig();
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const data = await getCountSpeakingDragons(baseURL);
                console.log(data)
                setCount(data);
            } catch (err) {
                message.error('Ошибка загрузки данных: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, []);

    return (
        <Card title="Количество говорящих драконов" style={{ width: 300, margin: 'auto', textAlign: 'center' }}>
            {loading ? <Spin /> : <h2>{count}</h2>}
        </Card>
    );
};

export default CountSpeakingDragons;
