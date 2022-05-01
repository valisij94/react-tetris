import logo from './logo.svg';
import './App.css';
import GameHeader from './components/header/Header';
import GameBoard from './components/gameboard/GameBoard';
import { createStore } from 'redux';
import reducers from './redux/reducers'
import { Provider } from 'react-redux';

const store = createStore(reducers);
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GameHeader headerText="React Tetris" />
        <GameBoard />
      </div>
    </Provider>
  );
}

export default App;
