import React, { useEffect, useState } from 'react';
import DigimonCard from './Card';
import Form from 'react-bootstrap/Form';

const DigimonApi = () => {
  const [digimons, setDigimons] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDigimon, setSelectedDigimon] = useState(null);
  const [sortOrder, setSortOrder] = useState('A-Z');

  const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData('https://digimon-api.vercel.app/api/digimon');
        setDigimons(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const searchDigimon = async (event) => {
    event.preventDefault();
    if (search === '') {
      setSelectedDigimon(null);
    } else {
      try {
        const data = await getData(`https://digimon-api.vercel.app/api/digimon/name/${search}`);
        setSelectedDigimon(data[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  let displayedDigimons = [...digimons];
  if (sortOrder === 'A-Z') {
    displayedDigimons.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    displayedDigimons.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <form onSubmit={searchDigimon} className="d-flex align-items-center">
          <input
            type="text"
            placeholder="Buscar digimon"
            value={search}
            className="form-control"
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === '') {
                setSelectedDigimon(null);
              }
            }}
          />
          <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
        <Form.Control 
          as="select"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="mb-2"
          style={{width: 'auto'}}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </Form.Control>
      </div>

      {selectedDigimon ? (
        <div className="d-flex justify-content-center flex-wrap">
          <DigimonCard digimon={selectedDigimon} />
        </div>
      ) : (
        <div className="d-flex justify-content-center flex-wrap">
          {displayedDigimons.map(digimon => (
            <DigimonCard key={digimon.name} digimon={digimon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DigimonApi;















