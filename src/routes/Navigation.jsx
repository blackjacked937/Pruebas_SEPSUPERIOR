import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import routes from './routes'
import ChatBot from '../components/Chat/ChatBot'

export function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    const { layout: Layout, component: Component, Guard, access } = route;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    {Guard ? (
                                        <Guard {...access}>
                                            <Component />
                                        </Guard>
                                    ) : (
                                        <Component />
                                    )}
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
            <ChatBot />
        </BrowserRouter>
    )
}
