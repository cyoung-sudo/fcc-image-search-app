import './App.css';
// React
import { useEffect } from 'react';
// Redux
import { useSelector } from 'react-redux';
// Components
import SearchBar from './components/searchBar/SearchBar';
import Images from './components/images/Images';
import RecentSearches from './components/recentSearches/RecentSearches';
import Footer from './components/footer/Footer';

function App() {
  const { display } = useSelector((state) => state.app);

  // Trigger on load
  useEffect(() => {
    // Scroll to top on page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="app">
      <div id="content-wrapper">
        <SearchBar/>
        {(display === "images") && <Images/>}
        {(display === "recent") && <RecentSearches/>}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
