const UseDataFetching = (url) => {

  const data = fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    })
    .catch(error => {
      console.log(error);
    });
  return data
};

export default UseDataFetching;