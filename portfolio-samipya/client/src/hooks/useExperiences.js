import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import toast from 'react-hot-toast';

const QK = ['experiences'];

export const useExperiences = () =>
  useQuery({
    queryKey: QK,
    queryFn: () => api.get('/experiences').then((r) => r.data.data),
    staleTime: 1000 * 60 * 5,
  });

export const useCreateExperience = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/experiences', data).then((r) => r.data.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QK }); toast.success('Experience added!'); },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to add experience'),
  });
};

export const useUpdateExperience = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/experiences/${id}`, data).then((r) => r.data.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QK }); toast.success('Experience updated!'); },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update'),
  });
};

export const useDeleteExperience = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/experiences/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QK }); toast.success('Experience deleted'); },
    onError: () => toast.error('Failed to delete'),
  });
};
