import axios from 'axios';

export const normalizeData = (data) => {
   return data.map(earthquake => {
    return {
      City: earthquake.title, // Deprem ismini "City" olarak atıyoruz
      Country: earthquake.provider, // Sağlayıcıyı "Country" olarak atıyoruz
      Pop2010: earthquake.mag, // Büyüklüğü "Pop2010" olarak atıyoruz
      Location: earthquake.geojson.coordinates, // Konumu "Location" olarak atıyoruz
      Date: earthquake.date, // Tarihi "Date" olarak atıyoruz
      Depth: earthquake.depth, // Derinliği "Depth" olarak atıyoruz
    }
  });
};

export const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };
  
  export const getEarthquakeData = async (startDate, endDate, limit) => {
    const response = await axios.get(
      `https://api.orhanaydogdu.com.tr/deprem/kandilli/archive?limit=${limit}&date=${startDate}&date_end=${endDate}`
    );
    console.log(111,response.data.result);
    return response.data.result;
};
  
export const calculateCounts = (data) => {
    const countsObj = data.reduce((acc, curr) => {
      const location = curr.title.split("-")[1].trim();
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});

    const countsArray = Object.entries(countsObj).map(([name, count]) => ({
      name,
      count
    }));

    return countsArray;
};

export const getMinMaxMagnitude = (data) => {
    console.log(1010,data)
    return data.reduce((acc, curr) => {
        const location = curr.title.split("-")[1]; // İl ismini alıyoruz
      if (!acc[location]) {
        // Eğer il daha önce görülmemişse, ilk görülen deprem büyüklüğünü hem min hem max olarak atıyoruz
        acc[location] = { min: curr.mag, max: curr.mag };
      } else {
        // Eğer il daha önce görülmüşse, min ve max değerlerini güncelliyoruz
        if (curr.mag < acc[location].min) {
          acc[location].min = curr.mag;
        } else if (curr.mag > acc[location].max) {
          acc[location].max = curr.mag;
        }
      }
      return acc;
    }, {});
  };
  
  export const fetchEarthquakes = async (startDate, endDate, limit) => {
    const formattedStartDate =await formatDate(startDate);
    const formattedEndDate = await formatDate(endDate);
    const data = await getEarthquakeData(formattedStartDate, formattedEndDate, limit);
    /*  *//* const counts = await calculateCounts(data); */
    const normalizedData = await normalizeData(data);
    const quakeStats = await getMinMaxMagnitude(data);
    console.log(222,normalizedData);
    return {  normalizedData, quakeStats };
  };
  
