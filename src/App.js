import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './redux';

const App = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch])
  return (
    <div className="App">
      <h1>Redux async example</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red'}}>Error: {error}</p>}
      {data && (
        <div>
          <h2>Data:</h2>
          <pre>{JSON.stringify(data, null, 1)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
