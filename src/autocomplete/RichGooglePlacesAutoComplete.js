import React from 'react'
import { getAutoCompleteRes } from './geo-location';
// import {LocationsDropdown} from './LocationsDropdownLocationsDropdown';
import LocationsDropdown from './LocationsDropdown';
// import "assets/styles/components/--rich-places-autocomplete.scss";
// import SelectBoxDropDownSvg from "components/svgs/SelectBoxDownArrow.svg";

// const usCountiesArray = require('assets/json/us-counties.json');

function structureUsCounties(counties) {
    return counties.map((county) => {
        return {
            description: `${county?.NAME}, ${county?.STATE_NAME}, USA`,
            structured_formatting: {
                main_text: county?.NAME,
                secondary_text: `${county?.STATE_NAME}, USA`
            }
        }
    });
}

function RichGooglePlacesAutoComplete(props) {
    const { defaultValue, inputProps, onLocationSelect, placeholder = 'Search and select location', autoWidth = false, showChangeCity = false } = props;
    const [value, setValue] = React.useState('');
    const [locationPredections, setLocationPredections] = React.useState([]);
    const [usCountiesPredections, setUsCountiesPredections] = React.useState([]);
    const [showDropDown, setShowDropDown] = React.useState(false);

    console.log('locationPredections456', [...locationPredections])
    console.log('usCountiesPredections456', [...usCountiesPredections])

    // handlers
    // React.useEffect(() => {
    //     const newCounties = structureUsCounties(usCountiesArray.splice(0, 30));
    //     // debugger;
    //     setUsCountiesPredections(newCounties);
    // }, []);

    // React.useEffect(() => {
    //     const filteredCounties = usCountiesArray.filter((county) => {
    //         const description = `${county?.NAME}, ${county?.STATE_NAME}`
    //         return description?.includes(value);
    //     }).splice(0, 30);
    //     setUsCountiesPredections(structureUsCounties(filteredCounties));
    // }, [value]);

    const handleOnChange = async (e) => {
        const loc = e?.target?.value;
        setValue(loc);
        if (!loc) {
            setLocationPredections([]);
            return;
        }
        var predections = await getAutoCompleteRes(loc);
        setLocationPredections(predections);
    }

    React.useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleOnSelect = (comp) => {
        const { description } = comp;
        setValue(description);
        setShowDropDown(false);
        typeof onLocationSelect === 'function' && onLocationSelect(comp);
    }
    const bVal = value?.length >= "Search location".length ? value : 'Search location';

    console.log(usCountiesPredections, 'usCountiesPredections');
    return (
        <div className={`--rich-places-autocomplete ${autoWidth ? '--auto-resize' : ''}`} data-val={bVal}>
            {
                showChangeCity ? <div className="--city-p d-flex justify-content-end align-items-center" style={{
                    position: 'absolute',
                    top: -15, left: 0,
                }}>
                    {/* <SelectBoxDropDownSvg
                        width={12.409}
                        height={7.314}
                    /> */}
                    <span className="--text ml-2">Change City</span>
                </div> : null
            }
            <input type="text" className="autoCompleteInput" autoComplete='off'  style={{ opacity: 1, padding: '0.375rem 0.75rem' }} value={value} placeholder={placeholder} onFocus={() => {
                setShowDropDown(true);
            }} onBlur={(e) => {
                if (!e.relatedTarget) {
                    setShowDropDown(false);
                }
            }} onChange={handleOnChange} {...inputProps} />
            {
                showDropDown ? <LocationsDropdown
                    suggestions={[...usCountiesPredections, ...locationPredections,]}
                    onClick={handleOnSelect}
                /> : null
            }
        </div>
    )
}

export default React.memo(RichGooglePlacesAutoComplete);