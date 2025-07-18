import { FC } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  setCustomValue?: (id: string, value: number) => void;
  isDetailPage?: boolean;
}

const KakaoMap: FC<KakaoMapProps> = ({
  latitude,
  longitude,
  setCustomValue,
  isDetailPage = false,
}) => {
  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    if (isDetailPage) return;
    setCustomValue!('latitude', mouseEvent.latLng.getLat());
    setCustomValue!('longitude', mouseEvent.latLng.getLng());
  };

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: '100%', height: '360px' }}
      onClick={(_, mouseEvent) => handleClick(mouseEvent)}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }} />
    </Map>
  );
};

export default KakaoMap;
