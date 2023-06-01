import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article style={{ padding: '1rem' }}>
      <Typography variant="h3" style={{ marginBottom: '1rem' }}>
        {beer?.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div >
          <Typography variant="subtitle1" style={{ marginBottom: '0.5rem' }}>
            <b>Brewery type:</b> {beer?.brewery_type}
          </Typography>
          <p>
            {beer?.street}
          </p>
          <p>
            {beer?.city}, {beer?.state}, {beer?.country}, {beer?.postal_code}
          </p>
          <p>
           {beer?.phone}
          </p>
          <p>
            <a href={beer?.website_url} target="_blank" rel="noopener">
              {beer?.website_url}
            </a>
          </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          
        </Grid>
      </Grid>
    </article>
  );
};

export default Beer;
