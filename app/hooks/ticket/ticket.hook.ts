import { GET_EVENT_TICKETS, GET_SINGLE_TICKET } from "@/app/utils/constants";
import { API_SERVICE } from "@/app/utils/service";
import { useQuery } from "@tanstack/react-query";



export const useGetEventTickets = (id: string) => {
  const getTickets = useQuery({
    queryKey: [GET_EVENT_TICKETS, id],
    queryFn: () => {
      if (id) {
        return API_SERVICE._getAllEventTickets(id);
      }
    },
  });
  return { getTickets };
}

export const useGetSingleTicket = (id: string) => {
  const getSingleTicket = useQuery({
    queryKey: [GET_SINGLE_TICKET, id],
    queryFn: () => API_SERVICE._getSingleTicket(id),
  });
  return { getSingleTicket };
}

