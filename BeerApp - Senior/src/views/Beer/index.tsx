import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";
import { Grid, Typography, styled } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import MapContainer from '../Map/index'

const InfoContainer = styled("div")({
  "& p": {
    margin: "0 0 0 16px",
  },
});
const StyledLink = styled("a")({
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
});

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article style={{ padding: "1rem" }}>
      <Typography variant="h3" style={{ marginBottom: "1rem" }}>
        {beer?.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InfoContainer>
            <Typography variant="subtitle1" style={{ marginBottom: "0.5rem" }}>
              <b>Brewery type:</b> {beer?.brewery_type}
            </Typography>
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
              <StyledLink
                href={beer?.website_url}
                target="_blank"
                rel="noopener"
              >
                {beer?.website_url}
              </StyledLink>
            </p>
          </InfoContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MapContainer lat={beer?.latitude} lng={beer?.longitude}/>
        </Grid>
      </Grid>
    </article>
  );
};

export default Beer;
