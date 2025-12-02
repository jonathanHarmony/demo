import Layout from "./Layout.jsx";

import Home from "./Home";

import QuickBrief from "./QuickBrief";

import FullCase from "./FullCase";

import Playground from "./Playground";

import SignalsHub from "./SignalsHub";

import ReportPage from "./Report";

import Report2Page from "./Report2";

import QuickBriefWorkspacePage from "./QuickBriefWorkspace";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {

    Home: Home,

    QuickBrief: QuickBrief,

    FullCase: FullCase,

    Playground: Playground,

    SignalsHub: SignalsHub,

    Report: ReportPage,

    Report2: Report2Page,

    QuickBriefWorkspace: QuickBriefWorkspacePage,

}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);

    return (
        <Layout currentPageName={currentPage}>
            <Routes>

                <Route path="/" element={<Home />} />


                <Route path="/Home" element={<Home />} />

                <Route path="/QuickBrief" element={<QuickBrief />} />

                <Route path="/FullCase" element={<FullCase />} />

                <Route path="/Playground" element={<Playground />} />

                <Route path="/SignalsHub" element={<SignalsHub />} />

                <Route path="/report" element={<ReportPage />} />

                <Route path="/report2" element={<Report2Page />} />

                <Route path="/report3" element={<Report2Page />} />

                <Route path="/QuickBriefWorkspace" element={<QuickBriefWorkspacePage />} />

            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}