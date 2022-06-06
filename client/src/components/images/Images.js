import './Images.css';
import axios from 'axios';
// React
import { useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { setImages, nextPage, prevPage } from '../../redux/reducers/appSlice';
// Icons
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

export default function Images(props) {
  const { input, images, page } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  // Trigger on page change
  useEffect(() => {
    // Request for images from updated page
    axios.get("/image-search", { params: {input, page: page} })
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
    // Scroll to top on page
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div id="images">
      <ul id="images-display">
        {images.map(image => (
          <li key={image.url}>
            <img src={image.url} alt="image" height={image.height} width={image.width}/>
          </li>
        ))}
      </ul>
      <div>
        {(page > 1) && 
          <button onClick={() => dispatch(prevPage())} className="images-btn">
            <span><ImArrowLeft/></span> Prev
          </button>
        } 
        <button onClick={() => dispatch(nextPage())} className="images-btn">
          Next <span><ImArrowRight/></span>
        </button>
      </div>
      <div id="images-page">Page {page}</div>
    </div>
  );
};