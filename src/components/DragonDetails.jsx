import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDragonById } from '../api/dragons';
import { Card, Spin, Alert } from 'antd';
import {useConfig} from "../contexts/ConfigContext";

const DragonDetails = () => {
    const { baseURL } = useConfig();
    const { id } = useParams(); // Получаем ID из URL
    const [dragon, setDragon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDragon = async () => {
            try {
                const data = await getDragonById(id, baseURL);
                console.log(data)
                setDragon(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDragon();
    }, [id]);

    if (loading) return <Spin tip="Загрузка деталей дракона..." />;
    if (error) return <Alert message="Ошибка" description={error} type="error" showIcon />;

    return (
        <Card title={`Дракон: ${dragon.name}`} style={{ margin: '20px' }}>
            <p><strong>Координаты:</strong> X: {dragon.coordinates?.x}, Y: {dragon.coordinates?.y}</p>
            <p><strong>Возраст:</strong> {dragon.age}</p>
            <p><strong>Размах крыльев:</strong> {dragon.wingspan}</p>
            <p><strong>Говорящий:</strong> {dragon.speaking ? 'Да' : 'Нет'}</p>
            <p><strong>Тип:</strong> {dragon.type}</p>
            <h4>Убийца:</h4>
            <p><strong>Имя:</strong> {dragon.killer?.name}</p>
            <p><strong>Дата рождения:</strong> {dragon.killer?.birthday}</p>
            <p><strong>Цвет волос:</strong> {dragon.killer?.hairColor}</p>
            <p><strong>Национальность:</strong> {dragon.killer?.nationality}</p>
            <p><strong>Координаты:</strong> X: {dragon.killer?.location?.x}, Y: {dragon.killer?.location?.y}, Z: {dragon.killer?.location?.z}</p>
        </Card>
    );
};

export default DragonDetails;
