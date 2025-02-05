import { useEffect, useRef } from "react";

const GoogleMap = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (window.google) {
        new window.google.maps.Map(mapRef.current, {
          zoom: 8,
          center: { lat, lng },
        });
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, [lat, lng]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>;
};

export default GoogleMap;
