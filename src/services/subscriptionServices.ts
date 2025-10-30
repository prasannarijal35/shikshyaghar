"use client";
import { SubscriptionType } from "@/types/subscription";
import myAxios from "./apiServices";

const useSubscriptionService = () => {
  const getAll = async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    teacherName?: string;
    subjectName?: string;
  }): Promise<{
    subscriptions: SubscriptionType[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> => {
    const response = await myAxios.get("/subscriptions", { params });
    return (
      response.data.data ?? {
        subscriptions: [],
        total: 0,
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: 0,
      }
    );
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

  const getByTeacherId = async (
    page: number = 1,
    limit: number = 10,
    status?: string
  ): Promise<{
    subscriptions: SubscriptionType[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> => {
    const response = await myAxios.get("/subscriptions/teacher", {
      params: { page, limit, status },
    });
    return (
      response.data.data ?? {
        subscriptions: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
      }
    );
  };

  const create = async (
    payload: FormData | Partial<SubscriptionType>
  ): Promise<SubscriptionType> => {
    const { data } = await myAxios.post("/subscriptions", payload);
    return data.subscription;
  };

  const update = async (
    id: number,
    payload: Partial<SubscriptionType>
  ): Promise<SubscriptionType> => {
    const { data } = await myAxios.put(`/subscriptions/student/${id}`, payload);
    return data;
  };

  const updateByTeacher = async (
    id: number,
    payload: Partial<SubscriptionType>
  ): Promise<SubscriptionType> => {
    const { data } = await myAxios.put(`/subscriptions/teacher/${id}`, payload);
    return data;
  };

  // Admin updates any subscription
  const updateByAdmin = async (
    id: number,
    payload: Partial<SubscriptionType>
  ): Promise<SubscriptionType> => {
    const { data } = await myAxios.put(`/subscriptions/admin/${id}`, payload);
    return data;
  };

  const remove = async (id: number): Promise<void> => {
    await myAxios.delete(`/subscriptions/${id}`);
  };

  return {
    getAll,
    getById,
    getByStudentId,
    getByTeacherId,
    create,
    update,
    updateByTeacher,
    updateByAdmin,
    remove,
  };
};

export default useSubscriptionService;
