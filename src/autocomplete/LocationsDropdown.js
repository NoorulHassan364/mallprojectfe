import React from "react";
// import CurrentLocationSVG from "components/svgs/CurrentLocation.svg";
// import RecentlySearched from "components/svgs/RecentlySearched.svg";
import { getMyCurrentLocation } from "./geo-location";
import { Dropdown, DropdownButton } from 'react-bootstrap';

function LocationsDropdown({ onClick = () => { }, suggestions = [] }) {
  const onMyLocationClick = async (e) => {
    e.stopPropagation();
    var res = await getMyCurrentLocation();
    if (res) {
      onClick({ description: `${res?.city}, ${res?.state}`, main: res?.city, secondary: res?.state });
    }
  }
  return (
    <div className="--location-search-res-p" tabindex="-1">
      <div className="inner py-2" style={{ border: "1px solid #e3e3e3", backgroundColor: "white", position: "absolute", zIndex: "1000", width: '97%' }}>
        {/* <ul className="--history list-group">
          <li className="list-group-item border-0 --heading cursor-pointer" onClick={onMyLocationClick}> */}
        {/* <CurrentLocationSVG className="mr-2" /> Use my current location */}
        {/* </li> */}
        {/* <li className="list-group-item border-0">
            <RecentlySearched svgProps={{ className: "mr-2" }} /> Austin ( TX,
            USA )
          </li> */}
        {/* </ul>
        <hr className="my-2" />
        <ul className="--history list-group --loc-results">
          {suggestions?.map(({ description, structured_formatting }) => {
            return (
              <li className="list-group-item border-0 cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                onClick({ description, main: structured_formatting?.main_text, secondary: structured_formatting?.secondary_text });
              }}>{description}</li>
            );
          })}
        </ul> */}
        {suggestions?.map(({ description, structured_formatting }) => {
          return (
            // <li className="list-group-item border-0 cursor-pointer" onClick={(e) => {
            //   e.stopPropagation();
            //   onClick({ description, main: structured_formatting?.main_text, secondary: structured_formatting?.secondary_text });
            // }}>{description}</li>
            <Dropdown.Item style={{ whiteSpace: 'pre-wrap', fontSize: '14px', padding: '0.5rem 1rem' }} onClick={(e) => {
              e.stopPropagation();
              onClick({ description, main: structured_formatting?.main_text, secondary: structured_formatting?.secondary_text });
            }}>{description}</Dropdown.Item>
          );
        })}
      </div>
    </div >
  );
}

export default React.memo(LocationsDropdown);