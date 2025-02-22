import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const getHeaders = () => ({
    Authorization: 'Bearer your_auth_token',
    Accept: 'application/xml',
});

const parseXML = async (xmlString) => {
    try {
        return await parseStringPromise(xmlString, { explicitArray: false });
    } catch (error) {
        throw new Error('Ошибка парсинга XML: ' + error.message);
    }
};
export const fetchDragons = async (baseURL, page = 1, size = 10, sort = 'name', filter = '') => {
    try {

        const response = await axios.get(`${baseURL}/dragons`, {
            headers: getHeaders(),
            params: { page, size, sort, filter },
        });
        const parsedData = await parseXML(response.data);

        // Handle both cases: single dragon or multiple dragons
        const dragons = parsedData.dragons?.dragon;
        const dragonArray = Array.isArray(dragons) ? dragons : [dragons];

        // Transform the parsed data into an array of dragon objects
        const transformedData = dragonArray.map((dragon) => ({
            id: parseInt(dragon.id, 10),
            name: dragon.name || 'Unknown',
            age: parseInt(dragon.age, 10),
            type: dragon.type || 'Unknown',
            speaking: dragon.speaking === 'true',
            wingspan: parseFloat(dragon.wingspan),
            coordinates: {
                x: parseFloat(dragon.coordinates?.x),
                y: parseFloat(dragon.coordinates?.y),
            },
            killer: {
                name: dragon.killer?.name || 'Unknown',
                nationality: dragon.killer?.nationality || 'Unknown',
                birthday: dragon.killer?.birthday || 'Unknown',
                hairColor: dragon.killer?.hairColor || 'Unknown',
                location: { // Добавлено
                    x: parseFloat(dragon.killer?.location?.x) || 0,
                    y: parseFloat(dragon.killer?.location?.y) || 0,
                    z: parseFloat(dragon.killer?.location?.z) || 0,
                }
            },
        }));

        return transformedData;
    } catch (error) {
        throw new Error('Не удалось загрузить драконов: ' + (error.message || 'Неизвестная ошибка'));
    }
};
export const getDragonById = async (id, baseURL) => {
    try {
        const response = await axios.get(`${baseURL}/dragons/${id}`, {
            headers: getHeaders(),
        });
        let dragon = await parseXML(response.data);
        console.log("dragon", dragon)
        console.log("dragon.id", dragon.dragon.id)
        console.log("dragon.name", dragon.dragon.name)
        dragon=dragon.dragon
        const transformedData = {
            id: parseInt(dragon.id, 10),
            name: dragon.name || 'Unknown',
            age: parseInt(dragon.age, 10),
            type: dragon.type || 'Unknown',
            speaking: dragon.speaking === 'true',
            wingspan: parseFloat(dragon.wingspan),
            coordinates: {
                x: parseFloat(dragon.coordinates?.x),
                y: parseFloat(dragon.coordinates?.y),
            },
            killer: {
                name: dragon.killer?.name || 'Unknown',
                nationality: dragon.killer?.nationality || 'Unknown',
                birthday: dragon.killer?.birthday || 'Unknown',
                hairColor: dragon.killer?.hairColor || 'Unknown',
                location: { // Добавлено
                    x: parseFloat(dragon.killer?.location?.x) || 0,
                    y: parseFloat(dragon.killer?.location?.y) || 0,
                    z: parseFloat(dragon.killer?.location?.z) || 0,
                }
            },
        };

        return transformedData;
    } catch (error) {
         throw new Error(error, 'Не удалось получить данные дракона');
    }
};

export const updateDragonById = async (id, dragonData, baseURL) => {
    try {
        const response = await axios.put(`${baseURL}/dragons/${id}`, dragonData, {
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/xml',
            },
        });
        console.log(response.data, parseXML(response.data));
        return response.data;
    } catch (error) {
         throw new Error(error, 'Не удалось обновить данные дракона');
    }
};

export const deleteDragonById = async (id, baseURL) => {
    try {
        await axios.delete(`${baseURL}/dragons/${id}`, {
            headers: getHeaders(),
        });
    } catch (error) {
         throw new Error(error, 'Не удалось удалить дракона');
    }
};

export const getDragonsGroupedByName = async (baseURL) => {
    try {
        const response = await axios.get(`${baseURL}/dragons/group-by-name`, {
            headers: getHeaders(),
        });
        console.log(response.data, parseXML(response.data));
        const parsedData = await parseXML(response.data);
        return parsedData.groups?.group.map((group) => ({
            count: parseInt(group.count, 10),
            name: group.name || 'Unknown',
        }));
    } catch (error) {
         throw new Error(error, 'Не удалось загрузить данные группировки');
    }
};

export const getCountSpeakingDragons = async (baseURL) => {
    try {
        const response = await axios.get(`${baseURL}/dragons/count-speaking`, {
            headers: getHeaders(),
        });
        const parsedData = await parseXML(response.data);

        const count = parsedData.dragonCount.count;
        console.log('Parsed Data:', parsedData);
        console.log('Count:', count);

        return count;
    } catch (error) {
         throw new Error(error, 'Не удалось получить количество говорящих драконов');
    }
};

export const searchDragonsByName = async (prefix, baseURL) => {
    try {
        const response = await axios.get(`${baseURL}/dragons/search-by-name`, {
            headers: getHeaders(),
            params: { prefix },
        });
        const parsedData = await parseXML(response.data);

        // Handle both cases: single dragon or multiple dragons
        const dragons = parsedData.dragons?.dragon;
        const dragonArray = Array.isArray(dragons) ? dragons : [dragons];

        // Transform the parsed data into an array of dragon objects
        const transformedData = dragonArray.map((dragon) => ({
            id: parseInt(dragon.id, 10),
            name: dragon.name || 'Unknown',
            age: parseInt(dragon.age, 10),
            type: dragon.type || 'Unknown',
            speaking: dragon.speaking === 'true',
            wingspan: parseFloat(dragon.wingspan),
            coordinates: {
                x: parseFloat(dragon.coordinates?.x),
                y: parseFloat(dragon.coordinates?.y),
            },
            killer: {
                name: dragon.killer?.name || 'Unknown',
                nationality: dragon.killer?.nationality || 'Unknown',
                birthday: dragon.killer?.birthday || 'Unknown',
                hairColor: dragon.killer?.hairColor || 'Unknown',
                location: { // Добавлено
                    x: parseFloat(dragon.killer?.location?.x) || 0,
                    y: parseFloat(dragon.killer?.location?.y) || 0,
                    z: parseFloat(dragon.killer?.location?.z) || 0,
                }
            },
        }));

        return transformedData;
    } catch (error) {
         throw new Error(error, 'Не удалось выполнить поиск драконов');
    }
};
