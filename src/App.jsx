import { useState } from 'react';
import Map from './components/Map';
import Form from './components/Form';

export default function App() {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const [ipInfo, setIpInfo] = useState({
    ip: '',
    location: '',
    timezone: '',
    isp: '',
  });

  return (
    <>
      <header>
        <h1>IP Address Tracker</h1>
        <Form
          setLocation={setLocation}
          setIpInfo={setIpInfo}
        />
        <div className="ip-info">
          <div className="col">
            <p className="col-name">IP Address</p>
            <p className="col-value">{ipInfo.ip}</p>
          </div>
          <div className="col">
            <p className="col-name">Location</p>
            <p className="col-value">{ipInfo.location}</p>
          </div>
          <div className="col">
            <p className="col-name">Timezone</p>
            <p className="col-value">UTC {ipInfo.timezone}</p>
          </div>
          <div className="col">
            <p className="col-name">ISP</p>
            <p className="col-value">{ipInfo.isp}</p>
          </div>
        </div>
      </header>
      <Map
        location={location}
        zoomLevel={15}
      />
      <div className="attribution">
        Challenge by{' '}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/vietan0">Việt An</a>.
      </div>
    </>
  );
}
