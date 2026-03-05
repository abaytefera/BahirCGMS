import React, { useState } from 'react';
import { useSelector } from "react-redux";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FileUpload from "./FileUpload";
import LocationInput from "./LocationInput";
import { FaListUl, FaPen, FaPhone, FaUser, FaEnvelope, FaHandshake, FaWheelchair, FaUserShield, FaExclamationTriangle } from "react-icons/fa";

export default function ComplaintForm({ onSubmit, isLoading, serverError }) {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [locationDetails, setLocationDetails] = useState({
    sub_city: "",
    woreda: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formElement = e.currentTarget;
    const rawData = new FormData(formElement);
    const finalFormData = new FormData();

    // 1. Core Text Fields
    finalFormData.append("citizen_name", rawData.get("citizen_name") || "");
    finalFormData.append("phone_number", rawData.get("phone_number") || "");
    finalFormData.append("email", rawData.get("email") || "");
    finalFormData.append("description", rawData.get("description"));
    
    // 2. Category (API expects integer ID)
    // Map your UI strings to the IDs your backend expects
    const categoryMap = { "Air Pollution": 1, "Water Pollution": 2, "Waste": 3 };
    finalFormData.append("categoryId", categoryMap[rawData.get("category")] || 1);

    // 3. Location (API specifically requires sub_city and woreda)
    finalFormData.append("sub_city", locationDetails.sub_city);
    finalFormData.append("woreda", locationDetails.woreda);

    // 4. Additional Boolean Features (Checkboxes)
    // FormData appends strings, so we send "true" or "false"
    finalFormData.append("requestsMeeting", rawData.get("requestsMeeting") === "on");
    finalFormData.append("isElderly", rawData.get("isElderly") === "on");
    finalFormData.append("isDisabled", rawData.get("isDisabled") === "on");
    finalFormData.append("isCorruptionRelated", rawData.get("isCorruptionRelated") === "on");

    // 5. File Handling (API Key: "files", Max: 5)
    selectedFiles.slice(0, 5).forEach((fileObj) => {
      finalFormData.append("files", fileObj.file); 
    });

    onSubmit(finalFormData); 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
      {serverError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
          {serverError.data?.message || "Please check all required fields."}
        </div>
      )}

      {/* Identity Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <FormInput name="citizen_name" Icon={FaUser} label="Full Name" />
        <FormInput name="phone_number" Icon={FaPhone} label="Phone Number" placeholder="09..." />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <FormInput name="email" Icon={FaEnvelope} label="Email" />
        <LocationInput 
          required 
          onLocationSelect={(loc) => setLocationDetails(loc)} 
        />
      </div>

      <FormSelect 
        name="category" 
        Icon={FaListUl} 
        label="Category" 
        options={["Air Pollution", "Water Pollution", "Waste"]} 
      />
      
      <FormTextarea name="description" Icon={FaPen} label="Description" required />

      {/* NEW: Priority & Request Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-3xl">
        <CheckboxItem name="requestsMeeting" Icon={FaHandshake} label="Request a Meeting?" />
        <CheckboxItem name="isCorruptionRelated" Icon={FaExclamationTriangle} label="Corruption Related?" />
        <CheckboxItem name="isElderly" Icon={FaUserShield} label="Elderly Applicant" />
        <CheckboxItem name="isDisabled" Icon={FaWheelchair} label="Person with Disability" />
      </div>

      <FileUpload onFilesChange={setSelectedFiles} />
      <p className="text-[10px] text-gray-400 mt-[-20px] ml-2">Max 5 files (Images or PDF)</p>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg"
      >
        {isLoading ? "Submitting..." : (Language === "AMH" ? "አቤቱታውን ያስገቡ" : "Submit Complaint")}
      </button>
    </form>
  );
}

// Simple Helper Component for the checkboxes
function CheckboxItem({ name, Icon, label }) {
  return (
    <label className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:border-blue-200 transition-colors">
      <input type="checkbox" name={name} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
      <Icon size={14} className="text-gray-400" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}