import React, { forwardRef } from "react";
import GoogleMapReact from "google-map-react";
import { NEXT_PUBLIC_GOOGLE_API_KEY } from "../context/Provider";
const GoogleMap = forwardRef((props: any, refs: any) => {

  
  
  return <GoogleMapReact
    ref={refs}
    bootstrapURLKeys={{
      key: NEXT_PUBLIC_GOOGLE_API_KEY,
      libraries: ['places']
    }}
    defaultCenter={props?.defaultCenter}
    center={props?.center}
    zoom={props.zoom}
    defaultZoom={props.defaultZoom}
    onZoomAnimationEnd={props.onZoomAnimationEnd}
    onDrag={props.onDrag}
    onGoogleApiLoaded={props.onGoogleApiLoaded}

  >


  </GoogleMapReact>
})
export default React.memo(GoogleMap)