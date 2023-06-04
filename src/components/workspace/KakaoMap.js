import React, { useEffect } from "react";

const KakaoMap = ({ lat, lng }) => {
  useEffect(() => {
    // Kakao 지도 API 초기화
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=42567c4583ff8d4f62709679d5e6baf1`;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        // 지도 생성
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 8,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 기타 지도에 필요한 작업 수행
        // ...
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        // 컴포넌트가 언마운트될 때 지도 삭제
        return () => {
          map && map.destroy();
        };
      });
    };
  }, [lat, lng]);

  return <div id="kakao-map" style={{ width: "100%", height: "400px" }} />;
};

export default KakaoMap;
