import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { Component, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const MapContainer = (props) => {
  const [state, setState] = useState({
    address: "",
    showingInfoWindow: false,
    activeMarker: {},
    mapCenter: {
      lat: 49.2827291,
      lng: -123.1207375,
    },
    selectedPlace: {},
  });

  const onMarkerClick = (props, marker, e) =>
    setState({
      ...state,
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  const onMapClicked = (props) => {
    if (state.showingInfoWindow) {
      setState({ ...state, showingInfoWindow: false, activeMarker: null });
    }
  };
  const handleChange = (address) => {
    setState({ ...state, address: address });
    if (address !== "") {
      document
        .getElementsByClassName("dropdown-content")[0]
        .classList.add("focus");
    } else {
      document
        .getElementsByClassName("dropdown-content")[0]
        .classList.remove("focus");
    }
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setState({ ...state, address: address, mapCenter: latLng });
      })
      .catch((error) => console.error("Error", error));
  };

  {
    return (
      <div className="mapSection">
        <PlacesAutocomplete
          value={state.address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="dropdown">
                <input
                  tabIndex={1}
                  {...getInputProps({
                    placeholder: "Yer ara ...",
                    className: "testInput",
                  })}
                />
                <div className="dropdown-content">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion, index, arr) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose

                    return (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                        style={
                          arr.length - 1 === index
                            ? null
                            : { borderBottom: "1px solid black" }
                        }

                        //   arr.length - 1 === index
                        //     ? { paddingBottom: 5 }
                        //     : suggestion.active
                        //     ? { background: "yellow" }
                        //     : {
                        //         borderBottom: "1px solid gray",
                        //         cursor: "pointer",
                        //       }
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <Map
          google={props.google}
          initialCenter={{
            lat: state.mapCenter.lat,
            lng: state.mapCenter.lng,
          }}
          center={{
            lat: state.mapCenter.lat,
            lng: state.mapCenter.lng,
          }}
        >
          <Marker
            position={{
              lat: state.mapCenter.lat,
              lng: state.mapCenter.lng,
            }}
            center={{
              lat: state.mapCenter.lat,
              lng: state.mapCenter.lng,
            }}
          />

          <InfoWindow
            marker={state.activeMarker}
            visible={state.showingInfoWindow}
          >
            <div>
              <h1>{state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyCcBwYiTxfw3qfwaoyt_OCFk79McEn3PQA",
})(MapContainer);
