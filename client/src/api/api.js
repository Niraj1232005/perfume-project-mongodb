import axios from 'axios';

const API_BASE_URL = 'https://perfume-project-mongodb.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const getReviews = async (productId) => {
  try {
    const response = await api.get(`/reviews/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for ${productId}:`, error);
    throw error;
  }
};

export const addReview = async (data) => {
  try {
    const response = await api.post('/reviews', data);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};
