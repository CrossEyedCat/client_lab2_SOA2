import React, { useState } from 'react';
import { Input, Button, message, Result } from 'antd';
import { killDragon } from '../api/killer';
import {useConfig} from "../contexts/ConfigContext";

const KillDragon = () => {
    const { baseURL } = useConfig();
    const [dragonId, setDragonId] = useState('');
    const [resultMessage, setResultMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleKill = async () => {
        setLoading(true);
        try {
            const responseMessage = await killDragon(dragonId, baseURL);
            console.log(responseMessage)
            setResultMessage(responseMessage);
            message.success('Операция выполнена успешно!');
        } catch (err) {
            message.error('Ошибка: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Input
                placeholder="Введите ID дракона"
                value={dragonId}
                onChange={(e) => setDragonId(e.target.value)}
                style={{ width: 300, marginBottom: 16 }}
            />
            <br />
            <Button type="primary" onClick={handleKill} loading={loading} disabled={!dragonId}>
                Убить дракона
            </Button>
            {resultMessage && (
                <Result
                    status="success"
                    title="Результат операции"
                    subTitle={resultMessage}
                    style={{ marginTop: 16 }}
                />
            )}
        </div>
    );
};

export default KillDragon;
