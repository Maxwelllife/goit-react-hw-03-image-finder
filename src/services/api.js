export const pixabayAPI = {
  getGallary: async (query, page = 1) => {
    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=28613912-2b9f86456f3c39b89c047be0c&image_type=photo&orientation=horizontal&per_page=12`
    );

    if (!response.ok) {
      throw new Error(response.status);
    }

    const gallary = await response.json();

    return gallary;
  },
};

// import axios from 'axios';

// export class pixabayAPI {
//   #BASE_URL = 'https://pixabay.com/api/';
//   #API_KEY = '28613912-2b9f86456f3c39b89c047be0c';

//   constructor() {
//     this.totalPage = null;
//     this.page = 1;
//     this.image_per_page = 12;
//   }

//   getGallary(query) {
//     return axios.get(`?q=${query}`, {
//       baseURL: this.#BASE_URL,
//       params: {
//         key: this.#API_KEY,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         per_page: this.image_per_page,
//         page: this.page,
//       },
//     });
//   }
//   incrementPage() {
//     this.page += 1;
//   }
// }
