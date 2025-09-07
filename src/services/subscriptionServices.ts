"use client";

import { SubscriptionType } from "@/types/subscription";
import myAxios from "./apiServices";

const useSubscriptionService = () => {
  const getAll = async (): Promise<SubscriptionType[]> => {
    const { data } = await myAxios.get("/subscriptions");
    return data;
  };

  const getById = async (id: number): Promise<SubscriptionType> => {
    const { data } = await myAxios.get(`/subscriptions/${id}`);
    return data;
  };

  const getByStudentId = async (
    status?: string
  ): Promise<SubscriptionType[]> => {
    const response = await myAxios.get("/subscriptions/student", {
      params: { status },
    });
    return response.data.data ?? [];
  };

  const create = async (payload: FormData): Promise<SubscriptionType> => {
    const { data } = await myAxios.post("/subscriptions", payload);
    return data;
  };

  const update = async (
    id: number,
    payload: Partial<SubscriptionType>
  ): Promise<SubscriptionType> => {
    const { data } = await myAxios.put(`/subscriptions/${id}`, payload);
    return data;
  };

  const remove = async (id: number): Promise<void> => {
    await myAxios.delete(`/subscriptions/${id}`);
  };

  return { getAll, getById, getByStudentId, create, update, remove };
};

export default useSubscriptionService;
