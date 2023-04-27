import React, { useEffect } from "react"
import { useRoutes, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { isLoginByToken } from "src/redux/slices/authSlice"

import GuestGuard from "src/auth/GuestGuard"
import AuthGuard from "src/auth/AuthGuard"
import RouteByRole from "src/auth/RouteByRole"

import MainLayout from "src/layout/Main"
import AuthLayout from "src/layout/Auth"
import CompactLayout from "src/layout/CompactLayout"

import { HomePage, LoginPage, Page403, Page404 } from "./elements"
// import {} from "src/config-global"


export default function Router() {
    const dispatch = useDispatch()
    const { isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(isLoginByToken());
        }
    }, [dispatch]);

    return useRoutes([
        // App
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { element: <HomePage />, index: true }
            ]
        },

        // Auth
        {
            path: "auth",
            element: <GuestGuard><AuthLayout /></GuestGuard>,
            children: [
                { element: <Navigate to="/auth/login" replace />, index: true },
                { path: "login", element: <LoginPage /> },
                { path: "register", element: <LoginPage /> },
            ]
        },

        // Admin Routes
        {
            path: "admin",
            element: <AuthGuard><RouteByRole hasContent><CompactLayout /></RouteByRole></AuthGuard>,
            children: [
                { element: <h5>Admin Routes</h5>, index: true }
            ]
        },

        {
            element: <CompactLayout />,
            children: [
                { path: "404", element: <Page404 /> },
                { path: "403", element: <Page403 /> },
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ])

}
