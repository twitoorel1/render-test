import { lazy, Suspense } from "react"

const Loadable = (Component) => (props) =>
(
    <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
    </Suspense>
)


export const HomePage = Loadable(lazy(() => import("src/pages/HomePage")))
export const LoginPage = Loadable(lazy(() => import("src/pages/Auth/LoginPage")))

export const Page404 = Loadable(lazy(() => import('src/pages/Error/Page404')));
export const Page403 = Loadable(lazy(() => import('src/pages/Error/Page403')));
