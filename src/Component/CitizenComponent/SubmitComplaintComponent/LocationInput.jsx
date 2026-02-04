import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { HiLocationMarker, HiSearch, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import L from "leaflet";

/* ================= FIX LEAFLET ICON ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function LocationInput({ label, required, name, onLocationSelect }) {
  const { Language } = useSelector((state) => state.webState || { Language: "ENG" });

  // YOUR ACCESS TOKEN INTEGRATED HERE
  const API_KEY = "pk.ffdc0ce5fa9af4ba1b08964d6a81174b"; 

  /* ================= STATES ================= */
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationDetails, setLocationDetails] = useState({ sub_city: "", woreda: "" });
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const searchTimeout = useRef(null);

  /* ================= TRANSLATIONS ================= */
  const translations = {
    ENG: { 
        detecting: "Detecting location...", 
        placeholder: "Search City / Woreda", 
        mapInstruction: "Click on map to select your location" 
    },
    AMH: { 
        detecting: "ቦታዎን በመፈለግ ላይ...", 
        placeholder: "ከተማ / ወረዳ ይፈልጉ", 
        mapInstruction: "ቦታ ለመምረጥ ካርታ ጠቅ ያድርጉ" 
    },
  };

  const t = translations[Language] || translations.ENG;

  /* ================= HELPERS ================= */

  const updateStatesFromData = (data) => {
    const addr = data.address || {};
    // LocationIQ mapping for Ethiopia/Addis Ababa
    const subCity = addr.suburb || addr.city_district || addr.county || "";
    const woreda = addr.neighbourhood || addr.quarter || addr.hamlet || addr.road || "";
    const city = addr.city || addr.town || addr.village || "";
    
    const displayAddr = data.display_name || [woreda, subCity, city].filter(Boolean).join(", ");
    
    setAddress(displayAddr);
    const details = { sub_city: subCity, woreda };
    setLocationDetails(details);

    // Update parent form state
    if (onLocationSelect) {
      onLocationSelect({
        ...details,
        latitude: data.lat,
        longitude: data.lon,
        display_name: displayAddr
      });
    }
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      // FIXED: Using LocationIQ to bypass 403 Forbidden
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      updateStatesFromData(data);
    } catch (e) {
      setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    }
  };

  const fallbackLocation = async () => {
    const fallback = [9.0016, 38.7542]; // Addis Ababa coordinates
    setPosition(fallback);
    await reverseGeocode(fallback[0], fallback[1]);
    setLoading(false);
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    if (!navigator.geolocation) {
      fallbackLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setPosition([lat, lng]);
        await reverseGeocode(lat, lng);
        setLoading(false);
      },
      (error) => {
        fallbackLocation();
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }, []);

  /* ================= SEARCH LOGIC ================= */

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      if (value.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        // FIXED: Using LocationIQ Search API
        const res = await fetch(
          `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${value}&format=json`
        );
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
        setShowSuggestions(true);
      } catch (e) {
        setSuggestions([]);
      }
    }, 600);
  };

  const handleSelectSuggestion = (item) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    setPosition([lat, lng]);
    updateStatesFromData(item);
    setShowSuggestions(false);
    setShowMap(true);
  };

  /* ================= MAP COMPONENTS ================= */

  function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
      if (center) map.setView(center, 16);
    }, [center, map]);
    return null;
  }

  function MapEvents() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        reverseGeocode(lat, lng);
      },
    });
    return null;
  }

  /* ================= RENDER ================= */
  return (
    <div className="w-full">
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {/* Form Inputs */}
        <input type="hidden" name="latitude" value={position?.[0] || ""} />
        <input type="hidden" name="longitude" value={position?.[1] || ""} />
        <input type="hidden" name="sub_city" value={locationDetails.sub_city} />
        <input type="hidden" name="woreda" value={locationDetails.woreda} />
        <input type="hidden" name={name} value={address} />

        <input
          type="text"
          value={loading ? t.detecting : address}
          onChange={handleInputChange}
          onFocus={() => address.length >= 3 && setShowSuggestions(true)}
          placeholder={t.placeholder}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl
                     py-3.5 pl-4 pr-12 text-sm font-bold text-slate-800
                     focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {address && (
              <button 
                type="button" 
                onClick={() => { setAddress(""); setSuggestions([]); }}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <HiX className="w-5 h-5" />
              </button>
          )}
          <button
            type="button"
            onClick={() => setShowMap((s) => !s)}
            className="p-2 rounded-xl bg-emerald-50 text-emerald-600
                       hover:bg-emerald-600 hover:text-white transition"
          >
            <HiLocationMarker className="w-6 h-6" />
          </button>
        </div>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <>
            <div className="fixed inset-0 z-[1999]" onClick={() => setShowSuggestions(false)} />
            <div className="absolute z-[2000] w-full mt-2 bg-white border border-gray-100 
                            rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSuggestion(item)}
                  className="px-4 py-3 hover:bg-emerald-50 cursor-pointer text-sm 
                             text-slate-700 border-b last:border-0 flex items-center gap-3"
                >
                  <HiSearch className="text-gray-300 flex-shrink-0" />
                  <span className="truncate">{item.display_name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Map */}
      {showMap && position && (
        <div className="mt-4 h-72 w-full rounded-3xl overflow-hidden border shadow-xl relative z-0">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={position} />
            <Marker position={position} />
            <MapEvents />
          </MapContainer>

          <div className="absolute bottom-0 left-0 right-0 bg-emerald-600/90 backdrop-blur-sm
                          text-white text-[10px] font-black uppercase
                          tracking-widest text-center py-3 z-[1000]">
            {t.mapInstruction}
          </div>
        </div>
      )}
    </div>
  );
}