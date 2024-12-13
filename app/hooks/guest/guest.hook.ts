import { API_SERVICE } from "@/app/utils/service";
import { useQuery, } from "@tanstack/react-query";
import { GET_EVENT_GUESTS, GET_TICKET_GUESTS } from "@/app/utils/constants";



export const useGetEventGuests = (eventId: string, eventid:string) => {
    const getEventGuests = useQuery({
        queryKey: [GET_EVENT_GUESTS, eventId],
        queryFn: () => {
        return API_SERVICE._getEventGuests(eventId, eventid);
        },
    });
    return { getEventGuests };
}

export const useGetTicketGuests = (id: string) => {
    const getTicketGuests = useQuery({
        queryKey: [GET_TICKET_GUESTS, id],
        queryFn: () => {
        return API_SERVICE._getTicketGuestd(id);
        },
    });
    return { getTicketGuests };
}