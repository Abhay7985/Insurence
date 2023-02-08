import React, { createContext, ReactNode, SetStateAction, useEffect, useReducer, useState } from 'react'
import { COOKIES_USER_ACCESS_TOKEN } from './actionTypes';
import { ConfigProvider, message, FloatButton, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import ar_EG from 'antd/locale/ar_EG';
import 'dayjs/locale/zh-cn';
import { UserInfoInterface } from '../interfaces';
import henceforthApi from '../utils/henceforthApi';
import auth from './reducers/auth';
import { useLocation } from 'react-router-dom';

const { defaultAlgorithm, darkAlgorithm } = theme;
type Function = () => void;
type LoginFunction = (id: string) => void;


interface CommonContextType {
    loading: boolean;
    isDarkMode: boolean;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    authState: UserInfoInterface;
    authDispatch: React.Dispatch<SetStateAction<any>>;
    setLocale: React.Dispatch<SetStateAction<any>>;
    setIsDarkMode: React.Dispatch<SetStateAction<boolean>>;
}

// toast.error((typeof error?.response?.body?.error_description === "string") ? error?.response?.body?.error_description : JSON.stringify(error?.response?.body?.error_description))
export const GlobalContext = createContext({} as CommonContextType);
export const downloadFile = (file_path: String) => {
    var a: any = document.createElement('a') as HTMLElement;
    a.href = file_path;
    a.target = "_blank";
    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

type GlobleContextProviderProps = {
    children: ReactNode;
    theme: {
        colorPrimary: string,
        direction: string,
    }
}

function GlobalProvider(props: GlobleContextProviderProps) {
    const location = useLocation()
    const [loading, setLoading] = React.useState(false)
    const [colorPrimary, setColorPrimary] = React.useState(props?.theme?.colorPrimary || '#32cd32')
    const [locale, setLocale] = React.useState(enUS)
    const [isDarkMode, setIsDarkMode] = React.useState(false)

    const [authState, authDispatch] = useReducer(auth, {}, () => {
        const localAuthState = localStorage.getItem("authState");
        return localAuthState ? JSON.parse(localAuthState) : {}
    })

    const scrollToTop = () => {
        if (window) {
            window.scrollTo(0, 0);
        }
    }


    const [messageApi, contextHolder] = message.useMessage();

    henceforthApi.setToken(authState?.access_token)
    const handleError = (error: any) => {
        messageApi.open({
            type: 'error',
            content: error?.response?.body?.message,
        });
    }
    const success = (success: any) => {
        messageApi.open({
            type: 'success',
            content: success,
        });
    };

    const themes = {
        dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
        light: `${process.env.PUBLIC_URL}/light-theme.css`,
    };
    useEffect(scrollToTop, [location.pathname])
    useEffect(() => {
        localStorage.setItem("authState", JSON.stringify(authState))
    }, [authState]);

    useEffect(() => {
        setIsDarkMode(true)
        setTimeout(() => {
            setIsDarkMode(false)
        }, 100)
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                loading, setLoading, authState, authDispatch, setLocale,
                isDarkMode, setIsDarkMode, ...props
            }}>
            <ConfigProvider
                direction={locale == ar_EG ? 'rtl' : 'ltr'}
                locale={locale}

                theme={{
                    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                    token: {
                        colorPrimary: colorPrimary,
                    },
                    components: {
                        Radio: {
                            colorPrimary: colorPrimary,
                        },
                        Tabs: {
                            colorPrimary: "#000000",
                            colorPrimaryHover: "#000000"

                        }
                    },
                }}>
                {/* {contextHolder} */}
                {props.children}
                <FloatButton.BackTop />
            </ConfigProvider>
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
