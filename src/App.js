import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("repositories").then(({ data }) => setRepository(data));
  }, []);
  const handleAddRepository = () => {
    const repository = {
      title: "Desafio ReactJS",
      url: "http://google.com",
      techs: "nodejs",
    };
    api.post("repositories", repository).then(({ data }) => {
      setRepository([...repositories, data]);
    });
  };

  const handleRemoveRepository = (repositoryId) => async () => {
    await api.delete(`repositories/${repositoryId}`);
    const repositoryIndex = repositories.findIndex(
      ({ id }) => id === repositoryId
    );

    repositories.splice(repositoryIndex, 1);

    setRepository([...repositories]);
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
