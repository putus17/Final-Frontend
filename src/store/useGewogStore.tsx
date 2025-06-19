import { create } from 'zustand';
import { toast } from 'react-toastify';
import type { GewogType, GewogUpdateType } from '../types';
import { createGewogApi, deleteGewogApi, getGewogsApi, updateGewogApi } from '../api/gewogApi';
import type { AxiosError } from 'axios';

type GewogStore = {
  gewogs: GewogType[];
  loading: boolean;
  error: string | null;

  fetchGewogs: () => Promise<void>;
  createGewog: (payload: GewogUpdateType) => Promise<void>;
  updateGewog: (id: string, payload: GewogUpdateType) => Promise<void>;
  deleteGewog: (id: string) => Promise<void>;
}

// Type guard for Axios errors
function isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
  return (error as AxiosError)?.isAxiosError === true;
}

export const useGewogStore = create<GewogStore>((set) => ({
  gewogs: [],
  loading: false,
  error: null,

  fetchGewogs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getGewogsApi();
      set({ gewogs: res.data });
    } catch (error: unknown) {
      let msg = 'Failed to fetch gewogs';
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

  createGewog: async (payload: GewogUpdateType) => {
    set({ loading: true, error: null });
    try {
      const res = await createGewogApi(payload);
      set((state) => ({
        gewogs: [...state.gewogs, res.data],
      }));
      toast.success('Gewog created successfully!');
    } catch (error: unknown) {
      let msg = 'Failed to create gewog';
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

  updateGewog: async (id: string, payload: GewogUpdateType) => {
    set({ loading: true, error: null });
    try {
      await updateGewogApi({ _id: id, ...payload });

      // ✅ Refetch to get latest list
      const res = await getGewogsApi();
      set({ gewogs: res.data });

      toast.success('Gewog updated successfully!');
    } catch (error: unknown) {
      let msg = 'Failed to update gewog';
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

  deleteGewog: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await deleteGewogApi(id);
      set((state) => ({
        gewogs: state.gewogs.filter((g) => g._id !== id),
      }));
      toast.success('Gewog deleted successfully!');
    } catch (error: unknown) {
      let msg = 'Failed to delete gewog';
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
