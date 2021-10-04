import { useState, useEffect } from 'react';
import { globalVars } from '../globals/globalVars';
import axios from 'axios';
import { groupByTimeResolution } from '../utils/utils';

const useApi = ({
  longitude,
  latitude,
  start,
  end,
  time_resolution,
}) => {
  const [response, setResponse] = useState({ data: '', status: 100 });

  useEffect(() => {
    if (longitude, latitude, start, end) {
      axios.get(`${globalVars.apiUrl}&longitude=${longitude}&latitude=${latitude}&start=${start}&end=${end}&format=JSON`)
        .then((data) => setResponse({
          data: groupByTimeResolution(data.data.properties.parameter.T2M, time_resolution),
          status: data.status, 
        }))
        .catch(() => setResponse({ ...response, status: 404 }))
    }
  }, [longitude, latitude, start, end, time_resolution]);

  return response;
}
export default useApi;
