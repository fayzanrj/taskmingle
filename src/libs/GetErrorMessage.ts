export const getErrorMessage = (error: any): string => {
    // Checking if error has a response property and it has a message property
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
  
    // If not, fallbacking to the error message property
    return error.message || "An error occurred.";
  };
  
