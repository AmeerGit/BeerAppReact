import React, { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import styles from "./BeerList.module.css";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filteredBeerList, setFilteredBeerList] = useState<Array<Beer>>([]);
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
    setFilteredBeerList(sortedList);
  }, [filteredBeerList, sortType]);

  const handleSearchTermChange = (event: any) => {
    setSearchTerm(event.target.value);
    setPageNumber(1);
  };

  const handleSortTypeChange = (event: any) => {
    setSortType(event.target.value as "asc" | "desc");
  };

  const handlePaginationNext = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePaginationPrevious = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const onBeerClick = (id: string) => {
    navigate(`/beer/${id}`);
  };

  // Pagination calculation
  const lastIndex = pageNumber * beersPerPage;
  const firstIndex = lastIndex - beersPerPage;
  const currentBeers = filteredBeerList.slice(firstIndex, lastIndex);

  return (
    <article className={styles.Container}>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <div className={styles.BeerListContainer}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />

            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Sort
              </InputLabel>
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
            <div>
              <Button variant='contained'
                onClick={handlePaginationPrevious}
                disabled={pageNumber === 1}
              >
                Prev
              </Button>
              <span> {pageNumber} </span>
              <Button variant='contained'
                onClick={handlePaginationNext}
                disabled={lastIndex >= filteredBeerList.length}
              >
                Next
              </Button>
            </div>
          </div>
          <List>
            {currentBeers.map((beer) => (
              <ListItemButton
                key={beer.id}
                onClick={() => onBeerClick(beer.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={beer.name}
                  secondary={beer.brewery_type}
                />
              </ListItemButton>
            ))}
          </List>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
