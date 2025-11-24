import {Outlet} from 'react-router';

export const DefaultLayout = () => {
    return (
        <div className="max-w-screen overflow-x-hidden">
            <Outlet/>
        </div>
    );
};
