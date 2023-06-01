import React, { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import {
  Avatar,
  FormControl,
  InputLabel,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Pagination,
  Grid,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import styles from "./BeerList.module.css";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filteredBeerList, setFilteredBeerList] = useState<Array<Beer>>([]);
  const [sortedBeerList, setSortedBeerList] = useState<Array<Beer>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");
  const [pageNumber, setPageNumber] = useState(1);
  const beersPerPage = 10;

  useEffect(() => {
    fetchData(setBeerList);
  }, []);

  useEffect(() => {
    const filteredList = beerList.filter((beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBeerList(filteredList);
  }, [beerList, searchTerm]);

  useEffect(() => {
    const sortedList = [...filteredBeerList].sort((a, b) => {
      if (sortType === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedBeerList(sortedList);
  }, [filteredBeerList, sortType]);

  const handleSearchTermChange = (event: any) => {
    setSearchTerm(event.target.value);
    setPageNumber(1);
  };

  const handleSortTypeChange = (event: any) => {
    setSortType(event.target.value as "asc" | "desc");
  };

  const handlePageChange = (event: any, value: number) => {
    setPageNumber(value);
  };

  const onBeerClick = (id: string) => {
    navigate(`/beer/${id}`);
  };

  // Pagination calculation
  const lastIndex = pageNumber * beersPerPage;
  const firstIndex = lastIndex - beersPerPage;
  const currentBeers = sortedBeerList.slice(firstIndex, lastIndex);
  return (
    <article className={styles.Container}>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchTermChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Sort"
                  value={sortType}
                  onChange={handleSortTypeChange}
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Pagination
                color="primary"
                count={Math.ceil(sortedBeerList.length / beersPerPage)}
                page={pageNumber}
                onChange={handlePageChange}
              />
            </Grid>
          </Grid>

          <List>
            {currentBeers.map((beer) => (
              <ListItemButton key={beer.id} onClick={() => onBeerClick(beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
