import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Route, BrowserRouter as Router, Routes, useParams, Link, useNavigate,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:pokemon" element={<Pokemon />} />
        <Route path="/tipo/:type" element={<Tipo />} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  )
}

function Home() {
  const [json, updateJson] = useState({ results: [] });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then(res => res.json())
      .then(updateJson)
  }, [])

  return (
    <>
      <ul>{json.results.map(pokemon => (
        <li key={pokemon.name}>
          <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
        </li>
      ))}</ul>
    </>

  );
}

function Pokemon() {
  const { pokemon } = useParams();
  const [json, updateJson] = useState();
  const [isLoaded, SetIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => res.json())
      .then(function (json) {
        SetIsLoaded(true);
        updateJson(json);
        console.log(json);
      })
      .catch(function (error) {
        navigate("/notFound");
        console.log(error);
      })
  }, [pokemon])

  if (isLoaded == false) {
    return (
      <h1>Caricamento in corso</h1>
    )
  }

  const maiuscoletto = stringa => `${stringa[0].toLocaleUpperCase()}${stringa.slice(1)}`

  return (
    <div className="pokemon">
      <h2>{json.name}</h2>
      <ol>
        {json.types.map(item => <li><Link to={`/tipo/${item.slot}`}>{maiuscoletto(item.type.name)}</Link></li>)}
      </ol>
      <img src={json.sprites.front_default}/>
      <ul>
        {json.moves.map(({move}) => <li>{move.name}</li>)}
      </ul>
    </div>
  );
}

function NotFound() {
  return (
    <h1>404</h1>
  )
}

function SearchBar() {

  const navigate = useNavigate();



  function searchPokemon(e) {
    if (e.key == 'Enter') {
      navigate('/pokemon/' + e.target.value);
    }
  }

  return (
    <input type="text" onKeyDown={searchPokemon} />
  )
}

function Tipo() {
  const [json, updateJson] = useState(false);
  const { type } = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(updateJson)
  }, []);

  if (!json) return (<h1>Caricamento...</h1>);

  return (
    <>
      <ul->{json.moves.map(move => (
        <li key={move.name}>{move.name}</li>
      ))}</ul->
    </>

  );
}

function News() {
  const [json, updateJson] = useState([]);

  useEffect(() => {
    (async function () {
      const json = await import("./articles.json");
      updateJson(json.articles);
    })();
  }, []);

  if (json.length === 0) return;

  const colonne = Object.keys(json[0]).filter(key => key !== "source");

  const NewsRow = ({news}) => (
    <tr>
      {colonne.map(key => (
        <td key={key}>{news[key]}</td>
      ))}
    </tr>
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            {colonne.map(colonna => (
              <th key={colonna}>{colonna}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {json.map(item => <NewsRow news={item} />)}
        </tbody>
      </table>
      <pre>{ JSON.stringify(json, null, 4) }</pre>
    </>
  );
}

export default App;