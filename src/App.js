import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";

import * as gameService from "./services/gameService";
import { authContext } from "./contexts/authContext";
import { GameContext } from "./contexts/GameContext";

import { useLocalStorage } from "./hooks/useLocalStorage";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
// import Register from "./components/Register/Register";
import Catalog from "./components/Catalog/Catalog";
import CreateGame from "./components/CreateGame/CreateGame";
import EditGame from "./components/EditGame/EditGame";
import GameDetails from "./components/GameDetails/GameDetails";

const Register = lazy(() => import("./components/Register/Register"));

function App() {
  const [games, setGames] = useState([]);
  const [auth, setAuth] = useLocalStorage("auth", {});
  const navigate = useNavigate();

  const userLogin = (authData) => {
    setAuth(authData);
  };

  const userLogout = () => {
    setAuth({});
  };

  const addComment = (gameId, comment) => {
    setGames((state) => {
      const game = state.find((x) => x._id === gameId);
      const comments = game.comments || [];
      comments.push(comment);

      return [...state.filter((x) => x._id !== gameId), { ...game, comments }];
    });
  };

  const gameAdd = (gameData) => {
    setGames((state) => [...state, gameData]);

    navigate("/catalog");
  };

  const gameEdit = (gameId, gameData) => {
    setGames((state) => state.map((x) => (x._id === gameId ? gameData : x)));
  };

  useEffect(() => {
    gameService.getAll().then((result) => {
      setGames(result);
    });
  }, []);

  return (
    <authContext.Provider value={{ user: auth, userLogin, userLogout }}>
      <div id="box">
        <Header />
        {/* Main Content */}
        <main id="main-content">
          <GameContext.Provider value={{ games, gameAdd, gameEdit }}>
            <Routes>
              <Route path="/" element={<Home games={games} />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/register"
                element={
                  <Suspense fallback={<span>Loading...</span>}>
                    <Register />
                  </Suspense>
                }
              ></Route>
              <Route path="/logout" element={<Logout></Logout>}></Route>
              <Route
                path="/catalog"
                element={<Catalog games={games} />}
              ></Route>
              <Route path="/create" element={<CreateGame />}></Route>
              <Route path="/games/:gameId/edit" element={<EditGame />}></Route>
              <Route
                path="/catalog/:gameId"
                element={<GameDetails games={games} addComment={addComment} />}
              ></Route>
            </Routes>
          </GameContext.Provider>
        </main>
      </div>
    </authContext.Provider>
  );
}

export default App;
