import React, { useState } from 'react';
import { useSelector } from "react-redux";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FileUpload from "./FileUpload";
import LocationInput from "./LocationInput";
import { FaListUl, FaPen, FaPhone, FaUser, FaEnvelope } from "react-icons/fa";

export default function ComplaintForm({ onSubmit, isLoading, serverError }) {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  
  // State to hold the binary files from the FileUpload child component
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  // State to catch location details from the LocationInput component
  const [locationDetails, setLocationDetails] = useState({
    sub_city: "",
    woreda: "",
    latitude: "0",
    longitude: "0"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new FormData instance
    const formElement = e.currentTarget;
    const rawData = new FormData(formElement);
    const finalFormData = new FormData();

    // 1. Append Mandatory Text Fields
    finalFormData.append("citizen_name", rawData.get("citizen_name"));
    finalFormData.append("phone_number", rawData.get("phone_number"));
    finalFormData.append("description", rawData.get("description"));
    finalFormData.append("email", rawData.get("email") || "");
    
    // 2. Category Handling
    const category = rawData.get("category");
    finalFormData.append("categoryId", category || "1");

    // 3. Location Handling (Mapping local state to FormData)
    finalFormData.append("location", rawData.get("location") || "Point of Interest");
    finalFormData.append("sub_city", locationDetails.sub_city || "Not Specified");
    finalFormData.append("woreda", locationDetails.woreda || "Not Specified");
    finalFormData.append("latitude", locationDetails.latitude || "0");
    finalFormData.append("longitude", locationDetails.longitude || "0");

    // 4. File Handling
    // Loop through the files collected from FileUpload and append them
    selectedFiles.forEach((file) => {
      // The key "attachments" must match what your backend Multer/Controller expects
      finalFormData.append("attachments", file);
    });

    // Send the structured FormData to the parent (SubmitComplaint.jsx)
    onSubmit(finalFormData); 
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white border border-gray-100 rounded-[2.5rem] p-8 space-y-8 shadow-sm"
    >
      {/* Error Display */}
      {serverError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
          Error: {serverError.data?.details || "Please check all required fields."}
        </div>
      )}

      {/* Identity Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <FormInput name="citizen_name" Icon={FaUser} label="Full Name"  />
        <FormInput name="phone_number" Icon={FaPhone} label="Phone Number"  placeholder="09..." />
      </div>

      {/* Location & Contact Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <FormInput name="email" Icon={FaEnvelope} label="Email" />
        <LocationInput 
          name="location" 
          label="Location" 
          required 
          onLocationSelect={(loc) => setLocationDetails(loc)} 
        />
      </div>

      {/* Description Section */}
      <FormSelect 
        name="category" 
        Icon={FaListUl} 
        label="Category" 
        options={["Air Pollution", "Water Pollution", "Waste"]} 
      />
      
      <FormTextarea name="description" Icon={FaPen} label="Description" required />

      {/* File Upload Section */}
      {/* FIX: Changed onFileSelect to onFilesChange to match child component prop name */}
      <FileUpload onFilesChange={setSelectedFiles} />

      {/* Submit Action */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-200"
      >
        {isLoading ? (
            <span className="flex items-center justify-center gap-2">
                Submitting...
            </span>
        ) : (
            Language === "AMH" ? "አቤቱታውን ያስገቡ" : "Submit Complaint"
        )}
      </button>
    </form>
  );
}