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
