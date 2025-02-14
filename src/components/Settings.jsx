import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useConfig } from '../contexts/ConfigContext';

const Settings = () => {
    const { baseURL, updateBaseURL } = useConfig();
    const [newURL, setNewURL] = useState(baseURL);

    const handleSave = () => {
        try {
            new URL(newURL); // Проверяем, что введенный URL валиден
            updateBaseURL(newURL);
            message.success('Базовый URL обновлен');
        } catch {
            message.error('Некорректный URL');
        }
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <Input
                value={newURL}
                onChange={(e) => setNewURL(e.target.value)}
                placeholder="Введите базовый URL"
                style={{ width: '80%', marginRight: 10 }}
            />
            <Button type="primary" onClick={handleSave}>
                Сохранить
            </Button>
        </div>
    );
};

export default Settings;
