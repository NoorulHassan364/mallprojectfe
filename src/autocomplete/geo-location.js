// import { ToastAlert } from "./swal.utils";
import ExceptionHandler from "./index";

export const getFormatedAddressDetails = (
  addressDetails,
  loc = "",
  useSmallName = false
) => {
  try {
    if (addressDetails && typeof addressDetails !== "object") {
      throw new Error("Invalid address details");
    }
    const { geometry, address_components, formatted_address } = addressDetails;
    function getRequiredComponents(components) {
      var country, state, city;
      for (let index = 0; index < components.length; index++) {
        const component = components[index];
        const cTypes = component.types || [];
        if (cTypes.includes("country")) {
          country = useSmallName ? component.short_name : component.long_name;
        }
        if (cTypes.includes("administrative_area_level_1")) {
          state = useSmallName ? component.short_name : component.long_name;
        }
        if (cTypes.includes("administrative_area_level_2")) {
          city = component.long_name;
        }
      }
      return { country, state, city };
    }
    var formatedComponnets = getRequiredComponents(address_components);
    var geoLocation = geometry?.location;
    // debugger;
    var finalRes = {
      latitude:
        typeof geoLocation?.lat === "function"
          ? geoLocation?.lat()
          : geoLocation?.lat,
      longitude:
        typeof geoLocation?.lng === "function"
          ? geoLocation?.lng()
          : geoLocation?.lng,
      ...formatedComponnets,
      location: loc || formatted_address,
    };
    return finalRes;
  } catch (error) {
    ExceptionHandler(error);
  }
};

export const getMyCurrentLocation = () => {
  try {
    return new Promise((resolve, reject) => {
      function getLocation(cb) {
        if (navigator.geolocation) {
          function reverseGeoCode(pos) {
            const lat = pos?.coords?.latitude;
            const lng = pos?.coords?.longitude;
            getReverseGeocodingData(lat, lng)
              .then((results) => {
                const res = getFormatedAddressDetails(results?.[0], "", true);
                cb(res);
              })
              .catch((err) => {
                reject(false);
                ExceptionHandler(err);
              });
          }
          navigator.geolocation.getCurrentPosition(
            reverseGeoCode,
            // handleLocationExeption
          );
        } else {
          throw new Error("Geolocation is not supported by this browser.");
        }
      }
      getLocation((res) => {
        console.log(res, "res");
        resolve(res);
      });
    });
  } catch (error) {
    ExceptionHandler(error);
  }
};

// const handleLocationExeption = (err) => {
//   // eslint-disable-next-line default-case
//   switch (err.code) {
//     case err.PERMISSION_DENIED:
//       ToastAlert(
//         "You have denied/blocked the request for Geolocation.",
//         "error"
//       );
//       break;
//     case err.POSITION_UNAVAILABLE:
//       ToastAlert("Location information is unavailable.", "error");
//       break;
//     case err.TIMEOUT:
//       ToastAlert("The request to get user location timed out.", "error");
//       break;
//     case err.UNKNOWN_ERROR:
//       ToastAlert("An unknown error occurred.", "error");
//       break;
//   }
// };

function getReverseGeocodingData(lat, lng) {
  return new Promise((resolve, reject) => {
    const alreadyEixting = getResulstsFromLocalStorage(lat, lng);
    if (alreadyEixting) {
      resolve(alreadyEixting?.results);
      return;
    }
    var latlng = new window.google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ latLng: latlng }, function (results, status) {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        reject(status);
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == window.google.maps.GeocoderStatus.OK) {
        saveLatLongToLocalStorage(lat, lng, results);
        resolve(results);
      }
    });
  });
}

async function saveLatLongToLocalStorage(lat, lng, results) {
  const existing = getAllSavedResulstsFromLocalStorage();
  var all = [];
  const nE = {
    lat,
    lng,
    results,
  };
  all = [nE].concat(existing);

  if (
    !existing.some(
      ({ lat: oldLat, lng: oldLng }) => oldLat === lat && oldLng === lng
    )
  ) {
    localStorage.setItem(
      "--mae-geolocations-resulsts-by-lt-lng",
      JSON.stringify(all)
    );
  }
}

function getResulstsFromLocalStorage(lat, lng) {
  const existing = getAllSavedResulstsFromLocalStorage();
  return existing.find(
    ({ lat: oldLat, lng: oldLng }) => oldLat === lat && oldLng === lng
  );
}

function getAllSavedResulstsFromLocalStorage() {
  var res = localStorage.getItem("--mae-geolocations-resulsts-by-lt-lng");
  return res ? JSON.parse(res) : [];
}


export function getAutoCompleteRes(input) {
  try {
    return new Promise((resolve, reject) => {
      // This is making the Geocode request
      var autoCompleteService =
        new window.google.maps.places.AutocompleteService();
      autoCompleteService.getPlacePredictions(
        {
          input: input,
          // componentRestrictions: { country: "pakistan" },
          types: ['(regions)']
        },
        function (results, status) {
          if (status !== "OK") {
            reject(status);
          }
          // This is checking to see if the Geoeode Status is OK before proceeding
          if (status === "OK") {
            resolve(results);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
}
