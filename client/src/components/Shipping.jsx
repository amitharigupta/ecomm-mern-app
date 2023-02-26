import React, { useState } from 'react'
import "../styles/shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo, savePaymentMethod } from "../actions/cartActions";
import { Country, State } from "country-state-city";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferStateWithinStationIcon  from "@material-ui/icons/TransferWithinAStation";
import Toast from "react-hot-toast";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = ({ history }) => {

  const dispatch = useDispatch();
  const {shippingInfo} = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [contact, setContact] = useState(shippingInfo.contact);

  const shippingSubmit = (e) => {
    e.prevenDefault();

    if(contact.length < 10 || contact.length > 10) {
      Toast.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pincode, contact })
    )
    history.push("/order/confirm");
  }

  return (
    <>
      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer mt-2">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form className="shippingForm" encType="multipart/form-data" onSubmit={shippingSubmit}>
            <div>
                <HomeIcon />
                <input type="text" placeholder="Address" value={address} onChanges={(e) => setAddress(e.target.value)} required />
            </div>
            <div>
                <LocationCityIcon />
                <input type="text" placeholder="City" value={city} onChanges={(e) => setCity(e.target.value)} required />
            </div>
            <div>
                <PinDropIcon />
                <input type="text" placeholder="Pincode" value={pincode} onChanges={(e) => setPincode(e.target.value)} required />
            </div>
            <div>
                <PhoneIcon />
                <input type="number" placeholder="Phone Number" value={contact} onChanges={(e) => setContact(e.target.value)} size="10" required />
            </div>
            <div>
                <PublicIcon />
                <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="">Country</option>
                  {
                    Country && Country.getAllCountries().map((item) => {
                      return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    })
                  }
                </select>
            </div>
            
            {
              country && (
                <div>
                  <TransferStateWithinStationIcon />
                  <select required value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="">State</option>
                    {
                      State && State.getStatesOfCountry(country).map((item) => {
                        return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                      })
                    }
                  </select>
                </div>
              )
            }

            <input type="submit" value={"Continue"} className="shippingBtn" disabled={state ? false: true} />
          </form>

        </div>
      </div>
    </>
  )
}

export default Shipping