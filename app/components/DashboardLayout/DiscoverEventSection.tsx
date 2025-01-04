import { ForwardOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import { useRouter } from "next/navigation";

interface PropsI {
  title: string;
  uri?: string;
  children: React.ReactNode;
  titleClass?: string;  // Add the optional titleClass prop
  style?: React.CSSProperties; 
}

const EventSection: React.FC<PropsI> = ({ title, uri, children, titleClass = 'font-bricolage-grotesque font-semibold text-2xl mb-6', style }) => {
  const childrenArray = React.Children.toArray(children);
  const limitedChildren = childrenArray.slice(0, 5); // Get the first 6 children
  const router = useRouter();


  // Type for custom styles in react-select


  return (
    <section>
    <div className="flex items-center justify-between mb-8">
      <h2 className={`${titleClass} text-xl md:text-2xl `} style={style}>{title}</h2>

      {/* {uri && (
        <Link href={uri} className="font-bricolage-grotesque font-semibold text-OWANBE_PRY">
          See More {<ForwardOutlined />}
        </Link>
      )} */}
    </div>
    <div className="flex gap-4 overflow-x-auto">{limitedChildren}</div>
  </section>
);
};

export default EventSection;
