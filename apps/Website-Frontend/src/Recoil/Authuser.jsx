// src/recoil/authState.js
import { atom, selector } from 'recoil';
import API_URL from '../helpers/ApiKey.js';

export const authState = atom({
  key: 'authState',
  default: {
    isLoading:true,
    isLoggedIn: false,
    user: null,
  },
});

export const checkAuthSelector = selector({
  key: 'checkAuthSelector',
  get: async () => {
    console.log("Hi From recoil")
    try {
      const token = localStorage.getItem('token') || '';
      const response = await fetch(`${API_URL}/api/v1/user/check-auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        return { isLoggedIn: true, user: data };
      } else {
        return { isLoggedIn: false, user: null };
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
      return { isLoggedIn: false, user: null };
    }
  },
});
