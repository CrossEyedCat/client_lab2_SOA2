import React, { createContext, useContext, useState } from 'react';
import config from '../config';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [baseURL, setBaseURL] = useState(config.baseURL);

    const updateBaseURL = (url) => {
        setBaseURL(url);
    };

    return (
        <ConfigContext.Provider value={{ baseURL, updateBaseURL }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);