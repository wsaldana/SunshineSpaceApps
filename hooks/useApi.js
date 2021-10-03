import { useState, useEffect } from 'react';
import { globalVars } from '../globals/globalVars';

const useApi = ({
  logitud,
  latitude,
  start,
  end,
}) => {
  const [response, setResponse] = useState({ data: '', status: 100 });

  useEffect(() => {
    if (queryParams) {
      fetch(`
        ${globalVars.apiUrl}&logitud=${logitud}&latitude=${latitude}&start=${start}&end=${end}
      `)
        .then((data) => setResponse(''))
        .catch((err) => setResponse({ ...response, err }))
    }
  }, [queryParams]);

  return response;
}
