import { createContext } from 'react';

export const initialUserData = { isLoggedIn: false, userData: { token: "" } };

export const UserdataContext = createContext();

