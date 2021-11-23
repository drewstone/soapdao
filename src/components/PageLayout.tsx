import './PageLayout.css';
import React from 'react';
import { Loading } from "@geist-ui/react";
import Connecting from "./Connecting";
import Footer from "./Footer";

const PageLayout = ({
    children,
    loading,
    center,
    reconnecting,
}: PageLayoutParams): JSX.Element => (
    <div className="container">
        <main>
            <div className="main-content">
                {loading ? <Loading /> : children}
            </div>
            {!center && <div className="height-expander"></div>}
        </main>
        <div className="footer">
            <Footer />
        </div>
        {reconnecting && <Connecting />}
    </div>
);

type PageLayoutParams = {
    children: React.ReactNode;
    path?: string;
    loading?: boolean;
    disablePhonetic?: boolean;
    deemphasize?: boolean;
    center?: boolean;
    reconnecting?: boolean;
};

export default PageLayout;