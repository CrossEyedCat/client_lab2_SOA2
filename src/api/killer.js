import axios from 'axios';

export const killDragon = async (dragonId, baseURL) => {

    try {
        const response = await axios.post(
            `${baseURL}/killer-1.0-SNAPSHOT/api/killer/dragon/${dragonId}/kill`,
            null, // POST без тела запроса
            {
                headers: {
                    Authorization: 'Bearer valid-token',
                    'Content-Type': 'application/xml',
                },
            }
        );

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'application/xml');
        const message = xmlDoc.getElementsByTagName('message')[0]?.textContent || 'Unknown response';
        return message;
    } catch (error) {
        throw new Error('Не удалось выполнить операцию: ' + error.message);
    }
};
