import {
  useState,
  useEffect
} from 'react';

const useApi = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null)
      }, 3000)
    } finally {
      setLoading(false);
    }
  };


  const createData = async (newData) => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      const createdData = await response.json();
      setData([...data, createdData]);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null)
      }, 3000)

    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      const updatedItem = await response.json();
      const updatedDataList = data.map((item) =>
        item.id === id ? updatedItem : item
      );
      setData(updatedDataList);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null)
      }, 3000)

    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    try {
      setLoading(true);
      await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
      });
      const updatedDataList = data.filter((item) => item.id !== id);
      setData(updatedDataList);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null)
      }, 3000)

    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    createData,
    updateData,
    deleteData,
    fetchData
  };
};

export default useApi;