import { useEffect, useState } from 'react';
import '../Plan.css';

function Demo() {
    const [userInfo, setUserInfo] = useState({
        ip: '',
        browser: '',
        os: '',
        plugins: [],
        region: '',
        city: '',
        isp: '',
        lat: '',
        lon: '',
        referrer: '',
        language: ''
    });

    useEffect(() => {
        const browser = navigator.userAgent;
        const os = navigator.platform;
        const plugins = Array.from(navigator.plugins).map(plugin => plugin.name);
        const language = navigator.language;
        const referrer = document.referrer;

        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;
                const region = data.region;
                const city = data.city;
                const isp = data.org;
                const lat = data.latitude;
                const lon = data.longitude;

                setUserInfo({
                    ip: ip,
                    browser: browser,
                    os: os,
                    plugins: plugins,
                    region: region,
                    city: city,
                    isp: isp,
                    lat: lat,
                    lon: lon,
                });
            })
            .catch(error => console.error('Error fetching region and city:', error));
        
    }, []);

    return (
        <div className="Demo">
            <h1 className="PlanTitle">Basic Footprinting Demo</h1>
            <ul className="DemoUL">
                <li className="DemoP"><strong>IP Address:</strong> {userInfo.ip}</li>
                <li className="DemoP"><strong>Browser:</strong> {userInfo.browser}</li>
                <li className="DemoP"><strong>Operating System:</strong> {userInfo.os}</li>
                <li className="DemoP"><strong>Plugins:</strong> {userInfo.plugins.join(', ')}</li>
                <li className="DemoP"><strong>Location:</strong> {userInfo.region}, {userInfo.city}</li>
                <li className="DemoP"><strong>Coordinates:</strong> {userInfo.lat}, {userInfo.lon}</li>
                <li className="DemoP"><strong>ISP:</strong> {userInfo.isp}</li>
            </ul>
        </div>
    );
}

export default Demo;