import React, { useState, useRef, useEffect } from 'react';
import { Table, message, Button, Popconfirm, Input, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useConfig } from '../contexts/ConfigContext';
import { deleteDragonById, fetchDragons } from '../api/dragons';
import Highlighter from 'react-highlight-words';

const { Option } = Select;

const DragonTable = () => {
    const { baseURL } = useConfig(); // Используем baseURL из контекста
    const [dragons, setDragons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filters, setFilters] = useState({}); // Состояние для фильтров
    const [sort, setSort] = useState(''); // Состояние для сортировки
    const [selectedColumn, setSelectedColumn] = useState(''); // Для выбора колонки
    const searchInput = useRef(null);

    // Загрузка данных с учетом фильтров и сортировки
    const loadDragons = async (page = 1, size = 10) => {
        setLoading(true);
        try {
            // Преобразуем фильтры в строку формата "параметр:значение"
            const filterString = Object.entries(filters)
                .map(([key, value]) => {
                    if (Array.isArray(key)) {
                        key = key.join('.'); // Преобразуем массив в строку
                    }
                    return `${key}:${value}`;
                })
                .join(',');

            const data = await fetchDragons(baseURL, page, size, sort, filterString);
            setDragons(data);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Удаление дракона
    const handleDelete = async (id) => {
        try {
            await deleteDragonById(id, baseURL);
            message.success('Дракон успешно удалён');
            loadDragons(); // Обновляем список драконов
        } catch (err) {
            message.error('Ошибка удаления: ' + err.message);
        }
    };

    // Обработка поиска
    const handleSearch = () => {
        if (!selectedColumn || !searchText) {
            message.warning('Выберите колонку и введите текст для поиска');
            return;
        }

        // Обновляем фильтры
        setFilters((prevFilters) => ({
            ...prevFilters,
            [selectedColumn]: searchText,
        }));

        // Перезагружаем данные с новым фильтром
        loadDragons();
    };

    // Обработка сброса поиска
    const handleReset = () => {
        setSearchText('');
        setSelectedColumn('');
        setFilters({});
        loadDragons(); // Перезагружаем таблицу без фильтрации
    };

    // Обработка изменений таблицы (сортировка и фильтрация)
    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter.field) {
            const sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
            const sortString = `${sorter.field.replace(/,/g, '.')}:${sortOrder}`;
            setSort(sortString);
        } else {
            setSort('');
        }
    };

    // Функция для создания колонки для поиска
    const getColumnSearchProps = (dataIndex) => ({
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        loadDragons();
    }, [sort, filters]);

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: true,
        },
        {
            title: 'Координаты X',
            dataIndex: ['coordinates', 'x'],
            key: 'coordinatesX',
            ...getColumnSearchProps(['coordinates', 'x']),
            sorter: true,
        },
        {
            title: 'Координаты Y',
            dataIndex: ['coordinates', 'y'],
            key: 'coordinatesY',
            ...getColumnSearchProps(['coordinates', 'y']),
            sorter: true,
        },
        {
            title: 'Возраст',
            dataIndex: 'age',
            key: 'age',
            ...getColumnSearchProps('age'),
            sorter: true,
        },
        {
            title: 'Размах крыльев',
            dataIndex: 'wingspan',
            key: 'wingspan',
            ...getColumnSearchProps('wingspan'),
            sorter: true,
        },
        {
            title: 'Говорящий',
            dataIndex: 'speaking',
            key: 'speaking',
            render: (text) => (text ? 'Да' : 'Нет'),
            ...getColumnSearchProps('speaking'),
        },
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
            sorter: true,
        },
        {
            title: 'Имя убийцы',
            dataIndex: ['killer', 'name'],
            key: 'killerName',
            ...getColumnSearchProps(['killer', 'name']),
            sorter: true,
        },
        {
            title: 'Дата рождения убийцы',
            dataIndex: ['killer', 'birthday'],
            key: 'killerBirthday',
            ...getColumnSearchProps(['killer', 'birthday']),
            sorter: true,
        },
        {
            title: 'Цвет волос убийцы',
            dataIndex: ['killer', 'hairColor'],
            key: 'killerHairColor',
            ...getColumnSearchProps(['killer', 'hairColor']),
            sorter: true,
        },
        {
            title: 'Национальность убийцы',
            dataIndex: ['killer', 'nationality'],
            key: 'killerNationality',
            ...getColumnSearchProps(['killer', 'nationality']),
            sorter: true,
        },
        {
            title: 'Координаты убийцы (X)',
            dataIndex: ['killer', 'location', 'x'],
            key: 'killerLocationX',
            ...getColumnSearchProps(['killer', 'location', 'x']),
            sorter: true,
        },
        {
            title: 'Координаты убийцы (Y)',
            dataIndex: ['killer', 'location', 'y'],
            key: 'killerLocationY',
            ...getColumnSearchProps(['killer', 'location', 'y']),
            sorter: true,
        },
        {
            title: 'Координаты убийцы (Z)',
            dataIndex: ['killer', 'location', 'z'],
            key: 'killerLocationZ',
            ...getColumnSearchProps(['killer', 'location', 'z']),
            sorter: true,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Link to={`/terminal/dragons/edit/${record.id}`} state={{ dragon: record }}>
                        <Button type="link">Редактировать</Button>
                    </Link>
                    <Popconfirm
                        title="Вы уверены, что хотите удалить этого дракона?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button type="link" danger>
                            Удалить
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div>
            {/* Добавим фильтр по колонкам и тексту */}
            <Space style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Выберите колонку"
                    style={{ width: 200 }}
                    value={selectedColumn}
                    onChange={setSelectedColumn}
                >
                    {columns
                        .filter((col) => col.dataIndex !== 'actions') // Убираем колонку "Действия"
                        .map((col) => (
                            <Option key={col.key} value={Array.isArray(col.dataIndex) ? col.dataIndex.join('.') : col.dataIndex}>
                                {col.title}
                            </Option>
                        ))}
                </Select>
                <Input
                    placeholder="Введите текст для поиска"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 200 }}
                />
                <Button onClick={handleSearch} icon={<SearchOutlined />} type="primary">
                    Поиск
                </Button>
                <Button onClick={handleReset}>Сбросить</Button>
            </Space>

            <Table
                dataSource={dragons}
                columns={columns}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                onChange={handleTableChange} // Обработка изменений (сортировка и фильтрация)
            />
        </div>
    );
};

export default DragonTable;
