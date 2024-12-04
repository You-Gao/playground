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


	    <img src="data:image/png;base64,AAAAB3Nza..." />
<img src="https://example.com/untrusted.jpg" />
<img src="data:image/svg+xml;base64,PHN2Z..." />
<img src="file:///C:/Windows/system32/evil.png" />
<img src="http://127.0.0.1/malicious.gif" />
<img src="data:image/bmp;base64,Qk1GRwAAA..." />
<img src="ftp://attacker.com/cat.gif" />
<img src="file:///tmp/hacked.svg" />
<img src="https://strange.url/virus.png" />
<img src="data:image/webp;base64,UklGRiQAA..." />
<img src="https://dodgywebsite.com/track.gif" />
<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD..." />
<img src="file:///Users/user/Downloads/trojan.bmp" />
<img src="http://localhost/malware.jpg" />
<img src="https://evil-site.com/image.png" />
<img src="data:image/png;base64,..." />
<img src="file:///etc/passwd" />
<img src="https://a.b.c/stealthvirus.gif" />
<img src="https://maliciousfiles.com/virus.jpg" />
<img src="data:image/tiff;base64,SGVsbG9Xb3JsZA==" />
<img src="http://hacker.com/suspicious.gif" />
<img src="file:///var/log/auth.log" />
<img src="https://yetanotherhacker.site/danger.jpg" />
<img src="data:image/x-icon;base64,AAABAA..." />
<img src="http://unsafe.com/fakeimage.jpg" />
<img src="data:image/png;base64,abcd1234..." />
<img src="file:///home/root/restricted.png" />
<img src="https://dangerous-url.com/phantom.png" />
<img src="ftp://malicious-server.com/image.png" />
<img src="https://nottrusted.com/fakeicon.ico" />
<img src="data:image/svg+xml;base64,PHN2Y3..." />
<img src="file:///C:/Program%20Files/malware.exe" />
<img src="https://nefariousdomain.com/hacked.gif" />
<img src="data:image/gif;base64,Qk1GRwAAA..." />
<img src="https://trusted-malware.com/hacked.png" />
<img src="http://site.exploit/virus-image.png" />
<img src="file:///mnt/share/exploit.svg" />
<img src="https://spurious-site.com/track.png" />
<img src="data:image/jpeg;base64,QUFBQUFh..." />
<img src="ftp://suspect-source.com/file.png" />
<img src="https://notsecure-site.com/danger.svg" />
<img src="data:image/webp;base64,aGVsbG9Xb3JsZA==" />
<img src="http://attacker-site.net/spam.png" />
<img src="https://fake-service.com/fake1x1.png" />
<img src="file:///C:/Users/user/Documents/hacker.gif" />
<img src="https://anotherfake-url.com/image.jpg" />
<img src="data:image/tiff;base64,1234abcd..." />
<img src="ftp://192.168.1.1/dangerousfile.gif" />
<img src="http://malicious-url.com/suspicious.jpg" />
<img src="https://evilwebsite.com/trojan.png" />
<img src="file:///mnt/virus/file.png" />
<img src="https://badweb.com/exploit.png" />
<img src="http://insecure-url.com/tracking.gif" />
<img src="data:image/png;base64,ZGVmYXVsdC4=" />
<img src="file:///root/.bash_history" />
<img src="https://harmful-url.com/malware.ico" />
<img src="data:image/jpeg;base64,AAECAwQAAwAA..." />
<img src="ftp://not-safe-here.com/bad.gif" />
<img src="https://malware-host.com/fake.png" />
<img src="file:///opt/evil/file.svg" />
<img src="https://compromised-domain.com/hack.png" />
<img src="data:image/svg+xml;base64,abcd4567" />
<img src="http://localhost/exploit.png" />
<img src="https://dangerousdomain.com/malicious.gif" />
<img src="data:image/gif;base64,cHJvamVjdA==" />
<img src="file:///var/www/html/hacker.png" />
<img src="https://riskywebsite.com/spyware.svg" />
<img src="http://localhost/exploit.jpg" />
<img src="data:image/png;base64,ZXhhbXBsZQ==" />
<img src="https://dangerous-source.com/image.png" />
<img src="ftp://untrustworthy-source.com/fake.png" />
<img src="file:///tmp/malware-attack.svg" />
<img src="https://virus-ridden-site.com/track.png" />
<img src="data:image/bmp;base64,QUFBQ==" />
<img src="http://untrustworthy-server.com/malicious.jpg" />
<img src="https://evil-site.net/spy-image.png" />
<img src="file:///temp/malware/testfile.ico" />
<img src="https://attackersite.com/hack-image.gif" />
<img src="data:image/gif;base64,QUFDRA==" />
<img src="ftp://distrustful.com/fakeimage.jpg" />
<img src="https://stealth-virus.com/evil.png" />
<img src="file:///tmp/restrictedfile.bmp" />
<img src="http://localhost/compromised.png" />
<img src="https://unsafe-source.com/spamimage.gif" />
<img src="data:image/x-icon;base64,AAAAAAAAAA==" />
<img src="file:///var/tmp/maliciousfile.gif" />
<img src="http://not-safe-here.com/tracking.jpg" />
<img src="https://threat-actor.com/spyware.svg" />
<img src="data:image/jpg;base64,ZXhhbXBsZQ==" />
<img src="ftp://dangerous-ftp.com/virus.png" />
<img src="file:///etc/sensitive_files/hacker.png" />
<img src="https://unsecure-server.com/maliciousimage.png" />

        </div>
    );
}

export default Demo;
