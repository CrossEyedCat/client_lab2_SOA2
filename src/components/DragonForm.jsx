import React, { useState } from 'react';
import {Form, Input, InputNumber, Checkbox, Button, message, Select} from 'antd';
import axios from 'axios';
import {useConfig} from "../contexts/ConfigContext";
import { parseStringPromise } from 'xml2js';
const DragonForm = ({ initialValues, onSubmit }) => {
    const { baseURL } = useConfig();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        const dragonData = `
      <dragon>
        <name>${values.name}</name>
        <coordinates>
          <x>${values.x}</x>
          <y>${values.y}</y>
        </coordinates>
        <age>${values.age}</age>
        <wingspan>${values.wingspan}</wingspan>
        <speaking>${values.speaking}</speaking>
        <type>${values.type}</type>
        <killer>
          <name>${values.killerName}</name>
          <birthday>${values.birthday}</birthday>
          <hairColor>${values.hairColor}</hairColor>
          <nationality>${values.nationality}</nationality>
          <location>
            <x>${values.locationX}</x>
            <y>${values.locationY}</y>
            <z>${values.locationZ}</z>
          </location>
        </killer>
      </dragon>
    `;
        try {
            await axios.post(baseURL+'/dragonservice-1.0-SNAPSHOT/api/dragons', dragonData, {
                headers: { Authorization: 'Bearer your_auth_token', 'Content-Type': 'application/xml' },
            });
            message.success('Дракон успешно сохранен');
            form.resetFields();
            if (onSubmit) onSubmit();
        } catch (error) {
            message.error('Ошибка при сохранении дракона: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form || []} layout="vertical" onFinish={handleSubmit} initialValues={initialValues}>
            <Form.Item label="Имя" name="name" rules={[
                { required: true, message: 'Введите имя' },
                {
                    validator: (_, value) => {
                        if (/^[A-Za-zА-Яа-я\s]+$/.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Имя должно содержать только буквы'));
                    },
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Координата X" name="x" rules={[{ required: true, message: 'Введите X' },
                {
                    validator: (_, value) => {
                        if (/^\d+(\.\d{1,2})?$/.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Координата должна быть числом с максимум 2 знаками после запятой'));
                    },
                },]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Координата Y" name="y" rules={[{ required: true, message: 'Введите Y' },
                {
                    validator: (_, value) => {
                        if (/^\d+(\.\d{1,2})?$/.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Координата должна быть числом с максимум 2 знаками после запятой'));
                    },
                },]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Возраст" name="age" rules={[
                { required: true, message: 'Введите возраст' },
                {
                    validator: (_, value) => {
                        if (Number.isInteger(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Возраст должен быть целым числом'));
                    },
                },
            ]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Размах крыльев" name="wingspan" rules={[
                { required: true, message: 'Введите размах' },
                {
                    validator: (_, value) => {
                        if (/^\d+(\.\d{1,2})?$/.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Размах должен быть числом с максимум 2 знаками после запятой'));
                    },
                },
            ]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Говорящий" name="speaking" valuePropName="checked">
                <Checkbox />
            </Form.Item>
            <Form.Item label="Тип" name="type" rules={[{ required: true, message: 'Введите тип' }]}>
                <Select>
                    <Select.Option value="UNDERGROUND">Подземный</Select.Option>
                    <Select.Option value="AIR">Воздушный</Select.Option>
                    <Select.Option value="FIRE">Огненный</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Имя убийцы" name="killerName" rules={[
                { required: true, message: 'Введите имя' },
                {
                    validator: (_, value) => {
                        if (/^[A-Za-zА-Яа-я\s]+$/.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Имя должно содержать только буквы'));
                    },
                },
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="Дата рождения убийцы" name="birthday" rules={[{ required: true, message: 'Введите дату' }]}>
                <Input type="date" />
            </Form.Item>
            <Form.Item label="Цвет волос убийцы" name="hairColor"  rules={[{ required: true, message: 'Выберите цвет волос' }]}>
                <Select>
                    <Select.Option value="BLACK">Черный</Select.Option>
                    <Select.Option value="BLUE">Синий</Select.Option>
                    <Select.Option value="YELLOW">Желтый</Select.Option>
                    <Select.Option value="ORANGE">Оранжевый</Select.Option>
                    <Select.Option value="WHITE">Белый</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Национальность" name="nationality" rules={[{ required: true, message: 'Выберите национальность' }]}>
                <Select>
                    <Select.Option value="RUSSIA">Россия</Select.Option>
                    <Select.Option value="CHINA">Китай</Select.Option>
                    <Select.Option value="SOUTH_KOREA">Южная Корея</Select.Option>
                    <Select.Option value="NORTH_KOREA">Северная Корея</Select.Option>
                    <Select.Option value="JAPAN">Япония</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Координата X убийцы" name="locationX" rules={[{ required: true, message: 'Введите X' },
                {
                    validator: (_, value) => {
                        if (/^\d+(\.\d{1,2})?$/.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Координата должна быть числом с максимум 2 знаками после запятой'));
                    },
                },]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Координата Y убийцы" name="locationY" rules={[{ required: true, message: 'Введите Y' },
                {
                    validator: (_, value) => {
                        if (/^\d+(\.\d{1,2})?$/.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Координата должна быть числом с максимум 2 знаками после запятой'));
                    },
                },]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Координата Z убийцы" name="locationZ" rules={[{ required: true, message: 'Введите Z' },
                {
                    validator: (_, value) => {
                        if (/^\d+(\.\d{1,2})?$/.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Координата должна быть числом с максимум 2 знаками после запятой'));
                    },
                },]}>
                <InputNumber />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Сохранить
            </Button>
        </Form>
    );
};

export default DragonForm;
