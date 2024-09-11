import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace the URL with your actual endpoint
    axios.get('https://delivery.grabandgo.lk/api/v1/cities.php?districtId=R5351723')
      .then(response => {
        setCities(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading cities: {error.message}</p>;

  // Calculate total count and sort cities alphabetically
  const totalCount = cities.length;
  const sortedCities = [...cities].sort((a, b) => a.displayName.localeCompare(b.displayName));

  // Group cities by first letter
  const citiesByLetter = sortedCities.reduce((acc, city) => {
    const firstLetter = city.displayName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(city);
    return acc;
  }, {});

  return (
    <div>
      <h1>City List</h1>
      <p>Total Cities: {totalCount}</p>
      {Object.keys(citiesByLetter).map(letter => (
        <div key={letter}>
          <h2>{letter} (Total: {citiesByLetter[letter].length})</h2>
          <ul>
            {citiesByLetter[letter].map(city => (
              <li key={city.id}>
                <span>{city.displayName} (ID: {city.id})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CityList;
