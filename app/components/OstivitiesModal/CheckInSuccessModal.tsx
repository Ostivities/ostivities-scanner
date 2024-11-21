"use client";

import { IModal } from "@/app/utils/interface";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useCookies } from "react-cookie";

const CheckInSuccessModal = ({
  open,
  onCancel,
  onClose,
  onOk = () => {},  // Provide a fallback empty function for `onOk`
}: IModal): JSX.Element => {
  const router = useRouter();
  const params = useParams<{ id: string, event: string }>();
  const [cookies, setCookie, removeCookie] = useCookies(["event_id"]);

  return (
    
    <div className="fixed inset-0 bg-black/20 grid place-items-center"
      onClick={(e) => e.stopPropagation()} // prevent clicks outside the modal from closing it
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent clicks inside the modal from bubbling up
        className="bg-white rounded-2xl px-12 py-12 lg:min-w-[33rem]"
      >
        <div className="flex justify-center">
          <div className="bg-OWANBE_NOTIFICATION rounded-full w-[4.5rem] h-[4.5rem] grid place-items-center">
            <Image
              src="/icons/success.svg"
              alt="warning"
              height={32}
              width={36}
            />
          </div>
        </div>
        <div className="mt-8 text-center">
        <h2 style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 'normal', fontSize: '1rem' }}>
  Guest checked in successfully!!
</h2>
          <div className="flex justify-center">
            <button
              onClick={() => {
                onOk();
                router.push(`/events/${params?.event}/scanner`)
              }}
              className="block primary-btn font-normal text-base mt-10 px-32"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInSuccessModal;
