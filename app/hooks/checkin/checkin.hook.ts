import { API_SERVICE } from "@/app/utils/service";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { CREATE_CHECK_IN_SCANNER, GET_GUEST_INFO_SCANNERS, CHECK_IN_GUEST } from "@/app/utils/constants";
import { ICheckInData, ICheckInGuest,} from "@/app/utils/interface";
import { AxiosError, AxiosResponse } from "axios";
import { errorFormatter, successFormatter } from "@/app/utils/helper";
import { jwtDecode } from "jwt-decode";


export const useCreateCheckInScanner = () => {
    const createCheckInScanner = useMutation({
        mutationFn: (data: ICheckInData) => {
        return API_SERVICE._createCheckInScanner(data);
        },
        mutationKey: [CREATE_CHECK_IN_SCANNER],
        onSuccess: (data: AxiosResponse) => {
            if (data) {
              const accessToken = data?.data?.data?.accessToken;
              const decoded = jwtDecode(accessToken);
              sessionStorage.setItem("userData", JSON.stringify(decoded));
              sessionStorage.setItem("token", accessToken);
              sessionStorage.setItem("tokenTimestamp", Date.now().toString());
              localStorage.setItem("token", accessToken);
              // localStorage.setItem()
              localStorage.setItem("tokenTimestamp", Date.now().toString());
            }
        },
        onError: (error: AxiosError | any) => {
        errorFormatter(error);
        }
    });
    return { createCheckInScanner };
}

export const useGetGuestInfoScanners = (event_id: string, guest_id: string, ticket_id: string) => {
    const getGuestInfoScanners = useQuery({
        queryKey: [GET_GUEST_INFO_SCANNERS, event_id, guest_id, ticket_id],
        enabled: !!event_id || !!ticket_id || !!guest_id,
        queryFn: () => {
            return API_SERVICE._getGuestInfoScanner(event_id, guest_id, ticket_id);
        },
    });
    return { getGuestInfoScanners };
}

export const useCheckInGuest = () => {
    const checkInGuest = useMutation({
        mutationFn: (data: ICheckInGuest) => {
        return API_SERVICE._checkInGuestScanner(data);
        },
        mutationKey: [CHECK_IN_GUEST],
        onSuccess: (data: AxiosResponse) => {
        successFormatter(data);
        },
        onError: (error: AxiosError | any) => {
        errorFormatter(error);
        }
    });
    return { checkInGuest };
}