import './App.css';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import {
  Route, BrowserRouter as Router, Routes, useParams, Link, useNavigate,
} from 'react-router-dom';

import Todos from './components/Todos';
import useDataFetching from './hooks/useDataFetching';
import { UserdataContext, initialUserData } from './contexts/userdata';
import { LanguageContext, initialLanguageState } from './contexts/language';

function App() {
  const [userData, setUserData] = useState(initialUserData);
  const [languageData, setLanguageData] = useState(initialLanguageState);

  const logMeIn = () => setUserData(prevState => ({ ...prevState, isLoggedIn: true }));
  const logMeOff = () => setUserData(prevState => ({ ...prevState, isLoggedIn: false }));

  const changeLanguage = (language) => setLanguageData(prevState => ({ ...prevState, language }));

  return (
    <>
      <LanguageContext.Provider value={{...languageData, changeLanguage}}>
        <UserdataContext.Provider value={{...userData, logMeIn, logMeOff}}>
          <Router>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/pokemon/:pokemon' element={<Pokemon />} />
              <Route path='/type/:type' element={<Type />} />
              <Route path='/notFound' element={<NotFound />} />
              <Route path='/todos' element={<Todos />} />
            </Routes>
          </Router>
        </UserdataContext.Provider>
      </LanguageContext.Provider>
    </>
  )
}


function SearchBar() {
  const navigate = useNavigate();

  function search(e) {
    if (e.key === 'Enter') {
      navigate('/pokemon/' + e.target.value);
    }
  }

  return (
    <div className='navbar-search'>
      <i className="fas fa-search"></i>
      <input type="text" className='searchbar' onKeyDown={search} />
    </div>
  )
}

function NavBar() {
  const { isLoggedIn } = useContext(UserdataContext);
  const { changeLanguage } = useContext(LanguageContext);

  const handleChangeLanguage = (event) => {
    event.preventDefault();
    changeLanguage(event.target.value);
  }

  return (
    <div className='navbar'>
      <Link to={`/`}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" className='img-logo' alt="logo pokemon" /></Link>

      <select name="language" id="language" onChange={handleChangeLanguage}>
        <option value="it">Italiano</option>
        <option value="en">English</option>
      </select>
      {isLoggedIn && <SearchBar />}
    </div>
  )
}

function Home() {
  const { isLoggedIn, logMeIn } = useContext(UserdataContext);
  const { messages, language } = useContext(LanguageContext);

  return (
    <>
      <Titolo>{messages['SEARCH_YOUR_POKEMON'][language]}</Titolo>
      {!isLoggedIn && <h2>Please log in</h2>}
      <button onClick={logMeIn}>Login</button>
    </>
  )
}

function Pokemon() {
  const navigate = useNavigate();
  const [displayMoves, setDisplayMoves] = useState(false);
  
  const { isLoggedIn, userData } = useContext(UserdataContext);

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const { isSuccess, isLoading, isError, data } = useDataFetching({
    createUrl: ({ pokemon }) => `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    token: userData.token
  });

  function showMoves() {
    setDisplayMoves(display => !display);
  }

  return (
    <div className='pokemon'>
      {isLoading && <Titolo>Caricamento in corso</Titolo>}
      {isSuccess && <>
        <Titolo>{data.name}</Titolo>
        <img src={data.sprites.front_default} alt="" className='pokemon-profile' />
        <h3>Tipo</h3>
        <ul className='pokemon-type'>
          {data.types.map((item, key) =>
            <li key={key}><Link to={`/type/${item.type.name}`}>{item.type.name}</Link> </li>)}
        </ul>
        
        <button type='button' onClick={showMoves}>
          {displayMoves ? "Nascondi" : "Mostra"}
        </button>

        <ul className={displayMoves ? "pokemon-moves" : "pokemon-moves hidden"}>
        {/* <ul style={{ display: displayMoves ? "block" : "none" }}> */}
          {data.moves.map((item, key) => <li key={key}>{item.move.name}</li>)}
        </ul>
      </>}
      {isError && <>
        <h2>Pokemon non trovato</h2>
      </>}
    </div>

  )
}

function Type() {
  const navigate = useNavigate();

  const { isSuccess, isLoading, isError, data } = useDataFetching({
    createUrl: ({ type }) => `https://pokeapi.co/api/v2/type/${type}`,
    onError: () => navigate(`/notFound`)
  });

  if (isLoading) {
    return <Titolo>{"Caricamento in corso"}</Titolo>
  }

  return isSuccess ? (
    <>
      <Titolo>Tipo:{data.name}</Titolo>
      <ul>
        double_damage_from
        {data.damage_relations.double_damage_from.map((item, key) => <li key={key}>{item.name}</li>)}
      </ul>
    </>
  ) : null;
}

function Titolo({ children }) {
  return (
    <h1 style={{ color: "#477EDE" }}>{ children }</h1>
  )
}

function NotFound() {
  return (
    <h1>404</h1>
  )
}

export default App;