import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Loader2, ChevronDown, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function FormSelect({ Icon, label, name, onChange, value }) {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/categories/public`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Fetch Failed');

        const data = await response.json();
        
        // Ensure data is an array before setting state
        if (isMounted) setCategories(Array.isArray(data) ? data : data.categories || []);
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCategories();
    return () => { isMounted = false; };
  }, []);

  // Language mapping for the "Select" placeholder
  const placeholderText = {
    ENG: "-- Select Category --",
    AMH: "-- ዘርፍ ይምረጡ --",
    ORM: "-- Filannoo Filadhu --",
    TIG: "-- ዓይነት ይምረጡ --"
  };

  // Helper to get the correct language name from your database object
  const getCategoryName = (cat) => {
    switch (Language) {
      case "AMH": return cat.nameAm || cat.name;
      case "ORM": return cat.nameOr || cat.name;
      case "TIG": return cat.nameTi || cat.name;
      default: return cat.name;
    }
  };

  return (
    <div className="w-full">
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 px-1">
        {Icon && <Icon className="inline mr-2 text-emerald-500" size={14} />} 
        {label}
      </label>
      
      <div className="relative group">
        <select 
          name={name}
          value={value}
          onChange={onChange}
          disabled={isLoading || error}
          className={`w-full bg-gray-50 border rounded-2xl py-3.5 px-4 text-sm font-bold outline-none transition-all appearance-none cursor-pointer disabled:cursor-not-allowed
            ${error ? 'border-red-200 text-red-500' : 'border-gray-100 text-slate-700 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5'}
          `}
        >
          {isLoading ? (
            <option>Loading...</option>
          ) : error ? (
            <option>Connection Error</option>
          ) : (
            <>
              <option value="">{placeholderText[Language] || placeholderText.ENG}</option>
              {categories.map((cat) => (
                <option key={cat.id || cat._id} value={cat.id || cat._id}>
                  {getCategoryName(cat)}
                </option>
              ))}
            </>
          )}
        </select>
        
        {/* Right Side Icons */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {isLoading ? (
            <Loader2 size={16} className="animate-spin text-emerald-500" />
          ) : error ? (
            <AlertCircle size={16} className="text-red-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
          )}
        </div>
      </div>
    </div>
  );
}