const BASE_URL = 'http://localhost:8080';

export const apiService = {
  async get(url) {
     try {
      const response = await fetch(BASE_URL + url)
           if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
           }
            return await response.json();
      } catch (error) {
         throw error
    }
  },

    async post(url, data) {
        const response = await fetch(BASE_URL + url, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
            body: data
       });
         return response;
  },
   async put(url, data) {
        const response = await fetch(BASE_URL + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
           body: data
        });
         return response
    },

   async delete(url) {
       const response = await fetch(BASE_URL + url, {
            method: 'DELETE',
         });
      return response;
   },
};