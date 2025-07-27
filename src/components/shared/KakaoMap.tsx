import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  setCustomValue?: (id: string, value: number) => void;
  isDetailPage?: boolean;
}

const KakaoMap = ({
  latitude,
  longitude,
  setCustomValue,
  isDetailPage = false,
}: KakaoMapProps) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao?.maps?.load) {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    }
  }, []);

  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    if (!setCustomValue || isDetailPage) return;
    setCustomValue('latitude', mouseEvent.latLng.getLat());
    setCustomValue('longitude', mouseEvent.latLng.getLng());
  };

  if (!isMapLoaded) return null;

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
