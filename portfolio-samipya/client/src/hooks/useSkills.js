import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import toast from 'react-hot-toast';

const QK = ['skills'];

export const useSkills = () =>
  useQuery({
    queryKey: QK,
    queryFn: () => api.get('/skills').then((r) => r.data.data),
    staleTime: 1000 * 60 * 5,
  });

export const useCreateSkill = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/skills', data).then((r) => r.data.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QK }); toast.success('Skill added!'); },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to add skill'),
  });
};

export const useUpdateSkill = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/skills/${id}`, data).then((r) => r.data.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QK }); toast.success('Skill updated!'); },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update skill'),
  });
};

export const useDeleteSkill = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/skills/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QK }); toast.success('Skill removed'); },
    onError: () => toast.error('Failed to delete skill'),
  });
};
