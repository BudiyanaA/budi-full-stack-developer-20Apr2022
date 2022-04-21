async function fetcher(...args) {
  try {
    const response = await fetch(...args);

    // if the server replies, there's always some data in json
    // if there's network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText);
    error.response = response;
    error.data = data;

    throw error;
  } catch (err) {
    if (!err.data) {
      err.data = { message: err.message };
    }

    throw err;
  }
}

export default fetcher;
