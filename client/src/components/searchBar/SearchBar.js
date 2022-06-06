import './SearchBar.css';
import axios from 'axios';
// Redux 
import { useDispatch } from 'react-redux';
// Actions
import { setInput, setImages, setRecentSearches } from '../../redux/reducers/appSlice';
// Icons
import { BsImages, BsSearch } from 'react-icons/bs';

export default function SearchBar(props) {
  const dispatch = useDispatch();

  // Handle search input
  const searchHandler = (e) => {
    e.preventDefault(); // prevent refresh on submit
    let input = document.getElementById("search-input").value;
    // Set input
    dispatch(setInput(input));
    console.log(`Searching images for "${input}"`);

    // Request for images from server
    axios.get("/image-search", { params: {input, page: 1} })
      .then(res => {
        let searchRes = res.data.images;
        let formatedRes = [];
        for(let image of searchRes) {
          let formatedImg = {
            desc: image.description,
            thumbnail: image.thumbnail.url,
            url: image.url,
            height: image.height,
            width: image.width
          };
          formatedRes.push(formatedImg);
        }
        // Set images
        dispatch(setImages(formatedRes));
      })
      .catch(err => console.log(err));
  };

  // Handle recent button
  const recentHandler = () => {
    // Request for recent searches from server
    axios.get("/image-recent")
      .then(res => {
        let recentRes = res.data.reverse();
        recentRes = recentRes.slice(0, 21);
        let formatedRes = [];
        for(let search of recentRes) {
          let formatedSrch = {
            id: search._id,
            query: search.searchQuery,
            timestamp: search.timeSearched
          };
          formatedRes.push(formatedSrch);
        }
        // Set recent searches
        dispatch(setRecentSearches(formatedRes));
      })
      .catch(err => console.log(err));
  }

  return (
    <div id="search-bar">
      <h1>Image <BsImages/> Search</h1>
      <div>
        <form id="search-form" onSubmit={searchHandler}>
          <input id="search-input" type="text" placeholder="Search Image" autoComplete="off"/>
          <button id="search-submit" type="submit"><span><BsSearch/></span></button>
        </form>
      </div>
      <button id="search-recent" onClick={() => recentHandler()}>20 Most Recent Searches</button>
    </div>
  );
};