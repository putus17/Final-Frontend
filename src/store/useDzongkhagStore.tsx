import { create } from 'zustand';
import { toast } from 'react-toastify';
import type { DzongkhagType, DzongkhagUpdateType } from '../types';
import {
  createDzongkhagApi,
  deleteDzongkhagApi,
  getDzongkhagsApi,
  updateDzongkhagApi,
} from '../api/dzongkhagApi';
import type { AxiosError } from 'axios';

type DzongkhagStore = {
  dzongkhags: DzongkhagType[];
  loading: boolean;
  error: string | null;

  fetchDzongkhags: () => Promise<void>;
  createDzongkhag: (payload: DzongkhagUpdateType) => Promise<void>;
  updateDzongkhag: (id: string, payload: DzongkhagUpdateType) => Promise<void>;
  deleteDzongkhag: (id: string) => Promise<void>;
}

// Type guard to check if error is AxiosError
function isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
  return (error as AxiosError)?.isAxiosError === true;
}

export const useDzongkhagStore = create<DzongkhagStore>((set) => ({
  dzongkhags: [],
  loading: false,
  error: null,

  fetchDzongkhags: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getDzongkhagsApi();
      set({ dzongkhags: res.data });
    } catch (error: unknown) {
      let msg = 'Failed to fetch dzongkhags';
      if (isAxiosError(error)) {
        msg = error.response?.data?.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg);
      set({ error: msg });
    } finally {
      set({ loading: false });
    }
  },

  createDzongkhag: async (payload: DzongkhagUpdateType) => {
    set({ loading: true, error: null });
    try {
      const res = await createDzongkhagApi(payload);
      set((state) => ({
        dzongkhags: [...state.dzongkhags, res.data],
      }));
      toast.success('Dzongkhag created successfully!');
    } catch (error: unknown) {
      let msg = 'Failed to create dzongkhag';
      if (isAxiosError(error)) {
        msg = error.response?.data?.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg);
      set({ error: msg });
    } finally {
      set({ loading: false });
    }
  },

  updateDzongkhag: async (id: string, payload: DzongkhagUpdateType) => {
    set({ loading: true, error: null });
    try {
      const res = await updateDzongkhagApi({ _id: id, ...payload });
      set((state) => ({
        dzongkhags: state.dzongkhags.map((dz) =>
          dz._id === id ? res.data : dz
        ),
      }));
      toast.success('Dzongkhag updated successfully!');
    } catch (error: unknown) {
      let msg = 'Failed to update dzongkhag';
      if (isAxiosError(error)) {
        msg = error.response?.data?.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg);
      set({ error: msg });
    } finally {
      set({ loading: false });
    }
  },

  deleteDzongkhag: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await deleteDzongkhagApi(id);
      set((state) => ({
        dzongkhags: state.dzongkhags.filter((dz) => dz._id !== id),
      }));
      toast.success('Dzongkhag deleted successfully!');
    } catch (error: unknown) {
      let msg = 'Failed to delete dzongkhag';
      if (isAxiosError(error)) {
        msg = error.response?.data?.message || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg);
      set({ error: msg });
    } finally {
      set({ loading: false });
    }
  },
}));
