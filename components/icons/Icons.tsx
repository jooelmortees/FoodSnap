import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline, Polygon } from 'react-native-svg';
import { ViewStyle } from 'react-native';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: ViewStyle;
}

export const AppLogoIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Circle cx="32" cy="18" r="12" />
    <Rect x="10" y="34" width="44" height="20" rx="6"/>
    <Line x1="32" y1="34" x2="32" y2="54" />
  </Svg>
);

export const CameraIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <Circle cx="12" cy="13" r="4"/>
  </Svg>
);

export const UploadIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <Polyline points="17,8 12,3 7,8"/>
    <Line x1="12" y1="3" x2="12" y2="15"/>
  </Svg>
);

export const PhotoIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <Circle cx="8.5" cy="8.5" r="1.5"/>
    <Polyline points="21,15 16,10 5,21"/>
  </Svg>
);

export const PlusCircleIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Circle cx="12" cy="12" r="10"/>
    <Line x1="12" y1="8" x2="12" y2="16"/>
    <Line x1="8" y1="12" x2="16" y2="12"/>
  </Svg>
);

export const TrashIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Polyline points="3,6 5,6 21,6"/>
    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <Line x1="10" y1="11" x2="10" y2="17"/>
    <Line x1="14" y1="11" x2="14" y2="17"/>
  </Svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <Polyline points="22,4 12,14.01 9,11.01"/>
  </Svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Line x1="19" y1="12" x2="5" y2="12"/>
    <Polyline points="12,19 5,12 12,5"/>
  </Svg>
);

export const ClockIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Circle cx="12" cy="12" r="10"/>
    <Polyline points="12,6 12,12 16,14"/>
  </Svg>
);

export const UsersIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <Circle cx="9" cy="7" r="4"/>
    <Path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <Path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </Svg>
);

export const LeafIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <Path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </Svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    <Path d="M20 3v4"/>
    <Path d="M22 5h-4"/>
    <Path d="M4 17v2"/>
    <Path d="M5 18H3"/>
  </Svg>
);

export const RefreshCwIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Polyline points="23,4 23,10 17,10"/>
    <Polyline points="1,20 1,14 7,14"/>
    <Path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </Svg>
);

export const FilterIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
  </Svg>
);

export const EyeIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <Circle cx="12" cy="12" r="3"/>
  </Svg>
);

export const PackageIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <Path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <Polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
    <Line x1="12" y1="22.08" x2="12" y2="12"/>
  </Svg>
);

export const UtensilsCrossedIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <Path d="M7 2v20"/>
    <Path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/>
    <Path d="m9 9 1 1"/>
    <Path d="M15 5 9 11"/>
  </Svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <Line x1="12" y1="9" x2="12" y2="13"/>
    <Line x1="12" y1="17" x2="12.01" y2="17"/>
  </Svg>
);

export const ClipboardListIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <Circle cx="12" cy="11" r="1"/>
    <Circle cx="12" cy="16" r="1"/>
    <Circle cx="8" cy="11" r="1"/>
    <Circle cx="8" cy="16" r="1"/>
  </Svg>
);

export const UtensilsIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <Path d="M7 2v20"/>
    <Path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/>
  </Svg>
);

export const Edit3Icon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Path d="M12 20h9"/>
    <Path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Line x1="12" y1="5" x2="12" y2="19"/>
    <Line x1="5" y1="12" x2="19" y2="12"/>
  </Svg>
);

export const MinusIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = 'currentColor', style }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <Line x1="5" y1="12" x2="19" y2="12"/>
  </Svg>
);