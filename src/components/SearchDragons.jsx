import React, { useState } from 'react';
import {Input, Table, Button, message, Popconfirm} from 'antd';
import { searchDragonsByName } from '../api/dragons';
import {useConfig} from "../contexts/ConfigContext";
import {Link} from "react-router-dom";

const SearchDragons = () => {
    const { baseURL } = useConfig();
    const [prefix, setPrefix] = useState('');
    const [dragons, setDragons] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const results = await searchDragonsByName(prefix, baseURL);
            console.log("results",results)
            setDragons(results);
        } catch (err) {
            message.error('Ошибка поиска: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Координаты X',
            dataIndex: ['coordinates', 'x'],
            key: 'coordinatesX',
            sorter: true,
        },
        {
            title: 'Координаты Y',
            dataIndex: ['coordinates', 'y'],
            key: 'coordinatesY',
            sorter: true,
        },
        {
            title: 'Возраст',
            dataIndex: 'age',
            key: 'age',
            sorter: true,
        },
        {
            title: 'Размах крыльев',
            dataIndex: 'wingspan',
            key: 'wingspan',
            sorter: true,
        },
        {
            title: 'Говорящий',
            dataIndex: 'speaking',
            key: 'speaking',
            render: (text) => (text ? 'Да' : 'Нет'),
        },
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
            sorter: true,
        },
        {
            title: 'Имя убийцы',
            dataIndex: ['killer', 'name'],
            key: 'killerName',
            sorter: true,
        },
        {
            title: 'Дата рождения убийцы',
            dataIndex: ['killer', 'birthday'],
            key: 'killerBirthday',
            sorter: true,
        },
        {
            title: 'Цвет волос убийцы',
            dataIndex: ['killer', 'hairColor'],
            key: 'killerHairColor',
            sorter: true,
        },
        {
            title: 'Национальность убийцы',
            dataIndex: ['killer', 'nationality'],
            key: 'killerNationality',
            sorter: true,
        },
        {
            title: 'Координаты убийцы (X)',
            dataIndex: ['killer', 'location', 'x'],
            key: 'killerLocationX',
            sorter: true,
        },
        {
            title: 'Координаты убийцы (Y)',
            dataIndex: ['killer', 'location', 'y'],
            key: 'killerLocationY',
            sorter: true,
        },
        {
            title: 'Координаты убийцы (Z)',
            dataIndex: ['killer', 'location', 'z'],
            key: 'killerLocationZ',
            sorter: true,
        },
    ];

    return (
        <div>
            <Input
                placeholder="Введите префикс имени"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                style={{ width: 300, marginBottom: 16 }}
            />
            <Button type="primary" onClick={handleSearch} loading={loading}>
                Найти
            </Button>
            <Table dataSource={dragons || []} columns={columns} rowKey="id" loading={loading} style={{ marginTop: 16 }} />
        </div>
    );
};

export default SearchDragons;
