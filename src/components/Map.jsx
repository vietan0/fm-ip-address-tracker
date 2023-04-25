import GoogleMapReact from 'google-map-react';
import LocationPin from './LocationPin';
import { nanoid } from 'nanoid';
import { number, object } from 'prop-types';

export default function Map({ location, zoomLevel }) {
  return (
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 20.99835602, lng: 97.01502627 }}
        center={{ lat: location.lat, lng: location.lng }}
        defaultZoom={zoomLevel}
        yesIWantToUseGoogleMapApiInternals
        key={nanoid()}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
        />
      </GoogleMapReact>
    </div>
  );
}

Map.propTypes = {
  location: object,
  zoomLevel: number,
};
