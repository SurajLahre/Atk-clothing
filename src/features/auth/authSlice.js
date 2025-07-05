import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if available
const loadUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
      isAuthenticated: !!storedToken,
      isAdmin: storedUser ? JSON.parse(storedUser)?.role === "admin" : false,
      status: "idle",
      error: null,
    };
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      status: "idle",
      error: null,
    };
  }
};

const initialState = loadUser();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isAdmin = user.role === "admin";
      state.status = "succeeded";
      state.error = null;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    loginFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.status = "idle";
      state.error = null;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    registerStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    registerSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isAdmin = user.role === "admin";
      state.status = "succeeded";
      state.error = null;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    registerFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.status = "loading";
    },
    updateUserSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.status = "succeeded";

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    updateUserFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

// Thunk for login
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());

    // For demo purposes, we'll simulate a successful login
    // In a real app, you would make an API call here
    const { email, password } = credentials;

    // Simple validation
    if (email === "admin@atku.com" && password === "admin123") {
      // Admin user
      const userData = {
        id: "1",
        name: "Admin User",
        email: "admin@atku.com",
        role: "admin",
      };

      dispatch(
        loginSuccess({
          user: userData,
          token: "demo-token-admin-123",
        })
      );

      return { success: true };
    } else if (email === "user@example.com" && password === "user123") {
      // Regular user
      const userData = {
        id: "2",
        name: "Regular User",
        email: "user@example.com",
        role: "customer",
      };

      dispatch(
        loginSuccess({
          user: userData,
          token: "demo-token-user-123",
        })
      );

      return { success: true };
    } else {
      dispatch(loginFailure("Invalid email or password"));
      return { success: false, error: "Invalid email or password" };
    }
  } catch (error) {
    dispatch(loginFailure(error.message || "Login failed"));
    return { success: false, error: error.message || "Login failed" };
  }
};

// Thunk for registration
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());

    // For demo purposes, we'll simulate a successful registration
    // In a real app, you would make an API call here
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: "customer", // Default role for new users
    };

    dispatch(
      registerSuccess({
        user: newUser,
        token: `demo-token-${Date.now()}`,
      })
    );

    return { success: true };
  } catch (error) {
    dispatch(registerFailure(error.message || "Registration failed"));
    return { success: false, error: error.message || "Registration failed" };
  }
};

export default authSlice.reducer;
