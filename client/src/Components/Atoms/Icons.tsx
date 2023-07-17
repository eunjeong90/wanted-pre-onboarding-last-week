interface ISvgProps {
  path: string;
  viewBox: string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  strokeWidth?: string;
}
const createMaps = <ObjectMapType extends Record<string, ISvgProps>>(obj: ObjectMapType) => obj;

const ICON_BUNDLE = createMaps({
  close: {
    path: 'm12 10.586 4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z',
    viewBox: '2 2 20 20',
  },
  search: {
    path: 'm18.031 16.617 4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z',
    viewBox: '2 2 20 20',
  },
});

export type IIconType = keyof typeof ICON_BUNDLE;

interface IIconProps {
  icon: IIconType;
  size: number;
  path?: string;
  viewBox?: string;
  color: string;
}

export default function Icon({ icon, size, color, viewBox }: IIconProps) {
  const customViewBox = viewBox || ICON_BUNDLE[icon].viewBox;
  return (
    <svg
      height={size}
      fill={color}
      color={'#282828'}
      viewBox={customViewBox}
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={ICON_BUNDLE[icon].path} />
    </svg>
  );
}
