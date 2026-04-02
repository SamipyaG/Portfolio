import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useSubmitContact = () =>
  useMutation({
    mutationFn: (data) => api.post('/contact', data).then((r) => r.data),
    onSuccess: (data) => toast.success(data.message || 'Message sent!'),
    onError: (err) => {
      const msg = err.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(msg);
    },
  });

export const useMessages = () =>
  useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await api.get('/contact');
      return res.data;
    },
    staleTime: 0,
  });

export const useMarkRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.patch(`/contact/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['messages'] }),
  });
};

export const useDeleteMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/contact/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['messages'] });
      toast.success('Message deleted');
    },
    onError: () => toast.error('Failed to delete message'),
  });
};
