import { Map, GoogleApiWrapper } from "google-maps-react";
import { MapOutlined } from '@mui/icons-material';

const MapContainer = (props: any) => {
  const { lat, lng } = props;
  
  if(!lat){
    return(
      <>
      <MapOutlined fontSize="large" />
      <p>Map Unavailable</p>
    </>
    )
  }

  return (
    <Map
      google={props.google}
      style={{ width: "300px", height: "300px" }}
      initialCenter={{
        lat,
        lng,
      }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBLK9yCae4cjddxk2tjl9aYAt8tkHCidHQ",
})(MapContainer);
