import axiosClient from './axiosClient';

const photoApi = {
  getAll(params) {
    const url = '/photos';
    return axiosClient.get(url, { params });
  },

  add(payload) {
    const url = '/photos';
    return axiosClient.post(url, payload);
  },

  delete(id) {
    const url = `/photos/${id}`;
    return axiosClient.delete(url);
  },
};

export default photoApi;
