import React, { useState, useEffect } from "react";
import "./styles.css";
import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
      
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": `"Repo ${Date.now()}`,
      "url": "http://git.com/danielnasiloski",
      "techs": [
        "Nodejs",
        "React JS"
      ]
    })
    const repository = response.data;
    setRepositories([ ...repositories, repository ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const updateRepo = [...repositories];
    const repositoryIndex = updateRepo.findIndex(repository => repository.id === id);
    updateRepo.splice(repositoryIndex, 1);
    setRepositories(updateRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
