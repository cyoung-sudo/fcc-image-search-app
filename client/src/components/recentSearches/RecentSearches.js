import './RecentSearches.css';
// Redux
import { useSelector } from 'react-redux';

export default function RecentSearches(props) {
  const { recentSearches } = useSelector((state) => state.app);

  return (
    <div id="recent-searches">
      <div id="recent-title">Recent Searches</div>
      <ul id="recent-display">
        {recentSearches.map(search => (
          <li className="recent-item" key={search.id}>
            <div className="recent-query">{search.query}</div>
            <hr/>
            <div className="recent-timestamp">{search.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};