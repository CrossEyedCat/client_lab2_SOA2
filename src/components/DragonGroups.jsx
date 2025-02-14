import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { getDragonsGroupedByName } from '../api/dragons';
import {useConfig} from "../contexts/ConfigContext";

const DragonGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const { baseURL } = useConfig();
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await getDragonsGroupedByName(baseURL);
                console.log(data)
                setGroups(data);
            } catch (err) {
                message.error('Ошибка загрузки групп: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    const columns = [
        {
            title: 'Имя дракона',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count',
        },
    ];

    return <Table dataSource={groups } columns={columns} loading={loading} rowKey="name" />;
};

export default DragonGroups;
