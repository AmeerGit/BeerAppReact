import React, { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
    setSavedList(savedItems);
  }, []);

  useEffect(() => {
    fetchData(setBeerList);
  }, []);


  const handleToggleSaved = (beer: Beer) => {
    const beerIndex = savedList.findIndex((item) => item.id === beer.id);
    if (beerIndex === -1) {
      const updatedList = [...savedList, beer];
      setSavedList(updatedList);
      localStorage.setItem('savedItems', JSON.stringify(updatedList));
    } else {
      const updatedList = savedList.filter((item) => item.id !== beer.id);
      setSavedList(updatedList);
      localStorage.setItem('savedItems', JSON.stringify(updatedList));
    }
  };

  const handleRemoveAll = () => {
    setSavedList([]);
    localStorage.removeItem('savedItems');

  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label='Filter...' variant='outlined' />
                <Button variant='contained'>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      checked={savedList.some((item) => item.id === beer.id)}
                      onChange={() => handleToggleSaved(beer)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick={handleRemoveAll}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      checked={true}
                      onChange={() => handleToggleSaved(beer)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
