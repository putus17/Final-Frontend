import api from '../lib/api';
import axios from 'axios';
import type {

  DzongkhagUpdateType,
  DzongkhagResponse,
  CreateUpdateDzongkhagResponse,
} from '../types';

// Create Dzongkhag
export const createDzongkhagApi = async (
  payload: DzongkhagUpdateType
): Promise<CreateUpdateDzongkhagResponse> => {
  try {
    const { data } = await api.post<CreateUpdateDzongkhagResponse>('/dzongkhag', payload);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to create dzongkhag';
    }
    throw error;
  }
};

// Get all dzongkhags with filters
export const getDzongkhagsApi = async (
): Promise<DzongkhagResponse> => {
  try {
    const { data } = await api.get('/dzongkhag');
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to fetch dzongkhags';
    }
    throw error;
  }
};

// Update dzongkhag
export const updateDzongkhagApi = async (
  payload: DzongkhagUpdateType
): Promise<CreateUpdateDzongkhagResponse> => {
  try {
    const { _id, ...updateData } = payload;
    const { data } = await api.patch<CreateUpdateDzongkhagResponse>(`/dzongkhag/${_id}`, updateData);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to update dzongkhag';
    }
    throw error;
  }
};

// Delete dzongkhag
export const deleteDzongkhagApi = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<{ message: string }>(`/dzongkhag/${id}`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Failed to delete dzongkhag';
    }
    throw error;
  }
};
