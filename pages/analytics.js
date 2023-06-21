import React, {useContext} from "react";
import Head from 'next/head'
import Image from 'next/image'
import AnalyticsDashboard from "../components/screens/analytics/AnalyticsDashboard";
import Context from "../context/Context";

export default function AnalyticsPage() {
    const {data} = useContext(Context)

    return (
        <AnalyticsDashboard tasks={data}/>
    )
}
