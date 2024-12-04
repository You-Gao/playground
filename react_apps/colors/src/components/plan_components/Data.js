import React from 'react';
import '../Plan.css';

const DataCapture = () => {
  return (
    <div style={{background: "white"}}>
      <h1 className="PlanTitle">Data Capture and Exfiltration</h1>

      <h2>Direct Tracking</h2>
      <p>Websites you visit directly have access to a wide range of data about you, including local storage, cookies, and your IP address.</p>

      <h2>Embedded Iframes</h2>
      <p>Third-party iframes embedded in the page can track users through their own local storage, cookies, and JavaScript capabilities.</p>

      <h2>Basic Tracking (1x1 Pixel Tracking)</h2>
      <p>External image requests, like 1x1 pixel trackers, can capture IP addresses, browser headers, and referrer data, but are more limited than script-based tracking.</p>

      <h2>Information Gathered by Websites</h2>
      <h3>Local Storage</h3>
      <p>Websites and iframes can store and retrieve data from your browser’s local storage, which can persist across sessions and be used for tracking purposes. This is more durable than cookies and harder to detect.</p>

      <h3>Traditional Browser and IP Headers</h3>
      <p><strong>Browser Information:</strong> Websites can collect data about your browser type, language, and other identifiable details through HTTP headers.</p>
      <p><strong>IP Address:</strong> The IP address is visible to any website or iframe you visit, and it can provide insights into your geographic location.</p>

      <h3>Advanced Browser Information</h3>
      <p>Modern websites (and iframes) can gather detailed JavaScript-based information, such as:</p>
      <ul>
        <li>Installed plugins, screen resolution, fonts, etc.</li>
      </ul>
      <p>This information can be used to generate a unique browser fingerprint, which is difficult to block.</p>

      <h2>How Websites and Iframes Collect Information to Generate a Fingerprint</h2>
      <h3>Footprinting</h3>
      <p>By collecting all of the above information, websites can create a footprint of your device or browsing behavior. This includes:</p>
      <ul>
        <li>Local storage data</li>
        <li>Cookies</li>
        <li>IP address</li>
        <li>JavaScript-based information (like screen resolution, installed fonts, etc.)</li>
      </ul>
      <p>Over time, as a user visits the site (or embedded iframes), this footprint grows, allowing for more precise tracking.</p>

      <h2>Advanced Fingerprinting Methods</h2>
      <p>After collecting basic footprinting data, websites (and iframes) can enhance tracking with more advanced techniques:</p>
      <ul>
        <li><strong>Canvas Fingerprinting:</strong> By rendering invisible images or text to the canvas element, websites can gather unique pixel data that can be used for fingerprinting.</li>
        <li><strong>WebGL Fingerprinting:</strong> By using WebGL to render 3D graphics, websites can gather data about the GPU and device hardware, which can be used to uniquely identify users.</li>
        <li><strong>Load-based Tracking:</strong> Techniques like tracking how a site loads and interacts with external resources (images, scripts) can also contribute to a fingerprint, as different devices and network conditions will load resources differently.</li>
      </ul>

      <h2>What About Cookies?</h2>
      <p>While cookies were once the cornerstone of online tracking, they are no longer the primary tool for tracking users, especially due to the increasing enforcement of data privacy laws like the CCPA (California Consumer Privacy Act) and GDPR (General Data Protection Regulation). These laws have forced browsers to adopt stricter privacy measures, particularly around third-party cookies, which were once used to track users across multiple websites.</p>

      <h2>Fun Activity</h2>
      <p>I have embedded several tracking pixels, no iframes though, on the demo page. To view all the requests hit F12 and click on the network tab. Refresh the page and see all of the data being stolen!</p>
      <p>The page also contains the basic finger-print of your computer!</p>
    </div>
  );
};

export default DataCapture;