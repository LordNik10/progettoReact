import logo from './logo.svg';
import './App.css';

import data from './articles.json';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className='navbar'>
          <span className='website-name'>{data.articles[0].source.name}</span>
          <div className='navbar-buttons'>
            <button type='button'>Login</button>
            <button type='button'>Sig in</button>
          </div>
          
        </div>
        <h1 className='page-title'>{data.articles[0].title}</h1>

        <h2 className='page-subtitle'>{data.articles[0].description}</h2>

        <div className='container-img'>
          <span className='date-articles'>Data di pubblicazione: {data.articles[0].publishedAt}</span>
          <img src={data.articles[0].urlToImage} className='img-article'></img>
        </div>
        
        <p className='article-body'>{data.articles[0].content}</p>

        <span className='article-author'>Autore: {data.articles[0].author}</span>
        {/* <ul>
            {data.articles.map(article => 
              <li>{article.title}</li>
            )}
        </ul> */}

      </header>
        
        
    </div>
  );
}

export default App;
