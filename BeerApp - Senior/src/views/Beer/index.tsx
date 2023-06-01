import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import MapContainer from '../Map/index'
import styles from  "./Beer.module.css";

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article style={{ padding: "1rem", height: '400px' }}>
      <Typography variant="h3" style={{ marginBottom: "1rem" }}>
        {beer?.name}
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6}>
        <div className={styles.infoContainer}>
            <p>
              <b>Brewery type: </b> {beer?.brewery_type}
            </p>
            <p>{beer?.street}</p>
            <p>
              {beer?.city}, {beer?.state}, {beer?.country}, {beer?.postal_code}
            </p>
            <br></br>
            <p>
              <PhoneIcon/> {beer?.phone}
            </p>
            <p>
            <LanguageIcon/> {" "}
            <a
                className={styles.link}
                href={beer?.website_url}
              >
                {beer?.website_url}
              </a>
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MapContainer lat={beer?.latitude} lng={beer?.longitude}/>
        </Grid>
      </Grid>
    </article>
  );
};

export default Beer;
