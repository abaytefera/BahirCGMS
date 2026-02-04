import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { HiLocationMarker, HiSearch, HiX, HiRefresh, HiExclamationCircle } from "react-icons/hi";
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
  const API_KEY = "pk.ffdc0ce5fa9af4ba1b08964d6a81174b"; 

  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationDetails, setLocationDetails] = useState({ sub_city: "", woreda: "" });
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  
  const searchTimeout = useRef(null);

  const translations = {
    ENG: { 
      detecting: "Locating...", 
      placeholder: "Search City / Woreda", 
      mapInstruction: "Click map to move pin",
      denied: "Location access denied. Please enable it in browser settings." 
    },
    AMH: { 
      detecting: "በመፈለግ ላይ...", 
      placeholder: "ከተማ / ወረዳ ይፈልጉ", 
      mapInstruction: "ቦታ ለመምረጥ ካርታውን ይጫኑ",
      denied: "የቦታ መረጃ አልተፈቀደም። እባክዎ በብሮውዘር ቅንብር ይፍቀዱ።"
    },
  };
  const t = translations[Language] || translations.ENG;

  /* ================= CORE LOGIC ================= */

  const updateStatesFromData = (data, lat, lon) => {
    const addr = data.address || {};
    const subCity = addr.suburb || addr.city_district || addr.county || "";
    const woreda = addr.neighbourhood || addr.quarter || addr.hamlet || "";
    const city = addr.city || addr.town || "";
    
    const displayAddr = data.display_name || [woreda, subCity, city].filter(Boolean).join(", ");
    
    setAddress(displayAddr);
    setLocationDetails({ sub_city: subCity, woreda });

    if (onLocationSelect) {
      onLocationSelect({
        sub_city: subCity,
        woreda: woreda,
        latitude: lat,
        longitude: lon,
        display_name: displayAddr
      });
    }
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lng}&format=json`);
      const data = await res.json();
      updateStatesFromData(data, lat, lng);
    } catch (e) {
      setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  };

  const requestLocation = () => {
    setLoading(true);
    setPermissionError(false);
    
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        await reverseGeocode(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === 1) {
          setPermissionError(true);
        }
        // Fallback to Kirkos ONLY if no position exists yet
        if(!position) {
            const fallback = [9.0016, 38.7542];
            setPosition(fallback);
            reverseGeocode(fallback[0], fallback[1]);
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => { requestLocation(); }, []);

  /* ================= SEARCH LOGIC ================= */

  const handleSearch = (val) => {
    setAddress(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    
    if (val.length < 3) {
      setSuggestions([]);
      return;
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${val}&format=json`);
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
        setShowSuggestions(true);
      } catch (e) {
        setSuggestions([]);
      }
    }, 600);
  };

  const selectSuggestion = (item) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    setPosition([lat, lon]);
    updateStatesFromData(item, lat, lon);
    setShowSuggestions(false);
    setShowMap(true);
  };

  /* ================= MAP HELPERS ================= */

  function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => { if (center) map.setView(center, 16); }, [center]);
    return null;
  }

  function MapEvents() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        reverseGeocode(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  return (
    <div className="w-full">
      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          value={loading ? t.detecting : address}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={t.placeholder}
          className={`w-full bg-gray-50 border rounded-xl py-3 px-4 pr-20 text-sm outline-none transition-all ${
            permissionError ? 'border-amber-400 ring-1 ring-amber-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
          }`}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          {address && !loading && (
             <button onClick={() => {setAddress(""); setSuggestions([]);}} className="p-2 text-gray-400"><HiX/></button>
          )}
          <button type="button" onClick={requestLocation} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            <HiRefresh className={loading ? "animate-spin" : ""} />
          </button>
          <button type="button" onClick={() => setShowMap(!showMap)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
            <HiLocationMarker className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestions List */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-[2000] w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
            {suggestions.map((s, i) => (
              <div 
                key={i} 
                onClick={() => selectSuggestion(s)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm border-b last:border-0 flex items-center gap-2"
              >
                <HiSearch className="text-gray-400"/>
                <span className="truncate">{s.display_name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Permission Error Message */}
      {permissionError && (
        <div className="mt-2 flex items-center gap-2 text-amber-600 text-[11px] bg-amber-50 p-2 rounded-lg">
          <HiExclamationCircle className="w-4 h-4 flex-shrink-0" />
          <span>{t.denied}</span>
        </div>
      )}

      {showMap && position && (
        <div className="mt-3 h-64 rounded-xl overflow-hidden border relative">
          <MapContainer center={position} zoom={15} style={{ height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={position} />
            <Marker position={position} />
            <MapEvents />
          </MapContainer>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[1000] bg-black/70 text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
            {t.mapInstruction}
          </div>
        </div>
      )}
    </div>
  );
}