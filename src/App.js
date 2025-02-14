import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router';
import { Layout, Menu } from 'antd';
import DragonTable from './components/DragonTable';
import DragonForm from './components/DragonForm';
import DragonDetails from './components/DragonDetails';
import Settings from './components/Settings';
import { ConfigProvider } from './contexts/ConfigContext';
import EditDragonForm from "./components/EditDragonForm";
import DragonGroups from "./components/DragonGroups";
import CountSpeakingDragons from "./components/CountSpeakingDragons";
import SearchDragons from "./components/SearchDragons";
import KillDragon from "./components/KillDragon";

const { Header, Content, Footer, Sider } = Layout;

function App() {
    const menuItems = [
        {
            key: "group-by-name",
            label: <Link to="terminal/dragons/group-by-name">Группировка по имени</Link>,
        },
        {
            key: "count-speaking",
            label: <Link to="terminal/dragons/count-speaking">Говорящие драконы</Link>,
        },
        {
            key: "search",
            label: <Link to="terminal/dragons/search">Поиск драконов</Link>,
        },
        {
            key: "kill",
            label: <Link to="terminal/dragons/kill">Убить дракона</Link>,
        },
        {
            key: "add",
            label: <Link to="terminal/add-dragon">Добавить дракона</Link>,
        },
    ];

    return (
        <ConfigProvider>
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider width={250} theme="dark">
                        <Menu theme="dark" mode="inline" items={menuItems} />
                    </Sider>
                    <Layout>
                        <Header style={{ color: 'white', fontSize: '20px', textAlign: 'center' }}>
                            Управление драконами
                        </Header>
                        <Content style={{ padding: '20px' }}>
                            <Settings />
                            <Routes>
                                <Route path="terminal/" element={<DragonTable />} />
                                <Route path="terminal/dragons/:id" element={<DragonDetails />} />
                                <Route path="terminal/add-dragon" element={<DragonForm />} />
                                <Route path="terminal/dragons/edit/:id" element={<EditDragonForm />} />
                                <Route path="terminal/dragons/group-by-name" element={<DragonGroups />} />
                                <Route path="terminal/dragons/count-speaking" element={<CountSpeakingDragons />} />
                                <Route path="terminal/dragons/search" element={<SearchDragons />} />
                                <Route path="terminal/dragons/kill" element={<KillDragon />} />
                            </Routes>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Dragon Management App ©2024
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        </ConfigProvider>
    );
}

export default App;
