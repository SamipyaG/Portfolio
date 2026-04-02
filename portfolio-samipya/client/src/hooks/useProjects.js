import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import toast from 'react-hot-toast';

const QUERY_KEY = ['projects'];

export const useProjects = (params = {}) =>
  useQuery({
    queryKey: [...QUERY_KEY, params],
    queryFn: async () => {
      const res = await api.get('/projects', { params });
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/projects', data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Project created!');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create project'),
  });
};

export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/projects/${id}`, data).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Project updated!');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update project'),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Project deleted');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete project'),
  });
};
