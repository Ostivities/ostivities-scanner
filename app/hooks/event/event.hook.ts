import { DISCOVERY_EVENTS, GET_EVENT, GET_ALL_USER_EVENTS, GET_EVENT_BY_UNIQUE_KEY } from "@/app/utils/constants";
import { errorFormatter, successFormatter } from "@/app/utils/helper";
import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";




export const useGetAllUserEvents = (page: number, limit: number, search?: string) => {
  const getAllUserEvents = useQuery({
    queryKey: [GET_ALL_USER_EVENTS, page, limit, search],
    queryFn: () => {
      return API_SERVICE._getAllUserEvents(page, limit, search);
    },
  });
  return { getAllUserEvents };
}

export const useGetUserEvent = (id: string) => {
  const getUserEvent = useQuery({
    queryKey: [GET_EVENT, id],
    queryFn: () => {
      return API_SERVICE._getUserEvent(id);
    },
  });
  return { getUserEvent };
};

export const useGetUserEventByUniqueKey = (id: string) => {
  const getUserEventByUniqueKey = useQuery({
    queryKey: [GET_EVENT_BY_UNIQUE_KEY, id],
    queryFn: () => {
      return API_SERVICE._getUserEventByUniqueKey(id)
    }
  })
  return { getUserEventByUniqueKey }
}


export const useGetDiscoveryEvents = (page: number, pageSize: number) => {
  const getDiscoveryEvents = useQuery({
    queryKey: [DISCOVERY_EVENTS, page, pageSize],
    queryFn: () => {
      return API_SERVICE._getDiscoveryEvents(page, pageSize);
    },
  });
  return { getDiscoveryEvents };
}
