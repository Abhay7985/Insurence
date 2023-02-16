import React, { forwardRef } from "react";
import GoogleMapReact from "google-map-react";
const GoogleMap = forwardRef((props: any, refs: any) => {
  console.log(props.defaultCenter.latitude);
  
  return <GoogleMapReact
    ref={refs}
    bootstrapURLKeys={{
      key: "AIzaSyDL3YG2rrntEN8bLoQtln4K26PeNiBklDU",
      libraries: ['places']
    }}
    defaultCenter={{ lat: props?.defaultCenter?.latitude, lng: props?.defaultCenter?.longitude }}
    center={{ lat: props?.defaultCenter?.latitude, lng: props?.defaultCenter?.longitude }}
    zoom={10}
    defaultZoom={props.defaultZoom}
    onZoomAnimationEnd={props.onZoomAnimationEnd}
    onDrag={props.onDrag}
    onGoogleApiLoaded={props.onGoogleApiLoaded}

  >


  </GoogleMapReact>
})
export default React.memo(GoogleMap)