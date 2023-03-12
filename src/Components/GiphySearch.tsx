import * as React from "react";
import  { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";

import { Gif, Parameters } from "../Models/Model";

const GiphySearch = (): React.ReactElement => {

  const [search, setSearch] = useState<string>("trending");
  const [gifs, setGifs] = useState([] as Gif[]);
  let currentOffset_search = 0;

  const handleSearchChange = (event : React.ChangeEvent<HTMLInputElement>)=> {
    setSearch(event.target.value);
  };
  // const searchValue = search;
  const handleSubmit = async (event : React.MouseEvent) => {
    event.preventDefault();
    setGifs([]);
    fetchGifs();
    setSearch(search);
    currentOffset_search = 0
  };

  const handleScroll = (e:any) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight >= scrollHeight) {
      fetchGifs();
    }
  };
  
  useEffect(() => {
    const win: Window = window;   // <-- DOM-Window, extends DOM-EventTarget
    win.addEventListener("scroll", handleScroll);
    fetchGifs();
}, []);
const fetchGifs = () => {
  axios
    .get(`https://api.giphy.com/v1/gifs/search?api_key=JRNq5rq7jqCYKKN15b1a0QUQoKrk3kvd&q=${search}&limit=10&offset=${currentOffset_search}`)
    .then(({ data }) => {
      const temp = data.data
      setGifs((gifs) => [...gifs, ...temp]);
    });
  currentOffset_search += 10;
};

  return (
    <div className="m-5">
      <Search 
        search={search}
        handleSearchChange={handleSearchChange}
        handleSubmit={handleSubmit}
      />
    <div className='container gifs'>
      <>{gifs.map((gif: Gif,i:number) => {
        return (
            <div key={i} className="gif">
                <img src={gif.images.fixed_height.url} />
            </div>
        );
      })}</>
    </div>
      
    </div>
  );
};

export default GiphySearch;