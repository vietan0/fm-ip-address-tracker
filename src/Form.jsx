import { func } from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';

export default function Form({ setLocation, setIpInfo }) {
  const [searchField, setSearchField] = useState('');

  function sendIP(e) {
    e.preventDefault();

    const regex = /[a-z]/i;
    if (searchField.match(regex) === null) fetchAPI(searchField);
    else fetchAPI('', searchField);
  }

  function handleChange(e) {
    setSearchField(e.target.value);
  }

  async function fetchAPI(ip = '', domain = '') {
    let baseUrl = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${
      import.meta.env.VITE_GEOIP_API_KEY
    }`;

    let url;
    if (domain === '') url = `${baseUrl}&ipAddress=${ip}`;
    else {
      let formattedDomain = domain;

      if (domain.match(/https?:\/\//)) {
        // auto get rid of http(s)://
        const firstIndexNotHttp = domain.match(/https?:\/\//)[0].length;
        formattedDomain = domain.substring(firstIndexNotHttp);
      }
      url = `${baseUrl}&domain=${formattedDomain}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setLocation({
      // address: `${data.location.city}, ${data.location.region}`,
      lat: data.location.lat,
      lng: data.location.lng,
    });

    setIpInfo({
      ip: data.ip,
      location: `${data.location.city}, ${data.location.region}`,
      timezone: data.location.timezone,
      isp: data.isp,
    });
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <form action="">
      <input
        type="text"
        name="ip"
        id="ip"
        placeholder="Search for any IP address or domain"
        value={searchField}
        onChange={handleChange}
      />
      <button
        id="submit"
        onClick={sendIP}
      >
        <MdChevronRight
          size={'1.5rem'}
          color="white"
        />
      </button>
    </form>
  );
}

Form.propTypes = {
  setLocation: func,
  setIpInfo: func,
};
