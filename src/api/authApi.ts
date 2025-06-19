import api from '../lib/api'
import axios from 'axios'
import type { GetUsersResponse, LoginType, RegisterResponse, AddUserType, UpdateUsersResponse, UserUpdateType } from '../types'

export const registerApi = async (
  payload: AddUserType
): Promise<RegisterResponse> => {
  try {
    const endpoint = '/users/adduser'
    const { data } = await api.post<RegisterResponse>(endpoint, payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Register error:', error.response?.data)
      throw error.response?.data || 'Registration failed'
    }
    throw error
  }
}

export const loginApi = async (payload: LoginType) => {
  try {
    const endpoint = '/users/login'
    const response = await api.post(endpoint, payload)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Login error:', error.response?.data || error.message)
      throw new Error(
        error.response?.data?.message || 'Login failed. Please try again.'
      )
    }
    console.error('Login error:', error)
    throw new Error('Login failed. Please try again.')
  }
}

export const fetchmeApi = async () => {
  const endpoint = 'users/me'
  try {
    const { data } = await api.get(endpoint)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching user information:', error.response)
      throw error.response
    } else {
      console.error('Unexpected error:', error)
      throw error
    }
  }
}

export const getUsersApi = async (): Promise<GetUsersResponse> => {
  try {
    const endpoint = '/users'
    const { data } = await api.get<GetUsersResponse>(endpoint)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Fetching user failed'
    }
    throw error
  }
}

// Update a user by ID
export const updateUserApi = async (
  id: string,
  payload: UserUpdateType
): Promise<UpdateUsersResponse> => {
  try {
    const endpoint = `/users/${id}`
    const { data } = await api.patch<UpdateUsersResponse>(endpoint, payload)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Updating user failed'
    }
    throw error
  }
}

// Delete User by ID
export const deleteUserApi = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const endpoint = `/users/${id}`
    const { data } = await api.delete<{ message: string }>(endpoint)
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Deleting user failed'
    }
    throw error
  }
}

// Get all users
export const fetchAllUsersApi = async (): Promise<GetUsersResponse> => {
  try {
    const endpoint = '/users/getall'
    const { data } = await api.get<GetUsersResponse>(endpoint)
    console.log(data, "api")
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Fetching users failed'
    }
    throw error
  }
}
