import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import toast from 'react-hot-toast';

const QK = ['profile'];

export const useProfile = () =>
  useQuery({
    queryKey: QK,
    queryFn: () => api.get('/profile').then((r) => r.data.data),
    staleTime: 1000 * 60 * 5,
  });

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.put('/profile', data).then((r) => r.data.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: QK }); toast.success('Profile updated!'); },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update profile'),
  });
};
