import { Suggestion } from './Suggestion';
import { NavbarBottom } from './NavbarBottom';
import Spielplatz from './img/playground_Suggestion.jpg';
import Parkbank from './img/bench.jpg';
import Sportplatz from './img/sportsfield.jpg';
import Radweg from './img/bikeway.jpg';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { NavbarTop } from './NavbarTop';
export const SuggestionsRejected = () => {
  const { locationName, lat, long } = useSelector((state) => state.Geo);

  return (
    <div>
      <NavbarTop suggestions={true} suggestions_denied={true}/>

      <div className='no-data'>
        In diesem Gebiet befinden sich noch keine abgelehnten Anträge. Wir sind aber
        bereits im Dialog mit der lokalen Regierung für eine Ratsversammlung. Gerne können Sie
        diese auch persönlich kontaktieren.
      </div>
      <NavbarBottom
        classstart='under-navitem-selected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-unselected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );
};
