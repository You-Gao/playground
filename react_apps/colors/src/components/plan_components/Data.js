import React from 'react';
import '../Plan.css';

const DataCapture = () => {
  return (
    <div style={{background: "black", display: "flex", justifyContent: "space-around"}} className="Document">
      <div className="MainBody" id="PostTitle"> 

      <h1>Axciom Technical Report</h1>

      <p>Thanks to the tireless efforts of the R&D department at Axciom, we have compiled this comprehensive report on state-of-the-art methods for acquiring and analyzing user data. These techniques, some of the most advanced in the industry, are designed to enable seamless data collection, tracking, and fingerprinting, which can be applied to enhance user profiling and targeting strategies for our proprietary platform, Colors.</p> 
      
      <p>This report delves into the mechanisms websites and embedded elements use to extract user information, ranging from direct tracking via cookies and IP addresses to sophisticated methods like canvas and WebGL fingerprinting. Each technique is carefully examined, with a focus on how it contributes to creating detailed, durable, and actionable user profiles.</p>
      
      <p>As the online privacy landscape evolves, traditional methods like cookies have seen diminished utility, necessitating more robust, stealthy, and legally compliant strategies. In this report, we explore these advancements in detail and highlight their potential applications in optimizing C&E (Capture and Exfiltration), particularly for Colors. Otherwise internally known as JAADCEW (Just Another Aesthetic Data Capture and Exfiltration Website).</p>

      <h2>Tracking Hiearchy</h2>
      
      <h3>Direct Tracking</h3>
      <p>Websites that you visit directly have extensive access to your data due to their control over the page and resources you are interacting with. This includes access to local storage, which can store persistent data that survives across browser sessions, and cookies, which enable websites to save information like session IDs, preferences, and tracking tokens. Additionally, your IP address is readily visible to the website, which not only reveals your approximate geographic location but can also help correlate activity across different sessions or devices when combined with other identifiers. Direct tracking is foundational to most websites' data collection practices, forming the basis for more advanced tracking and analytics.</p>

      <h3>Embedded Iframes</h3>
      <p>Third-party iframes embedded within a webpage extend tracking capabilities by enabling external entities to run their scripts and manage their storage mechanisms. These iframes operate as mini-websites within the parent site, often with distinct permissions and isolated storage. They can employ local storage and cookies to store tracking identifiers and execute JavaScript to gather detailed information about the host page, the user's browser, and system details. Since iframes are often used for advertising, analytics, or social media plugins, they can track users across multiple websites by embedding the same iframe across a network of sites, building comprehensive user profiles.</p>

      <h3>Basic Tracking (1x1 Pixel Tracking)</h3>
      <p>1x1 pixel trackers, also known as web beacons or pixel tags, represent a minimalist yet effective form of data collection. These small, invisible images are embedded in a webpage or email and generate external HTTP requests when loaded. Through these requests, the server hosting the pixel can capture valuable metadata, including the user's IP address, browser details, operating system, screen resolution, and referring URL. While less versatile than script-based tracking, pixel tracking is lightweight, unobtrusive, and can operate even in restrictive environments where scripts are blocked. It is frequently used in email marketing and basic web analytics to confirm message delivery, track open rates, and monitor user activity.</p>

      <h2>Information Gathered by Websites</h2>

      <h3>Local Storage/Session</h3>
      <p>Websites and embedded iframes often utilize local storage or session storage to save data directly on the user's browser. Unlike cookies, local storage data is not automatically transmitted with every HTTP request, making it less detectable and harder to control. This durability allows stored information, such as unique identifiers or user preferences, to persist even after the browser is closed and reopened. Session storage, though temporary, provides similar capabilities but resets once the session ends. These storage methods are widely used for caching, personalization, and tracking, offering developers a more robust alternative to traditional cookies while bypassing some browser restrictions.</p>

      <h3>Traditional Browser and IP Headers</h3>
      <p><strong>Browser Information:</strong> Websites automatically collect metadata from HTTP headers whenever a user makes a request. This includes browser type (e.g., Chrome, Firefox), version, language settings, and operating system details. One particularly valuable field is the referrer header, which reveals the URL of the previous page the user visited. This can be used to track user journeys, monitor ad performance, and infer intent. Together, these details provide a wealth of contextual data that aids in identifying and profiling users.</p>
      <p><strong>IP Address:</strong> Every request a browser makes includes the user’s IP address, which identifies their device on the internet. The IP address is a critical piece of information as it reveals the user's general geographic location, internet service provider, and sometimes organizational affiliation. </p>

      <h3>Advanced Browser Information</h3>
      <p><strong>Installed Plugins:</strong> Browsers often disclose the types and versions of plugins or extensions installed, which can uniquely identify users.</p>
      <p><strong>Screen Resolution:</strong> The screen dimensions, including pixel density, reveal information about the device and can help differentiate users.</p>
      <p><strong>Fonts and Rendering Behavior:</strong> The set of installed fonts and how text or graphics are rendered can vary across devices, offering further tracking signals.</p>
      
      <h2>Construction of Fingerprints from User Data</h2>
      <h3>Fingerprinting</h3>
      <p>Fingerprinting refers to the process of collecting, organizing, and analyzing diverse user data to create a cohesive digital profile or "fingerprint." This profile is built incrementally as users interact with websites or embedded iframes. A fingerprint combines various data points to form a detailed, unique identifier that evolves over time.</p>
        <p>To rehash, the key components of a fingerprint can include: Local Storage/Sessions, Cookies, Browser Metadata, HTTP Metadata, IP Addresses, and JavaScript-based information (like screen resolution, installed fonts, etc.).</p> 


      <p>As users repeatedly visit a website or its embedded resources, this fingerprint becomes increasingly refined. Patterns emerge, allowing us to infer habits, preferences, and identities, even in environments where traditional tracking mechanisms like third-party cookies are restricted. Over time, this enriched fingerprint supports applications like targeted advertising, behavioral analysis, and ultimately economic extraction.</p>

      <h2>Advanced Fingerprinting Methods</h2>
      <p>Once basic fingerprinting data is gathered, websites and embedded resources can implement advanced fingerprinting techniques to create even more precise and durable user identifiers. These methods leverage modern web technologies to extract unique characteristics of a user's device and browsing behavior that are difficult to alter or obscure.</p>
        <p><strong>Canvas Fingerprinting:</strong> By rendering invisible images or text to the canvas element, websites can gather unique pixel data that can be used for fingerprinting.</p>
        <p><strong>WebGL Fingerprinting:</strong> By using WebGL to render 3D graphics, websites can gather data about the GPU and device hardware, which can be used to uniquely identify users.</p>
        <p><strong>Load-based Tracking:</strong> Techniques like tracking how a site loads and interacts with external resources (images, scripts) can also contribute to a fingerprint, as different devices and network conditions will load resources differently.</p>

        <h2>Farewell Cookies</h2>
        <p>For years, third-party cookies allowed advertisers and trackers to follow users across websites, collecting data about their preferences, browsing habits, and demographics. This data was instrumental in building detailed user profiles for targeted advertising and personalized experiences. However, the advent of stringent privacy laws such as the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR) in the European Union has disrupted this practice. These laws introduced transparency and consent requirements, empowering users to opt out of cookie-based tracking and limiting the scope of data collection without explicit user approval.</p>
        <p>In response to the decline of cookies, Axciom Group have embraced more advanced techniques like fingerprinting, local storage, and server-side tracking. These methods operate outside the traditional cookie framework, enabling continued user identification without violating cookie-specific restrictions.

    While cookies may still play a role in session management and user authentication, their days as the dominant tracking tool are numbered. The shift away from cookies marks a turning point in the digital ecosystem, emphasizing the need for innovative and privacy-compliant tracking solutions.</p>

      <h2>Fun Activity</h2>
      <p>The folks at Axciom Group have developed an interactive demo for you to explore the mechanics of online tracking in action! This page includes several embedded tracking pixels—no iframes this time—designed to demonstrate how data is collected.</p>
      <p>To see the requests in action, simply press F12 to open your browser’s developer tools and navigate to the Network tab. Refresh the page and observe the flow of information being captured in real-time!</p>
      <p>Additionally, the page showcases the basic fingerprint of your computer, illustrating how easily websites can gather unique identifiers from your browsing environment.</p>
      <div id="Padding"></div>

      </div>
    </div>

  );
};

export default DataCapture;