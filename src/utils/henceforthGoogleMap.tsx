import React, { forwardRef } from "react";
import GoogleMapReact from "google-map-react";
const GoogleMap = forwardRef((props: any, refs: any) => {
  return <GoogleMapReact
    ref={refs}
    bootstrapURLKeys={{
      key: "AIzaSyDL3YG2rrntEN8bLoQtln4K26PeNiBklDU",
      libraries: ['places']
    }}
    defaultCenter={props.defaultCenter}
    center={props.center}
    zoom={props.zoom}
    defaultZoom={props.defaultZoom}
    onZoomAnimationEnd={props.onZoomAnimationEnd}
    onDrag={props.onDrag}
    onGoogleApiLoaded={props.onGoogleApiLoaded}
  >
  </GoogleMapReact>
})
export default React.memo(GoogleMap)