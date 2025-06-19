import api from '../lib/api';
import axios from 'axios';
import type { CreateUpdateGewogResponse, GewogResponse, GewogUpdateType } from '../types';


// Create Gewpg
export const createGewogApi = async (
  payload: GewogUpdateType
): Promise<CreateUpdateGewogResponse> => {
  try {
    const { data } = await api.post<CreateUpdateGewogResponse>('/gewog', payload);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to create gewog';
    }
    throw error;
  }
};

// Get all Gewog with filters
export const getGewogsApi = async (
): Promise<GewogResponse> => {
  try {
    const { data } = await api.get('/gewog');
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to fetch gewogs';
    }
    throw error;
  }
};

// Update Gewog
export const updateGewogApi = async (
  payload: GewogUpdateType
): Promise<CreateUpdateGewogResponse> => {
  try {
    const { _id, ...updateData } = payload;
    const { data } = await api.patch<CreateUpdateGewogResponse>(`/gewog/${_id}`, updateData);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to update gewog';
    }
    throw error;
  }
};

// Delete Gewog
export const deleteGewogApi = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<{ message: string }>(`/gewog/${id}`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to delete Gewog';
    }
    throw error;
  }
};
