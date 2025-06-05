import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { 
  MdDelete, 
  MdOutlineWaterDrop,
  MdOutlineMicrowave, 
  MdClose, 
  MdDining, 
  MdOutlineSecurity, 
  MdOutlineMeetingRoom 
} from "react-icons/md";
import { 
  GiCheckMark, 
  GiGasStove, 
  GiGymBag, 
  GiLift, 
  GiParkBench, 
  GiPowerGenerator, 
  GiSoccerBall 
} from "react-icons/gi";
import { Label } from '@/components/ui/label';
import { BsPatchQuestionFill, BsPhone } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { PiTelevisionSimpleBold, PiWashingMachineLight } from "react-icons/pi";
import { RiFridgeLine, RiSofaLine } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import { FaBed, FaChild, FaDog, FaSwimmingPool } from "react-icons/fa";
import { FaPersonChalkboard, FaWatchmanMonitoring } from "react-icons/fa6";
import { LuHeater } from "react-icons/lu";
import { BiCctv } from "react-icons/bi";

const PostProperty = () => {
  // State for Step 1 - Property Basics
  const [selectedAction, setSelectedAction] = useState('Rent');
  const [selectedType, setSelectedType] = useState('Commercial');
  const [selectedSubtype, setSelectedSubtype] = useState('');
  
  // State for Step 2 - Location & Features
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [subLocality, setSubLocality] = useState("");
  const [propertyTitle, setPropertyTitle] = useState("");
  const [googleMapLink, setGoogleMapLink] = useState('');

  // State for Step 3 - Property Details
  const [propertyDetails, setPropertyDetails] = useState({
    bedrooms: null,
    otherRooms: [],
    bathrooms: null,
    balconies: null,
    carpetArea: "",
    areaUnit: "sq.ft.",
    furnishing: "",
    amenities: [],
    coveredParking: 0,
    openParking: 0,
    totalFloors: "",
    propertyOnFloor: "",
    floorOptions: [],
    availability: "",
    availabilityDate: '',
    propertyAge: "",
    possessionBy: "",
    possessionDate: "",
    plotArea: "",
    plotUnit: '',
    roadWidth: "",
    roadWidthUnit: "feet",
    cornerPlot: "",
    gatedCommunity: "",
    allowSplit: "",
    totalLandArea: '',
    splitCount: '',
    eachSplitArea: '',
    facing: "",
    legalClearance: false,
    monthlyRent: "",
    deposit: "",
    builtUpArea: "",
    superBuiltUpArea: "",
    floorNumber: "",
    bachelorsAllowed: false,
    foodIncluded: false,
    meals: {
      Breakfast: {
        enabled: false,
        startTime: '',
        endTime: ''
      },
      Lunch: {
        enabled: false,
        startTime: '',
        endTime: ''
      },
      Dinner: {
        enabled: false,
        startTime: '',
        endTime: ''
      }
    },
    roomType: "",
    pgAmenities: [],
    shopFrontage: "",
    openArea: "",
    roadFacing: "",
    ownershipType: "",
    propertyApproval: '',
    landUseZone: '',
    storageAvailable: false,
    businessTransfer: false,
    showWindow: false,
    leaseDuration: "",
    rentEscalation: "",
    noticePeriod: "",
    preferredTenants: [],
    lockInPeriod: "",
    roomSharing: "",
    curfewTime: "",
    visitorPolicy: "",
    laundryService: false,
    conferenceRooms: 0,
    workstations: 0,
    pantryAvailable: false
  });

  // State for Step 4 - Media
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const videoInputRef = useRef(null);
  const [showVideoGuidelines, setShowVideoGuidelines] = useState(false);

  // State for Step 5 - Pricing
  const [pricing, setPricing] = useState({
    ownership: '',
    expectedPrice: '',
    pricePerSqft: '',
    allInclusive: false,
    taxExcluded: false,
    priceNegotiable: false,
    lease: false,
    additionalCharges:[],
    brokerage: '',
    propertyDescription: '',
    monthlyRent: '',
    deposit: '',
    leaseDuration: '',
    rentEscalation: '',
    noticePeriod: ''
  });

  // State for Step 6 - Company Details
  const [companyDetails, setCompanyDetails] = useState({
    licenseType: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    companyAddress1: "",
    location: "",
    companyDesc: "",
    reraStatus: ""
  });

  // Form State
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  // UI State
  const [showOtherRooms, setShowOtherRooms] = useState(false);
  const [showAllOtherRooms, setShowAllOtherRooms] = useState(false);
  const [showAmenitiesFlat, setShowAmenitiesFlat] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState(propertyDetails.amenities || []);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);

  // Property configuration with all subtypes and fields
  const propertyConfig = {
    Residential: {
      Rent: {
        subtypes: ['Flat/Apartment', 'Independent House / Villa'],
        fields: {
          'Flat/Apartment': {
            fields: ['bedrooms','otherRooms', 'bathrooms', 'balconies', 'furnishing','amenities', 'floorNumber', 'totalFloors','coveredParking','openParking', 'availability', 'propertyAge','facing','preferredTenants'],
            pricingFields: ['monthlyRent','lease', 'deposit', 'maintenanceFee', 'priceNegotiable', 'additionalCharges', 'brokerage']
          },
          'Independent House / Villa': {
            fields: ['bedrooms','otherRooms', 'bathrooms','balconies','furnishing','coveredParking','availability', 'propertyAge','facing', 'preferredTenants'],
            pricingFields: ['monthlyRent','lease', 'deposit', 'priceNegotiable', 'brokerage']
          },
          'Independent / Builder Floor': {
            fields: ['bedrooms', 'bathrooms', 'carpetArea', 'furnishing', 'floorNumber', 'totalFloors', 'propertyAge', 'possessionBy'],
            pricingFields: ['monthlyRent', 'deposit', 'priceNegotiable', 'brokerage']
          }
        }
      },
      Sell: {
        subtypes: ['Flat/Apartment', 'Independent House / Villa', 'Plot / Land'],
        fields: {
          'Flat/Apartment': {
            fields: ['bedrooms','otherRooms', 'bathrooms', 'balconies', 'carpetArea', 'furnishing','amenities', 'floorNumber', 'totalFloors','coveredParking','openParking', 'availability', 'propertyAge', 'possessionBy'],
            pricingFields: ['expectedPrice', 'pricePerSqft', 'allInclusive', 'taxExcluded', 'priceNegotiable', 'brokerage']
          },
          'Independent House / Villa': {
            fields: ['expectedPrice', 'bedrooms', 'bathrooms', 'carpetArea', 'furnishing', 'plotArea', 'facing', 'propertyAge', 'possessionBy'],
            pricingFields: ['expectedPrice', 'pricePerSqft', 'allInclusive', 'taxExcluded', 'priceNegotiable', 'brokerage']
          },
          'Independent / Builder Floor': {
            fields: ['expectedPrice', 'bedrooms', 'bathrooms', 'carpetArea', 'furnishing', 'floorNumber', 'totalFloors', 'propertyAge', 'possessionBy'],
            pricingFields: ['expectedPrice', 'pricePerSqft', 'allInclusive', 'taxExcluded', 'priceNegotiable', 'brokerage']
          },
          'Plot / Land': {
            fields: ['plotArea','roadWidth','facing','cornerPlot','gatedCommunity','allowSplit','ownershipType','propertyApproval','landUseZone','possessionBy'],
            pricingFields: ['expectedPrice', 'pricePerSqft','priceNegotiable', 'allInclusive', 'taxExcluded',  'brokerage']
          }
        }
      }
    },
    Commercial: {
      Rent: {
        subtypes: ['Office Space', 'Retail Spaces', 'Warehouses', 'Industrial Building', 'Showroom'],
        fields: {
          'Office Space': {
            fields: ['builtUpArea', 'superBuiltUpArea', 'conferenceRooms', 'workstations', 'pantryAvailable',  'rentEscalation', 'noticePeriod'],
            pricingFields: ['monthlyRent', 'deposit', 'leaseDuration', 'rentEscalation', 'noticePeriod', 'priceNegotiable', 'brokerage']
          },
          'Retail Shop': {
            fields: ['monthlyRent', 'deposit', 'builtUpArea', 'shopFrontage', 'openArea', 'roadFacing', 'storageAvailable', 'businessTransfer', 'showWindow', 'leaseDuration', 'noticePeriod'],
            pricingFields: ['monthlyRent', 'deposit', 'leaseDuration', 'noticePeriod', 'priceNegotiable', 'brokerage']
          },
          'Warehouse': {
            fields: ['monthlyRent', 'deposit', 'builtUpArea', 'leaseDuration', 'noticePeriod'],
            pricingFields: ['monthlyRent', 'deposit', 'leaseDuration', 'noticePeriod', 'priceNegotiable', 'brokerage']
          },
          'Industrial Building': {
            fields: ['monthlyRent', 'deposit', 'builtUpArea', 'leaseDuration', 'noticePeriod'],
            pricingFields: ['monthlyRent', 'deposit', 'leaseDuration', 'noticePeriod', 'priceNegotiable', 'brokerage']
          },
          'Showroom': {
            fields: ['monthlyRent', 'deposit', 'builtUpArea', 'shopFrontage', 'roadFacing', 'leaseDuration', 'noticePeriod'],
            pricingFields: ['monthlyRent', 'deposit', 'leaseDuration', 'noticePeriod', 'priceNegotiable', 'brokerage']
          }
        }
      },
      Sell: {
        subtypes: ['Office Space', 'Retail Spaces', 'Warehouses', 'Industrial Building', 'Showroom'],
        fields: {
          'Office Space': {
            fields: ['builtUpArea', 'superBuiltUpArea', 'furnishing', 'conferenceRooms', 'workstations', 'pantryAvailable'],
            pricingFields: ['expectedPrice', 'pricePerSqft', 'allInclusive', 'taxExcluded', 'priceNegotiable', 'brokerage']
          },
          'Retail Shop': {
            fields: ['expectedPrice', 'builtUpArea', 'shopFrontage', 'openArea', 'roadFacing', 'storageAvailable', 'businessTransfer', 'showWindow'],
            pricingFields: ['expectedPrice', 'pricePerSqft', 'allInclusive', 'taxExcluded', 'priceNegotiable', 'brokerage']
          },
          'Warehouse': {
            fields: ['expectedPrice', 'builtUpArea'],
            pricingFields: ['expectedPrice', 'pricePerSqft', 'allInclusive', 'taxExcluded', 'priceNegotiable', 'brokerage']
          },
          'Industrial Building': {
            fields: ['expectedPrice', 'builtUpArea'],
            pricingFields: ['expectedPrice', 'pricePerSqft', 'allInclusive', 'taxExcluded', 'priceNegotiable', 'brokerage']
          },
          'Commercial Land': {
            fields: ['expectedPrice', 'plotArea', 'facing', 'legalClearance'],
            pricingFields: ['expectedPrice', 'pricePerSqft', 'allInclusive', 'taxExcluded', 'priceNegotiable', 'brokerage']
          },
          'Showroom': {
            fields: ['expectedPrice', 'builtUpArea', 'shopFrontage', 'roadFacing'],
            pricingFields: ['expectedPrice', 'pricePerSqft', 'allInclusive', 'taxExcluded', 'priceNegotiable', 'brokerage']
          }
        }
      }
    }
  };

  // Amenities categories
  const amenitiesCategories = [
    {
      title: "Flat Furnishings",
      items: [
        { label: "Dining Table", icon: <MdDining className="text-xl" /> },
        { label: "Washing Machine", icon: <PiWashingMachineLight className="text-xl" /> },
        { label: "Sofa", icon: <RiSofaLine className="text-xl" /> },
        { label: "Microwave", icon: <MdOutlineMicrowave className="text-xl" /> },
        { label: "Stove", icon: <GiGasStove className="text-xl" /> },
        { label: "Fridge", icon: <RiFridgeLine className="text-xl" /> },
        { label: "Water Purifier", icon: <MdOutlineWaterDrop className="text-xl" /> },
        { label: "Gas Pipeline", icon: <GiGasStove className="text-xl" /> },
        { label: "AC", icon: <TbAirConditioning className="text-xl" /> },
        { label: "Bed", icon: <FaBed className="text-xl" /> },
        { label: "TV", icon: <PiTelevisionSimpleBold className="text-xl" /> },
        { label: "Cupboard", icon: <FaPersonChalkboard className="text-xl" /> },
        { label: "Heater", icon: <LuHeater className="text-xl" /> },
      ]
    },
    {
      title: "Society Amenities",
      items: [
        { label: "Lift", icon: <GiLift className="text-xl" /> },
        { label: "CCTV", icon: <BiCctv className="text-xl" /> },
        { label: "Gym", icon: <GiGymBag className="text-xl" /> },
        { label: "Garden", icon: <GiParkBench className="text-xl" /> },
        { label: "Kids Area", icon: <FaChild className="text-xl" /> },
        { label: "Sports", icon: <GiSoccerBall className="text-xl" /> },
        { label: "Swimming Pool", icon: <FaSwimmingPool className="text-xl" /> },
        { label: "Intercom", icon: <BsPhone className="text-xl" /> },
        { label: "Gated Community", icon: <MdOutlineSecurity className="text-xl" /> },
        { label: "Club House", icon: <MdOutlineMeetingRoom className="text-xl" /> },
        { label: "Community Hall", icon: <MdOutlineMeetingRoom className="text-xl" /> },
        { label: "Regular Water Supply", icon: <MdOutlineWaterDrop className="text-xl" /> },
        { label: "Power Backup", icon: <GiPowerGenerator className="text-xl" /> },
        { label: "Pet Allowed", icon: <FaDog className="text-xl" /> },
        { label: "Security", icon: <FaWatchmanMonitoring className="text-xl" /> },
      ]
    }
  ];

  // Helper functions
  const formatTime12Hour = (time) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  // Get available subtypes based on selected type and action
  const getAvailableSubtypes = () => {
    if (!selectedType || !selectedAction) return [];
    return propertyConfig[selectedType]?.[selectedAction]?.subtypes || [];
  };

  // Get fields to show based on selected type, action and subtype
  const getFieldsToShow = () => {
    if (!selectedType || !selectedAction || !selectedSubtype) return [];
    return propertyConfig[selectedType]?.[selectedAction]?.fields?.[selectedSubtype]?.fields || [];
  };

  // Get pricing fields to show based on selected type and action
  const getPricingFieldsToShow = () => {
    if (!selectedType || !selectedAction || !selectedSubtype) return [];
    return propertyConfig[selectedType]?.[selectedAction]?.fields?.[selectedSubtype]?.pricingFields || [];
  };

  // Event handlers
  const handlePropertyDetailChange = (field, value) => {
    setPropertyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePropertyFloorDetailChange = (key, value) => {
    setPropertyDetails(prev => {
      const updated = { ...prev, [key]: value };
  
      if (key === "totalFloors") {
        const numFloors = parseInt(value);
        if (!isNaN(numFloors) && numFloors > 0) {
          const floorOptions = ["Ground Floor"];
          for (let i = 1; i <= numFloors; i++) {
            floorOptions.push(i.toString());
          }
          updated.floorOptions = floorOptions;
          updated.floorNumber = ""; // reset floor number
        } else {
          updated.floorOptions = [];
          updated.floorNumber = "";
        }
      }
  
      return updated;
    });
  };

  const handlePricingChange = (field, value) => {
    setPricing(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompanyDetailChange = (field, value) => {
    setCompanyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    ); 
  };
  
  const handleSaveAmenities = () => {
    handlePropertyDetailChange("amenities", selectedAmenities);
    setShowAmenitiesFlat(false);
  };

  const handlePhotoUpload = (newFiles) => {
    const validFiles = newFiles.filter(file =>
      file.size <= 10 * 1024 * 1024 &&
      ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/heic', 'image/heif'].includes(file.type)
    );

    const newPhotoData = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    if (photos.length + validFiles.length > 50) {
      alert("You can only upload up to 50 photos.");
      return;
    }

    const updatedPhotos = [...photos, ...newPhotoData].slice(0, 50);
    setPhotos(updatedPhotos);

    if (updatedPhotos.length > 5) {
      setCurrentIndex(Math.max(0, updatedPhotos.length - 5));
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    const updated = photos.filter((_, i) => i !== indexToRemove);
    setPhotos(updated);
    if (currentIndex > 0 && currentIndex > updated.length - 5) {
      setCurrentIndex(currentIndex - 1);
    }
    if (coverPhotoIndex === indexToRemove) {
      setCoverPhotoIndex(null);
    } else if (coverPhotoIndex > indexToRemove) {
      setCoverPhotoIndex(coverPhotoIndex - 1);
    }
  };

  const handleVideoUpload = (file) => {
    if (!file) return;

    const allowedTypes = ["video/mp4", "video/quicktime", "video/x-m4v"];
    if (!allowedTypes.includes(file.type)) {
      alert("Unsupported video format. Please upload .mp4, .mov or .m4v files.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("Upload file too large. Video must be under 50MB.");
      if (videoInputRef.current) videoInputRef.current.value = "";
      return;
    }

    const fileURL = URL.createObjectURL(file); 
    setVideo(file);
    setVideoURL(fileURL);
  };

  // Form navigation
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setStep(prevStep => Math.min(prevStep + 1, 7));
  };

  const handleBack = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  // Effects
  useEffect(() => {
    if (showAmenitiesFlat) {
      setSelectedAmenities(propertyDetails.amenities || []);
    }
  }, [showAmenitiesFlat, propertyDetails.amenities]);

  useEffect(() => {
    setSelectedSubtype('');
  }, [selectedType, selectedAction]);

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSubmitted]);

  useEffect(() => {
    return () => {
      if (videoURL) URL.revokeObjectURL(videoURL);
    };
  }, [videoURL]);

  useEffect(() => {
    return () => {
      photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    };
  }, [photos]);


  // Render functions for each step
  const renderDynamicFieldsStep4 = () => {
    const fieldsToShow = getFieldsToShow();

    return (
      <div className="space-y-6">
        {/* Room Details Section */}
        {(fieldsToShow.includes('bedrooms') || fieldsToShow.includes('bathrooms') || fieldsToShow.includes('balconies')) && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Room Details</h3>

            {fieldsToShow.includes('bedrooms') && (
              <div>
                <Label className="block text-sm font-medium mb-2">
                  No. of Bedrooms
                </Label>
                <div className="flex gap-2">
                  {['1Rk', 1, 2, 3, 4, 5, '5+']
                    .filter(num => {
                      if (num === '1Rk') {
                        return (
                          ['Sell', 'Rent'].includes(selectedAction) &&
                          selectedType === 'Residential' &&
                          selectedSubtype?.toLowerCase().includes('flat')
                        );
                      }
                      return true;
                    })
                    .map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handlePropertyDetailChange('bedrooms', num)}
                        className={`w-10 h-10 rounded-full border ${
                          propertyDetails.bedrooms === num
                            ? 'bg-blue-600 text-white'
                            : 'border-gray-300 text-gray-600'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {fieldsToShow.includes('otherRooms') && (
              <div className="mt-1">
                <Label
                  className="block text-sm font-medium mb-1 cursor-pointer text-blue-600 hover:underline"
                  onClick={() => setShowOtherRooms(prev => !prev)}
                >
                  + Other rooms
                </Label>

                {propertyDetails.otherRooms.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    {(showAllOtherRooms ? propertyDetails.otherRooms : propertyDetails.otherRooms.slice(0, 2)).map((room) => (
                      <span
                        key={room}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center"
                      >
                        {room}
                        <button
                          onClick={() => {
                            const updatedRooms = propertyDetails.otherRooms.filter(r => r !== room);
                            handlePropertyDetailChange('otherRooms', updatedRooms);
                            if (!['Servant Room', 'Store Room'].some(r => updatedRooms.includes(r))) {
                              setShowAdditionalCharges(false);
                            }
                          }}
                          className="ml-2 text-blue-700 hover:text-red-600 text-sm"
                          title="Remove"
                        >
                          &times;
                        </button>
                      </span>
                    ))}

                    {propertyDetails.otherRooms.length > 2 && (
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => setShowAllOtherRooms(!showAllOtherRooms)}
                      >
                        {showAllOtherRooms
                          ? 'Show less'
                          : `+${propertyDetails.otherRooms.length - 2} more`}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        handlePropertyDetailChange('otherRooms', []);
                        setShowAdditionalCharges(false);
                        setShowAllOtherRooms(false);
                      }}
                      className="text-red-600 hover:underline text-xs font-medium ml-2"
                    >
                      Clear All
                    </button>
                  </div>
                )}

                {showOtherRooms && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Pooja Room', 'Study Room', 'Servant Room', 'Store Room'].map(room => (
                      <button
                        key={room}
                        type="button"
                        onClick={() => {
                          const newRooms = propertyDetails.otherRooms.includes(room)
                            ? propertyDetails.otherRooms.filter(r => r !== room)
                            : [...propertyDetails.otherRooms, room];

                          handlePropertyDetailChange('otherRooms', newRooms);

                          if (['Servant Room', 'Store Room'].some(r => newRooms.includes(r))) {
                            setShowAdditionalCharges(true);
                          }
                        }}
                        className={`px-4 py-1 rounded border transition text-sm ${
                          propertyDetails.otherRooms.includes(room)
                            ? 'bg-blue-600 text-white'
                            : 'border-gray-300 text-gray-600'
                        }`}
                      >
                        {room}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {fieldsToShow.includes('bathrooms') && (
              <div>
                <Label className="block text-sm font-medium mb-2">
                  No. of Bathrooms
                </Label>
                <div className="flex gap-2 mb-1">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handlePropertyDetailChange('bathrooms', num)}
                      className={`w-10 h-10 rounded-full border ${
                        propertyDetails.bathrooms === num
                          ? 'bg-blue-600 text-white'
                          : 'border-gray-300 text-gray-600'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {fieldsToShow.includes('balconies') && (
              <div>
                <Label className="block text-sm font-medium mb-2">Balconies</Label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handlePropertyDetailChange('balconies', num)}
                      className={`w-10 h-10 rounded-full border ${
                        propertyDetails.balconies === num
                          ? 'bg-blue-600 text-white'
                          : 'border-gray-300 text-gray-600'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handlePropertyDetailChange('balconies', 4)}
                    className={`px-4 h-10 rounded border ${
                      propertyDetails.balconies === 4
                        ? 'bg-blue-600 text-white'
                        : 'border-gray-300 text-gray-600'
                    }`}
                  >
                    More than 3
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Commercial Specific Fields */}
        {selectedType === 'Commercial' && (
          <>
            {fieldsToShow.includes('shopFrontage') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Shop Frontage (feet)</Label>
                <input
                  type="text"
                  value={propertyDetails.shopFrontage}
                  onChange={(e) => handlePropertyDetailChange('shopFrontage', e.target.value)}
                  className="w-full max-w-md border rounded px-3 py-2"
                  placeholder="Enter shop frontage in feet"
                />
              </div>
            )}



            {fieldsToShow.includes('openArea') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Open Area (sq.ft)</Label>
                <input
                  type="text"
                  value={propertyDetails.openArea}
                  onChange={(e) => handlePropertyDetailChange('openArea', e.target.value)}
                  className="w-full max-w-md border rounded px-3 py-2"
                  placeholder="Enter open area"
                />
              </div>
            )}

            {fieldsToShow.includes('storageAvailable') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Storage Available</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="storageAvailable"
                    checked={propertyDetails.storageAvailable}
                    onChange={(e) => handlePropertyDetailChange('storageAvailable', e.target.checked)}
                  />
                  <Label htmlFor="storageAvailable">Storage space available</Label>
                </div>
              </div>
            )}

            {fieldsToShow.includes('businessTransfer') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Business Transfer</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="businessTransfer"
                    checked={propertyDetails.businessTransfer}
                    onChange={(e) => handlePropertyDetailChange('businessTransfer', e.target.checked)}
                  />
                  <Label htmlFor="businessTransfer">Existing business transfer included</Label>
                </div>
              </div>
            )}

            {fieldsToShow.includes('showWindow') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Show Window</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showWindow"
                    checked={propertyDetails.showWindow}
                    onChange={(e) => handlePropertyDetailChange('showWindow', e.target.checked)}
                  />
                  <Label htmlFor="showWindow">Show window available</Label>
                </div>
              </div>
            )}

            {fieldsToShow.includes('conferenceRooms') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Conference Rooms</Label>
                <input
                  type="number"
                  value={propertyDetails.conferenceRooms}
                  onChange={(e) => handlePropertyDetailChange('conferenceRooms', parseInt(e.target.value) || 0)}
                  className="w-full max-w-md border rounded px-3 py-2"
                  placeholder="Number of conference rooms"
                />
              </div>
            )}

            {fieldsToShow.includes('workstations') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Workstations Capacity</Label>
                <input
                  type="number"
                  value={propertyDetails.workstations}
                  onChange={(e) => handlePropertyDetailChange('workstations', parseInt(e.target.value) || 0)}
                  className="w-full max-w-md border rounded px-3 py-2"
                  placeholder="Number of workstations"
                />
              </div>
            )}

            {fieldsToShow.includes('pantryAvailable') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Pantry Available</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pantryAvailable"
                    checked={propertyDetails.pantryAvailable}
                    onChange={(e) => handlePropertyDetailChange('pantryAvailable', e.target.checked)}
                  />
                  <Label htmlFor="pantryAvailable">Pantry available</Label>
                </div>
              </div>
            )}

            {fieldsToShow.includes('leaseDuration') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Lease Duration</Label>
                <select
                  value={propertyDetails.leaseDuration}
                  onChange={(e) => handlePropertyDetailChange('leaseDuration', e.target.value)}
                  className="w-full max-w-md border rounded px-3 py-2"
                >
                  <option value="" disabled>Select lease duration</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="5 years">5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            )}

            {fieldsToShow.includes('rentEscalation') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Rent Escalation Clause</Label>
                <textarea
                  value={propertyDetails.rentEscalation}
                  onChange={(e) => handlePropertyDetailChange('rentEscalation', e.target.value)}
                  className="w-full max-w-md border rounded px-3 py-2"
                  placeholder="Describe rent escalation terms"
                  rows={3}
                />
              </div>
            )}

            {fieldsToShow.includes('noticePeriod') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Notice Period (months)</Label>
                <input
                  type="number"
                  value={propertyDetails.noticePeriod}
                  onChange={(e) => handlePropertyDetailChange('noticePeriod', e.target.value)}
                  className="w-full max-w-md border rounded px-3 py-2"
                  placeholder="Notice period in months"
                />
              </div>
            )}
          </>
        )}

        {/* Residential Rent Specific Fields */}
        {selectedType === 'Residential' && selectedAction === 'Rent' && (
          <>
            {fieldsToShow.includes('preferredTenants') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Preferred Tenants</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {['Family', 'Bachelors', 'Company', 'No Preference'].map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={propertyDetails.preferredTenants?.includes(option) || false}
                        onChange={(e) => {
                          const currentSelection = propertyDetails.preferredTenants || [];
                          let newSelection;
                          
                          if (e.target.checked) {
                            if (option === "No Preference") {
                              newSelection = [option];
                            } else {
                              newSelection = [...currentSelection.filter(item => item !== "No Preference"), option];
                            }
                          } else {
                            newSelection = currentSelection.filter(item => item !== option);
                          }
                          
                          handlePropertyDetailChange('preferredTenants', newSelection);
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {fieldsToShow.includes('lockInPeriod') && (
              <div className="mt-4">
                <Label className="block text-sm font-medium mb-1">Lock-in Period (months)</Label>
                <input
                  type="number"
                  value={propertyDetails.lockInPeriod}
                  onChange={(e) => handlePropertyDetailChange('lockInPeriod', e.target.value)}
                  className="w-full max-w-md border rounded px-3 py-2"
                  placeholder="Lock-in period in months"
                />
              </div>
            )}
          </>
        )}

        {/* PG Specific Fields */}
        {/* {(selectedAction === 'PG' && fieldsToShow.includes('roomSharing')) && (
          <div className="mt-6">
            <Label className="block text-sm font-medium mb-2">Room Sharing</Label>
            <div className="flex gap-2 flex-wrap">
              {['Private', '2', '3','4','5+', 'Dormitory'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handlePropertyDetailChange('roomSharing', type)}
                  className={`px-4 py-2 rounded border ${
                    propertyDetails.roomSharing === type
                      ? 'bg-blue-600 text-white'
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )} */}

        {/* Plot Details Section */}
        {(fieldsToShow.includes('carpetArea') || fieldsToShow.includes('builtUpArea') || 
         fieldsToShow.includes('superBuiltUpArea') || fieldsToShow.includes('plotArea')) && (
          <div className="mt-3">
            <div className="">
              <Label className="text-xl font-medium text-gray-700">
                Plot Details
              </Label>
              
              {fieldsToShow.includes('carpetArea') && (
                <div className="mt-4">
                  <div className="relative flex items-center border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm shadow-sm overflow-hidden max-w-md">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={propertyDetails.carpetArea}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          handlePropertyDetailChange('carpetArea', value);
                        }}
                        placeholder=" "
                        className="peer w-full bg-transparent px-4 pt-6 pb-2 text-base appearance-none focus:outline-none placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                        Carpet Area
                      </label>
                    </div>
                    <div className="h-10 w-px bg-gray-300"></div>
                    <select
                      value={propertyDetails.areaUnit}
                      onChange={(e) => handlePropertyDetailChange('areaUnit', e.target.value)}
                      className="px-4 py-2 bg-transparent focus:outline-none text-sm text-gray-700"
                    >
                      <option value="sq.ft.">sq.ft.</option>
                      <option value="sq.m.">sq.m.</option>
                      <option value="acres">acres</option>
                      <option value="cent">cent</option>
                      <option value="hectare">hectare</option>
                    </select>
                  </div>
                </div>
              )}

              {fieldsToShow.includes('builtUpArea') && (
                <div className="mt-4">
                  <div className="relative max-w-md">
                    <input
                      type="text"
                      value={propertyDetails.builtUpArea}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        handlePropertyDetailChange('builtUpArea', value);
                      }}
                      placeholder=" "
                      className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm focus:outline-none placeholder-transparent"
                    />
                    <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                      Built Up Area
                    </label>
                  </div>
                </div>
              )}

              {fieldsToShow.includes('superBuiltUpArea') && (
                <div className="mt-4">
                  <div className="relative max-w-md">
                    <input
                      type="text"
                      value={propertyDetails.superBuiltUpArea}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        handlePropertyDetailChange('superBuiltUpArea', value);
                      }}
                      placeholder=" "
                      className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm focus:outline-none placeholder-transparent"
                    />
                    <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                      Super Built Up Area
                    </label>
                  </div>
                </div>
              )}

              {fieldsToShow.includes('plotArea') && (
                <div className="mt-4">
                  <div className="relative flex items-center border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm shadow-sm overflow-hidden">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={propertyDetails.plotArea}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d*$/.test(val)) {
                            handlePropertyDetailChange('plotArea', val);
                          }
                        }}
                        placeholder=" "
                        className="peer block w-full appearance-none bg-transparent px-4 pt-6 pb-2 text-base focus:outline-none placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                        Plot Area
                      </label>
                    </div>
                    <div className="h-10 w-px bg-gray-300"></div>
                    <select
                      value={propertyDetails.plotUnit}
                      onChange={(e) => handlePropertyDetailChange('plotUnit', e.target.value)}
                      className="px-5 py-2 bg-transparent focus:outline-none text-sm text-gray-700"
                    >
                      <option value="Sq.ft">Sq.ft</option>
                      <option value="Sq.yards">Sq.yards</option>
                      <option value="Acres">Acres</option>
                    </select>
                  </div>
                </div>
              )}

              {fieldsToShow.includes('roadWidth') && (
                <div className="mt-4">
                  <div className="relative flex items-center border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm shadow-sm overflow-hidden">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={propertyDetails.roadWidth}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d*$/.test(val)) {
                            handlePropertyDetailChange('roadWidth', val);
                          }
                        }}
                        placeholder=" "
                        className="peer block w-full appearance-none bg-transparent px-4 pt-6 pb-2 text-base focus:outline-none placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                        Road Width
                      </label>
                    </div>
                    <div className="h-10 w-px bg-gray-300"></div>
                    <select
                      value={propertyDetails.roadWidthUnit}
                      onChange={(e) => handlePropertyDetailChange('roadWidthUnit', e.target.value)}
                      className="px-4 py-2 bg-transparent focus:outline-none text-sm text-gray-700"
                    >
                      <option value="feet">Feet</option>
                      <option value="meter">Meter</option>
                    </select>
                  </div>
                </div>
              )}

              {(fieldsToShow.includes('cornerPlot') || fieldsToShow.includes('gatedCommunity') || fieldsToShow.includes('allowSplit')) && (
                <div className="flex flex-wrap gap-x-12 mt-4 ml-2">
                  {fieldsToShow.includes('allowSplit') && (
                    <div className="">
                      <div>
                        <label className="text-sm font-medium mb-2 text-gray-700">Allow Land Split?</label>
                        <div className="flex items-center gap-6">
                          {['Yes', 'No'].map((option) => (
                            <label key={option} className="flex items-center gap-2 text-sm text-gray-600">
                              <input
                                type="radio"
                                name="allowSplit"
                                value={option}
                                checked={propertyDetails.allowSplit === option}
                                onChange={(e) => handlePropertyDetailChange('allowSplit', e.target.value)}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>

                      {propertyDetails.allowSplit === 'Yes' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="relative">
                            <input
                              type="tel"
                              value={propertyDetails.totalLandArea || ''}
                              onChange={(e) => handlePropertyDetailChange('totalLandArea', e.target.value)}
                              placeholder=" "
                              className="peer block w-full border border-gray-300 rounded px-4 pt-6 pb-2 placeholder-transparent focus:outline-none focus:border-blue-600"
                            />
                            <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                              Total Land Area (in cents)
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              type="tel"
                              value={propertyDetails.splitCount || ''}
                              onChange={(e) => handlePropertyDetailChange('splitCount', e.target.value)}
                              placeholder=" "
                              className="peer block w-full border border-gray-300 rounded px-4 pt-6 pb-2 placeholder-transparent focus:outline-none focus:border-blue-600"
                            />
                            <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                              Number of Splits
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              type="tel"
                              value={propertyDetails.eachSplitArea || ''}
                              onChange={(e) => handlePropertyDetailChange('eachSplitArea', e.target.value)}
                              placeholder=" "
                              className="peer block w-full border border-gray-300 rounded px-4 pt-6 pb-2 placeholder-transparent focus:outline-none focus:border-blue-600"
                            />
                            <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                              Area per Split (in cents)
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                    
                  {fieldsToShow.includes('cornerPlot') && (
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium mb-2 text-gray-700">Corner Plot</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="cornerPlot"
                            value="Yes"
                            checked={propertyDetails.cornerPlot === 'Yes'}
                            onChange={(e) => handlePropertyDetailChange('cornerPlot', e.target.value)}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="cornerPlot"
                            value="No"
                            checked={propertyDetails.cornerPlot === 'No'}
                            onChange={(e) => handlePropertyDetailChange('cornerPlot', e.target.value)}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">No</span>
                        </label>
                      </div>
                    </div>
                  )}              

                  {fieldsToShow.includes('gatedCommunity') && (
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium mb-2 text-gray-700">Gated Community</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gatedCommunity"
                            value="Yes"
                            checked={propertyDetails.gatedCommunity === 'Yes'}
                            onChange={(e) => handlePropertyDetailChange('gatedCommunity', e.target.value)}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gatedCommunity"
                            value="No"
                            checked={propertyDetails.gatedCommunity === 'No'}
                            onChange={(e) => handlePropertyDetailChange('gatedCommunity', e.target.value)}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">No</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {fieldsToShow.includes('facing') && (
                    <div className="mt-4">
                      <Label className="block text-sm font-medium mb-1">Facing</Label>
                      <div className="flex gap-4 flex-wrap">
                        {['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map(direction => (
                          <button
                            key={direction}
                            type="button"
                            onClick={() => handlePropertyDetailChange('facing', direction)}
                            className={`px-3 py-1 rounded border text-sm font-medium ${
                              propertyDetails.facing === direction
                                ? 'bg-blue-600 text-white'
                                : 'border-gray-300 text-gray-600'
                            }`}
                          >
                            {direction}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className='mt-3'>
                    <Label className="text-xl font-medium text-gray-700 mt-3">
                      Legal Details
                    </Label>

                    {fieldsToShow.includes('ownershipType') && (
                      <div id="ownership-field" className="mt-4">
                        <h2 className="text-sm font-medium mb-2 flex items-center gap-2 text-gray-700">
                          Ownership Type
                          <span className="group relative text-gray-500 cursor-pointer">
                            <BsPatchQuestionFill className="text-lg" />
                            <div className="absolute top-6 left-4 z-50 w-80 p-4 bg-white border border-gray-300 rounded-md shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                              <h3 className="font-semibold mb-2">Types of Ownerships</h3>
                              <p className="mb-1"><strong>Freehold:</strong> Full and unconditional ownership.</p>
                              <p className="mb-1"><strong>Leasehold:</strong> Ownership for a fixed term (usually 90-99 years).</p>
                              <p className="mb-1"><strong>Co-operative society:</strong> Group-based legal co-ownership.</p>
                              <p><strong>Power of Attorney:</strong> Legal authority to act on behalf of the owner.</p>
                            </div>
                          </span>
                        </h2>

                        <div className="flex flex-wrap gap-2">
                          {['Freehold', 'Leasehold', 'Co-operative society', 'Power of Attorney'].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handlePropertyDetailChange('ownershipType', option)}
                              className={`px-4 py-1 rounded border transition ${
                                propertyDetails.ownershipType === option
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Property Approval Field */}
                    {fieldsToShow.includes('propertyApproval') && (
                      <div id="property-approval-field" className="mt-4">
                        <h2 className="text-sm font-medium mb-2 text-gray-700">Property Approval</h2>
                        <div className="flex flex-wrap gap-2">
                          {['Panchayat', 'CMDA', 'DTCP', 'Other'].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handlePropertyDetailChange('propertyApproval', option)}
                              className={`px-4 py-1 rounded-sm border text-sm transition ${
                                propertyDetails.propertyApproval === option
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-700 border-gray-300'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Land Use Zone Field */}
                    {fieldsToShow.includes('landUseZone') && (
                      <div id="land-use-zone-field" className="mt-4">
                        <h2 className="text-sm font-medium mb-2 text-gray-700">Land Use Zone</h2>
                        <div className="flex flex-wrap gap-2">
                          {['Residential', 'Agricultural', 'Commercial', 'Industrial'].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handlePropertyDetailChange('landUseZone', option)}
                              className={`px-4 py-1 rounded border text-sm transition ${
                                propertyDetails.landUseZone === option
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-700 border-gray-300'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>            
                </div>                
              )}
            </div>
          </div>
        )}

        {/* Sell specific fields */}
        {selectedAction === 'Sell' && fieldsToShow.includes('expectedPrice') && (
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-1">Expected Price (₹)</Label>
            <input
              type="text"
              value={propertyDetails.expectedPrice}
              onChange={(e) => handlePropertyDetailChange('expectedPrice', e.target.value)}
              className="w-full max-w-md border rounded px-3 py-2"
              placeholder="Enter expected price"
            />
          </div>
        )}

        {/* Furnishing */}
        {fieldsToShow.includes("furnishing") && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Furnishing</label>
            <div className="flex gap-2 flex-wrap">
              {["Furnished", "Semi-furnished", "Unfurnished"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handlePropertyDetailChange("furnishing", option)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold border transition-all duration-300 ease-in-out ${
                    propertyDetails.furnishing === option
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {fieldsToShow.includes('amenities') && (
          <>
            <div
              onClick={() => setShowAmenitiesFlat(true)}
              className="mt-4 text-sm font-medium text-blue-600 hover:underline cursor-pointer flex items-center"
            >
              + Add Furnishings / Amenities
            </div>

            {propertyDetails.amenities?.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 items-center">
                  {(showAllAmenities ? propertyDetails.amenities : propertyDetails.amenities.slice(0, 3)).map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center"
                    >
                      {amenity}
                    </span>
                  ))}
                  
                  {propertyDetails.amenities.length > 3 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowAllAmenities(!showAllAmenities);
                      }}
                      className="text-blue-600 hover:underline text-xs font-medium px-2 py-1 whitespace-nowrap"
                    >
                      {showAllAmenities ? 'Show less' : `+${propertyDetails.amenities.length - 3} more`}
                    </button>
                  )}
                  
                  {showAllAmenities && propertyDetails.amenities.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handlePropertyDetailChange('amenities', []);
                      }}
                      className="text-red-600 hover:underline text-xs font-medium px-2 py-1 whitespace-nowrap"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            )}

            {showAmenitiesFlat && (
              <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-sm p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-lg">
                  <button
                    onClick={() => setShowAmenitiesFlat(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                  >
                    &times;
                  </button>

                  <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
                    Add Furnishings and Amenities
                  </h3>

                  <div className="space-y-8">
                    {amenitiesCategories.map((category) => (
                      <div key={category.title}>
                        <h4 className="text-lg font-medium mb-4 text-gray-700">
                          {category.title}
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {category.items.map((item) => (
                            <div
                              key={item.label}
                              onClick={() => toggleAmenity(item.label)}
                              className={`border rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer text-center transition-all duration-200 ${
                                selectedAmenities.includes(item.label)
                                  ? "bg-blue-50 border-blue-500 text-blue-700"
                                  : "border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <span className="mb-2">{item.icon}</span>
                              <span className="text-xs font-light">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={handleSaveAmenities}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg shadow transition-all"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Parking */}
        {(fieldsToShow.includes('coveredParking') || fieldsToShow.includes('openParking')) && (
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-1">Reserved Parking</Label>
            <div className="flex items-center gap-6 flex-wrap">
              {fieldsToShow.includes('coveredParking') && (
                <div className="flex items-center gap-2">
                  <span>Covered Parking</span>
                  <button
                    type="button"
                    onClick={() => handlePropertyDetailChange('coveredParking', Math.max(0, propertyDetails.coveredParking - 1))}
                    disabled={propertyDetails.coveredParking === 0}
                    className={`w-8 h-8 rounded-full border text-lg ${
                      propertyDetails.coveredParking === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    −
                  </button>
                  <span>{propertyDetails.coveredParking}</span>
                  <button
                    type="button"
                    onClick={() => handlePropertyDetailChange('coveredParking', propertyDetails.coveredParking + 1)}
                    className="w-8 h-8 rounded-full border text-lg"
                  >
                    +
                  </button>
                </div>
              )}

              {fieldsToShow.includes('openParking') && (
                <div className="flex items-center gap-2">
                  <span>Open Parking</span>
                  <button
                    type="button"
                    onClick={() => handlePropertyDetailChange('openParking', Math.max(0, propertyDetails.openParking - 1))}
                    disabled={propertyDetails.openParking === 0}
                    className={`w-8 h-8 rounded-full border text-lg ${
                      propertyDetails.openParking === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    −
                  </button>
                  <span>{propertyDetails.openParking}</span>
                  <button
                    type="button"
                    onClick={() => handlePropertyDetailChange('openParking', propertyDetails.openParking + 1)}
                    className="w-8 h-8 rounded-full border text-lg"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Floor Details */}
        {(fieldsToShow.includes('totalFloors') || fieldsToShow.includes('floorNumber')) && (
          <div className="mt-6">
            <Label className="block text-lg font-semibold text-gray-800 mb-3">Floor Details</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fieldsToShow.includes('totalFloors') && (
                <div className="relative">
                  <input
                    type="text"
                    id="total-floors-field"
                    inputMode="numeric"
                    value={propertyDetails.totalFloors}
                    onChange={e => handlePropertyFloorDetailChange('totalFloors', e.target.value)}
                    placeholder=" "
                    className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                  />
                  <label
                    htmlFor="total-floors-field"
                    className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Total Floors
                  </label>
                </div>
              )}

              {fieldsToShow.includes('floorNumber') && (
                <div className="relative">
                  <select
                    id="floor-number"
                    value={propertyDetails.floorNumber}
                    onChange={e => handlePropertyDetailChange('floorNumber', e.target.value)}
                    className="peer block w-full appearance-none rounded-md border border-gray-300 bg-white/60 px-4 pt-6 pb-2 text-base text-black shadow-sm backdrop-blur-md focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                  >
                    <option value="" disabled hidden></option>
                    {propertyDetails.floorOptions.map((floor, index) => (
                      <option key={index} value={floor}>
                        {floor}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="floor-number"
                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 
                              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Select Floor
                  </label>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Availability Status */}
        {fieldsToShow.includes('availability') && (
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-1">Availability</Label>

            {selectedAction === 'Rent' && (
              <div className="flex gap-3 flex-wrap">
                {['Immediate', 'Within 15 Days', 'Next Month', 'Choose Date'].map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handlePropertyDetailChange('availability', option)}
                    className={`px-4 py-2 rounded border ${
                      propertyDetails.availability === option
                        ? 'bg-blue-600 text-white'
                        : 'border-gray-300 text-gray-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {selectedAction === 'Rent' && propertyDetails.availability === 'Choose Date' && (
              <input
                type="date"
                className="mt-3 border rounded px-3 py-2"
                value={propertyDetails.availabilityDate || ''}
                onChange={(e) => handlePropertyDetailChange('availabilityDate', e.target.value)}
              />
            )}

            {selectedAction === 'Sell' && (
              <>
                <div className="flex gap-4 mt-2">
                  {['Ready to move', 'Under construction'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        handlePropertyDetailChange('availability', status);
                        if (status === "Ready to move") {
                          handlePropertyDetailChange('possessionBy', "");
                        } else {
                          handlePropertyDetailChange('propertyAge', "");
                        }
                      }}
                      className={`px-4 py-2 rounded border ${
                        propertyDetails.availability === status
                          ? 'bg-blue-600 text-white'
                          : 'border-gray-300 text-gray-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {propertyDetails.availability === "Ready to move" && fieldsToShow.includes('propertyAge') && (
                  <div className="mt-4">
                    <Label className="block text-sm font-medium mb-1">Age of Property</Label>
                    <div className="flex gap-3 flex-wrap">
                      {['0-1 years', '1-5 years', '5-10 years', '10+ years'].map(age => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => handlePropertyDetailChange('propertyAge', age)}
                          className={`px-4 py-1 rounded border ${
                            propertyDetails.propertyAge === age
                              ? 'bg-blue-600 text-white'
                              : 'border-gray-300 text-gray-600'
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {propertyDetails.availability === "Under construction" && fieldsToShow.includes('possessionBy') && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label className="block text-sm font-medium mb-1">Possession By</Label>
                      <select
                        className="w-[300px] border rounded px-4 py-2 text-gray-700 border-gray-300"
                        value={propertyDetails.possessionBy}
                        onChange={(e) => handlePropertyDetailChange('possessionBy', e.target.value)}
                      >
                        <option value="" disabled>Expected by</option>
                        <option value="3months">Within 3 months</option>
                        <option value="6months">Within 6 months</option>
                        <option value="custom">Choose specific date</option>
                        {Array.from({ length: 6 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return <option key={year} value={year}>{year}</option>;
                        })}
                      </select>
                    </div>

                    {propertyDetails.possessionBy === "custom" && (
                      <div>
                        <Label className="block text-sm font-medium mb-1">Select Date</Label>
                        <input
                          type="date"
                          className="w-[300px] border rounded px-4 py-2 text-gray-700 border-gray-300"
                          value={propertyDetails.possessionDate || ''}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => handlePropertyDetailChange('possessionDate', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderDynamicFieldsStep5 = () => {
    const pricingFieldsToShow = getPricingFieldsToShow();

    return (
      <div className="space-y-4 text-gray-800 relative">
        <h2 className="text-lg font-semibold mt-2 ">Price Details</h2>
        
        {/* Ownership */}
        {selectedAction === 'Sell' && ['Flat/Apartment', 'Independent House / Villa', 'Independent / Builder Floor'].includes(selectedSubtype) && (
          <div id="ownership-field">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 relative">
              Ownership
              <span
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="text-gray-400 cursor-pointer relative"
              >
                <BsPatchQuestionFill className="text-lg" />
                {isHovered && (
                  <div className="absolute z-50 w-80 p-4 bg-white border border-gray-300 rounded-md shadow-md text-sm top-6 left-4">
                    <h3 className="font-semibold mb-2">Types of Ownerships</h3>
                    <p><strong>Freehold:</strong> Full and unconditional ownership.</p>
                    <p><strong>Leasehold:</strong> Partial ownership for a fixed term (90–99 years).</p>
                    <p><strong>Co-operative society:</strong> Group-based legal co-ownership.</p>
                    <p><strong>Power of Attorney:</strong> Legal authority to act on owner's behalf.</p>
                  </div>
                )}
              </span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Freehold', 'Leasehold', 'Co-operative society', 'Power of Attorney'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handlePricingChange('ownership', option)}
                  className={`px-4 py-1 rounded border transition ${
                    pricing.ownership === option ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Price Details */}
        <div id="price-details-field">
          {/* For Rent and lease properties */}
          {(selectedAction === 'Rent' || selectedAction === 'PG') && (
            <div id="price-details-field" className="space-y-4">
              {/* Monthly Rent / Lease Amount */}
              <div>
                <Label className="block text-sm font-medium mb-1">
                  {pricing.lease ? 'Lease Amount (₹)' : 'Monthly Rent (₹)'}
                </Label>
                <input
                  type="tel"
                  value={propertyDetails.monthlyRent}
                  onChange={(e) => handlePropertyDetailChange('monthlyRent', e.target.value)}
                  className="w-full max-w-md border rounded px-3 py-2"
                  placeholder={pricing.lease ? 'Enter lease amount' : 'Enter monthly rent'}
                />
              </div>

              {/* Lease Toggle */}
              {pricingFieldsToShow.includes('lease') && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pricing.lease}
                    onChange={(e) => handlePricingChange('lease', e.target.checked)}
                  />
                  It's a Lease
                </label>
              )}

              {/* Lease-Specific Fields */}
              {pricing.lease && (
                <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                  <div>
                    <Label className="block text-sm font-medium mb-1">Lease Duration</Label>
                    <select
                      value={pricing.leaseDuration || ''}
                      onChange={(e) => handlePricingChange('leaseDuration', e.target.value)}
                      className="w-full max-w-md border rounded px-3 py-2"
                    >
                      <option value="">Select lease duration</option>
                      <option value="6 months">6 months</option>
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                      <option value="3 years">3 years</option>
                      <option value="5 years">5 years</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Regular Deposit */}
              {!pricing.lease && pricingFieldsToShow.includes('deposit') && (
                <div>
                  <Label className="block text-sm font-medium mb-1">Deposit (₹)</Label>
                  <input
                    type="tel"
                    value={propertyDetails.deposit}
                    onChange={(e) => handlePropertyDetailChange('deposit', e.target.value)}
                    className="w-full max-w-md border rounded px-3 py-2"
                    placeholder="Enter deposit amount"
                  />
                </div>
              )}

              {/* Price Negotiable */}
              {pricingFieldsToShow.includes('priceNegotiable') && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pricing.priceNegotiable}
                    onChange={(e) => handlePricingChange('priceNegotiable', e.target.checked)}
                  />
                  Price Negotiable
                </label>
              )}
              
              {/* Additional Charges */}
              {pricingFieldsToShow.includes('additionalCharges') && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdditionalCharges(!showAdditionalCharges)}
                    className="text-blue-600 hover:underline flex items-center gap-1 mb-2"
                  >
                    {showAdditionalCharges ? (
                      <>
                        <span>-</span> Hide Additional Charges
                      </>
                    ) : (
                      <>
                        <span>+</span> Additional Charges
                      </>
                    )}
                  </button>

                  {showAdditionalCharges && (
                    <div className="space-y-4 border rounded-lg p-4">
                      <div key="Monthly Charges" className="space-y-2">
                        <h4 className="font-medium text-gray-700">Monthly Charges</h4>
                        {['Maintenance', 'Water'].map((chargeName) => {
                          return (
                            <div key={chargeName} className="flex flex-col gap-1">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={pricing.additionalCharges?.some(c => c.name === chargeName)}
                                  onChange={(e) => {
                                    const newCharges = [...(pricing.additionalCharges || [])];
                                    if (e.target.checked) {
                                      newCharges.push({name: chargeName, amount: ''});
                                    } else {
                                      const index = newCharges.findIndex(c => c.name === chargeName);
                                      if (index !== -1) newCharges.splice(index, 1);
                                    }
                                    handlePricingChange('additionalCharges', newCharges);
                                  }}
                                />
                                {chargeName}
                              </label>
                              {pricing.additionalCharges?.some(c => c.name === chargeName) && (
                                <input
                                  type="x`"
                                  placeholder="Amount"
                                  value={pricing.additionalCharges.find(c => c.name === chargeName)?.amount || ''}
                                  onChange={(e) => {
                                    const newCharges = [...(pricing.additionalCharges || [])];
                                    const chargeIndex = newCharges.findIndex(c => c.name === chargeName);
                                    if (chargeIndex !== -1) {
                                      newCharges[chargeIndex].amount = e.target.value;
                                      handlePricingChange('additionalCharges', newCharges);
                                    }
                                  }}
                                  className="ml-6 border rounded px-2 py-1 text-sm w-24"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Selected Charges Display */}
              {pricing.additionalCharges?.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700">Selected Additional Charges:</p>
                    <span className="text-xs text-gray-500">
                      {pricing.additionalCharges.length} selected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pricing.additionalCharges.map(charge => (
                      <div 
                        key={charge.name} 
                        className="relative bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-sm flex items-center"
                      >
                        {charge.name}
                        {charge.amount && ` (₹${charge.amount})`}
                        <button
                          type="button"
                          onClick={() => {
                            handlePricingChange(
                              'additionalCharges', 
                              pricing.additionalCharges.filter(c => c.name !== charge.name)
                            );
                          }}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <MdClose className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* For Sell properties */}
          {selectedAction === 'Sell' && pricingFieldsToShow.includes('expectedPrice') && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Expected Price */}
              <div className="relative">
                <input
                  type="text"
                  id="expected-price-field"
                  inputMode="numeric"
                  value={pricing.expectedPrice}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    handlePricingChange('expectedPrice', val);
                  }}
                  placeholder=" "
                  className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                />
                <label
                  htmlFor="expected-price-field"
                  className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  ₹ Expected Price
                </label>
              </div>

              {/* Price per Sq.Ft. */}
              {pricingFieldsToShow.includes('pricePerSqft') && (
                <div className="relative">
                  <input
                    type="text"
                    id="price-per-sqft-field"
                    inputMode="numeric"
                    value={pricing.pricePerSqft}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      handlePricingChange('pricePerSqft', val);
                    }}
                    placeholder=" "
                    className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                  />
                  <label
                    htmlFor="price-per-sqft-field"
                    className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    ₹ Price per sq.ft.
                  </label>
                </div>
              )}
            </div>
          )}

          {/* For Commercial Rent properties */}
          {selectedType === 'Commercial' && selectedAction === 'Rent' && pricingFieldsToShow.includes('leaseDuration') && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {pricingFieldsToShow.includes('leaseDuration') && (
                <select
                  value={pricing.leaseDuration}
                  onChange={(e) => handlePricingChange('leaseDuration', e.target.value)}
                  className="border rounded-md px-3 py-2 w-full"
                >
                  <option value="">Select Lease Duration</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="5 years">5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              )}

              {pricingFieldsToShow.includes('noticePeriod') && (
                <input
                  type="number"
                  placeholder="Notice Period (months)"
                  value={pricing.noticePeriod}
                  onChange={(e) => handlePricingChange('noticePeriod', e.target.value)}
                  className="border rounded-md px-3 py-2 w-full"
                />
              )}

              {pricingFieldsToShow.includes('rentEscalation') && (
                <input
                  type="text"
                  placeholder="Rent Escalation (%)"
                  value={pricing.rentEscalation}
                  onChange={(e) => handlePricingChange('rentEscalation', e.target.value)}
                  className="border rounded-md px-3 py-2 w-full"
                />
              )}
            </div>
          )}

          {/* Price options checkboxes */}
          <div className="mt-4 flex flex-col gap-2 text-sm">
            {pricingFieldsToShow.includes('allInclusive') && (
              <label className="flex items-center gap-2  relative">
                <input
                  type="checkbox"
                  checked={pricing.allInclusive}
                  onChange={(e) => handlePricingChange('allInclusive', e.target.checked)}
                />
                All inclusive price
                <span className="group text-gray-400 cursor-pointer">
                  <BsPatchQuestionFill />
                  <div className="absolute right-10 top-4 z-50 w-80 p-4 bg-white border border-gray-300 rounded-md shadow-lg text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                    <h3 className="font-semibold mb-2">All Inclusive Price</h3>
                    <p>Includes:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>Base Price</li>
                      <li>PLC Charges</li>
                      <li>Parking</li>
                      <li>EDC/IDC</li>
                      <li>Lease Rent</li>
                      <li>Maintenance</li>
                      <li>Infrastructure fees</li>
                      <li>Amenities</li>
                      <li>Club Membership</li>
                      <li>Power Back-up</li>
                    </ul>
                  </div>
                </span>
              </label>
            )}

            {pricingFieldsToShow.includes('taxExcluded') && (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={pricing.taxExcluded}
                  onChange={(e) => handlePricingChange('taxExcluded', e.target.checked)}
                />
                Tax and Govt. charges excluded
              </label>
            )}
          </div>
        </div>

        {/* Brokerage */}
        {(selectedAction !== 'PG' && pricingFieldsToShow.includes('brokerage')) && (
          <div id="brokerage-field">
            <h2 className="text-lg font-semibold mb-2">Do you charge brokerage?</h2>
            <div className="flex items-center gap-6">
              {['Yes', 'No'].map(option => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={option}
                    checked={pricing.brokerage === option}
                    onChange={(e) => handlePricingChange('brokerage', e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Property Description */}
        <div id="description-field">
          <h2 className="text-lg font-semibold mb-1">What makes your property unique</h2>
          <p className="text-sm text-gray-500 mb-2">Adding description will increase your listing visibility</p>
          <textarea
            className="resize-none w-full border rounded-md p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 border-gray-300 focus:ring-blue-500"
            rows={5}
            placeholder="Share some details about your property like spacious rooms, well maintained facilities..."
            value={pricing.propertyDescription}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length <= 5000) handlePricingChange('propertyDescription', val);
            }}
          />
          <div className="flex justify-between mt-1 text-sm">
            <span className="text-gray-500">
              {pricing.propertyDescription.trim().length >= 30
                ? "Looks good!"
                : "Minimum 30 characters recommended"}
            </span>
            <span className="text-gray-500">
              {pricing.propertyDescription.trim().length} characters / 5000 max
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="main">
      <div className="max-w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-7xl">
          <Card className="overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[620px]">
              {/* Left Fixed Section */}
              <div className="bg-blue-600 p-8 text-white h-full">
                <h2 className="text-3xl font-bold mb-6">List Your Property in 7 Simple Steps</h2>
                <div className="space-y-6">
                  {[
                    { title: "Property Basics", desc: "Select property type and category" },
                    { title: "Location Details", desc: "Enter property address and features" },
                    { title: "Photos & Videos", desc: "Upload property images and videos" },
                    { title: "Property Details", desc: "Specify rooms, area, and amenities" },
                    { title: "Pricing and Details",desc: "Set your asking price and terms" },
                    { title: "Your Details", desc: "Provide your company information" },
                    { title: "Review & Submit", desc: "Verify all details before submission" },
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= idx + 1 ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'}`}>
                          <span className="font-semibold">{idx + 1}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{s.title}</h3>
                        <p className="text-blue-100">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Dynamic Section */}
              <div className="bg-white p-8 flex flex-col h-full overflow-auto">
                {isSubmitted ? (
                  <div className="thank-you-message">
                    <div className="flex items-center justify-center min-h-[60vh] bg-white">
                      <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg max-w-md w-full">
                        <IoMdCheckmarkCircle className="text-green-500 text-6xl mx-auto mb-4" />
                        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Property Under Review</h1>
                        <p className="text-gray-600 mb-4">
                          Thank you for submitting your property details. Our team will review it shortly.
                        </p>
                        <p className="text-gray-500 mb-6">Once approved, your property will be listed on the platform.</p>
                        <a
                          href="/"
                          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                          Go to Home
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        {step === 1 && 'Start Listing Your Property'}
                        {step === 2 && 'Enter Property Details'}                        
                        {step === 3 && 'Photos & Videos'}
                        {step === 4 && 'Property Profile'}
                        {step === 5 && 'Pricing'}
                        {step === 6 && 'Your Profile'}
                        {step === 7 && 'Review Your Listing'}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Step 1 - Property Basics */}
                        {step === 1 && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-base font-light">You're looking to...</Label>
                              <div className="flex gap-2">
                                {['Sell', 'Rent'].map(action => (
                                  <Button
                                    key={action}
                                    type="button"
                                    variant={selectedAction === action ? "default" : "outline"}
                                    size="sm"
                                    className={`w-20 rounded ${selectedAction === action ? 'bg-blue-600 text-white' : ''}`}
                                    onClick={() => setSelectedAction(action)}
                                  >
                                    {action}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-base font-light">Property Type</Label>
                              <div className="flex flex-wrap gap-2">
                                {['Residential', 'Commercial'].map(type => {
                                  const isDisabled = selectedAction === 'PG' && type === 'Commercial';
                                  return (
                                    <Button
                                      key={type}
                                      type="button"
                                      variant={selectedType === type ? "default" : "outline"}
                                      size="sm"
                                      disabled={isDisabled}
                                      className={`w-31 rounded ${selectedType === type ? 'bg-blue-600 text-white' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                      onClick={() => !isDisabled && setSelectedType(type)}
                                    >
                                      {type}
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>

                            {propertyConfig[selectedType]?.[selectedAction]?.subtypes?.length > 0 && (
                              <div className="space-y-2">
                                <Label className="text-base font-light">Property Subtype</Label>
                                <div className="flex flex-wrap gap-2">
                                  {getAvailableSubtypes().map(subtype => (
                                    <Button
                                      key={subtype}
                                      type="button"
                                      variant={selectedSubtype === subtype ? "default" : "outline"}
                                      size="sm"
                                      className={`px-4 py-2 text-sm rounded ${
                                        selectedSubtype === subtype ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
                                      }`}
                                      onClick={() => setSelectedSubtype(subtype)}
                                    >
                                      {subtype}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        {/* Step 2 - Location & Features */}
                        {step === 2 && (
                          <div className="text-gray-800 space-y-8 max-w-xl mt-4">
                            <div className="grid grid-cols-1 gap-6">
                              {[
                                { label: "City", value: city, setter: setCity, type: "text", placeholder: "Enter city" },
                                { label: "Locality", value: locality, setter: setLocality, type: "text", placeholder: "Enter locality" },
                                { label: "Landmark / Sub Locality", value: subLocality, setter: setSubLocality, type: "text", placeholder: "Enter landmark or sub-locality" },
                                { label: "Property Title", value: propertyTitle, setter: setPropertyTitle, type: "text", placeholder: "e.g. 2 BHK in Singanallur" },
                                { label: "Google Map Link", value: googleMapLink, setter: setGoogleMapLink, type: "url", placeholder: "Paste Google Maps URL" },
                              ].map((field, idx) => (
                                <div key={idx} className="relative">
                                  <input
                                    type={field.type}
                                    value={field.value}
                                    onChange={(e) => field.setter(e.target.value)}
                                    placeholder=" "
                                    className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600  focus:outline-none placeholder-transparent "
                                  />
                                  <label className="pointer-events-none absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                                    {field.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Step 3 - Media */}
                        {step === 3 && (
                          <div className="text-gray-700 space-y-8">
                            {/* Video Upload */}
                            <div>
                              <h2 className="text-xl font-semibold mb-2">Add one video of property</h2>
                              <p className="text-sm text-gray-500 mb-4">
                                A video is worth a thousand pictures. Properties with videos get higher page views. Make sure it follows the 
                                <button
                                  type='button'
                                  onClick={() => setShowVideoGuidelines(true)}
                                  className="text-blue-600 underline ml-1 cursor-pointer"
                                >
                                  Video Guidelines
                                </button>.
                              </p>

                              {/* Modal for Video Guidelines */}
                              {showVideoGuidelines && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity">
                                  <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative animate-fadeIn">
                                    <button
                                      className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
                                      onClick={() => setShowVideoGuidelines(false)}
                                    >
                                      &times;
                                    </button>
                                    <h2 className="text-lg font-semibold mb-2">Video Guidelines</h2>
                                    <p className="text-sm text-gray-600 mb-4">Here is list of do's and don'ts of video content</p>
                                    <ul className="space-y-2 p-3 text-sm">
                                      <li className="text-green-600"><GiCheckMark className='inline-block text-black'/> Provide a walkthrough of the property</li>
                                      <li className="text-green-600"><GiCheckMark className='inline-block text-black'/> Cover all rooms</li>
                                      <li className="text-green-600"><GiCheckMark className='inline-block text-black'/> Typical video duration: 60s to 120s</li>
                                      <li className="text-green-600"><GiCheckMark className='inline-block text-black'/> Video should be well lit</li>
                                      <li className="text-green-600"><GiCheckMark className='inline-block text-black'/> Voiceover/copyright free music allowed on video</li>
                                      <li className="text-green-600"><GiCheckMark className='inline-block text-black'/> Video should be of the same property</li>
                                      <li className="text-red-500"><MdClose className='inline-block text-black'/> Video footage should not be shaky</li>
                                      <li className="text-red-500"><MdClose className='inline-block text-black'/> Email, phone nos., and text not allowed on property video</li>
                                      <li className="text-red-500"><MdClose className='inline-block text-black'/> Ensure YouTube video settings are not private</li>
                                      <li className="text-red-500"><MdClose className='inline-block text-black'/> Do not upload obscene or inappropriate content</li>
                                    </ul>
                                    <div className="mt-6 text-center">
                                      <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        onClick={() => setShowVideoGuidelines(false)}
                                      >
                                        Ok, got it
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Upload UI */}
                              <div className="bg-gray-800 text-white text-center p-6 rounded-md relative">
                                <span className="absolute top-0 right-0 bg-orange-400 text-xs text-white px-2 py-1 rounded-bl-md">Only for Infinity Listings</span>
                                <p className="text-md font-semibold mb-2 text-center">Upload Video</p>
                                <p className="text-sm text-gray-300 mb-2">Videos available only with infinity listings only</p>

                                {/* Hidden File Input */}
                                <input
                                  ref={videoInputRef}
                                  type="file"
                                  accept="video/mp4,video/quicktime,video/x-m4v"
                                  className="hidden"
                                  onChange={(e) => handleVideoUpload(e.target.files[0])}
                                />

                                {/* Custom Upload Button */}
                                <button
                                  type="button"
                                  onClick={() => videoInputRef.current && videoInputRef.current.click()}
                                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                  Upload Video
                                </button>

                                {/* Selected file name */}
                                {video && (
                                  <p className="text-sm text-green-400 mt-2">{video.name}</p>
                                )}

                                <p className="text-sm text-gray-400 mt-2">Upload video of max 50 MB in format .mov, .mp4. Video duration should be less than 10 mins.</p>

                                {/* Preview Video */}
                                {videoURL && (
                                  <div className="mt-4">
                                    <video
                                      src={videoURL}
                                      controls
                                      autoPlay
                                      muted
                                      loop
                                      className="w-full max-w-md mx-auto rounded shadow"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Photo Upload */}
                            <div>
                              <h2 className="text-xl font-semibold mb-2">Add photos of your property</h2>
                              <p className="text-sm text-gray-500 mb-4">
                                A picture is worth a thousand words. 87% of buyers look at photos before buying
                              </p>

                              {/* Upload Box */}
                              <div
                                className="border-2 border-dashed border-blue-400 p-6 rounded-md text-center bg-blue-50"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const files = Array.from(e.dataTransfer.files);
                                  handlePhotoUpload(files);
                                }}
                              >
                                <p className="text-blue-600 font-semibold mb-1">+ Add at least 3 photos</p>
                                <p className="text-sm text-gray-600 mb-4">Drag and drop your photos here</p>

                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={(e) => handlePhotoUpload(Array.from(e.target.files))}
                                />

                                <button
                                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                  type="button"
                                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                >
                                  Upload Photos Now
                                </button>

                                {photos.length > 0 && (
                                  <p className="text-sm text-gray-500 mt-2">
                                    {photos.length} photo{photos.length > 1 ? "s" : ""} selected
                                  </p>
                                )}
                              </div>

                              {/* Thumbnails */}
                              {photos.length > 0 && (
                                <div className="mt-4">
                                  {/* Slider buttons */}
                                  {photos.length > 5 && (
                                    <div className="flex justify-between mb-2">
                                      <button
                                        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                        disabled={currentIndex === 0}
                                        className="text-sm px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
                                      >
                                        <GrCaretPrevious className="inline-block text-[#010101]" /> Prev
                                      </button>
                                      <button
                                        onClick={() =>
                                          setCurrentIndex((prev) => Math.min(prev + 1, photos.length - 5))
                                        }
                                        disabled={currentIndex >= photos.length - 5}
                                        className="text-sm px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
                                      >
                                        Next <GrCaretNext className="inline-block text-[#010101]" />
                                      </button>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {photos.slice(currentIndex, currentIndex + 5).map((photo, index) => {
                                      const globalIndex = currentIndex + index;
                                      const isCover = globalIndex === coverPhotoIndex;

                                      return (
                                        <div
                                          key={index}
                                          className="relative w-36 h-28 border rounded overflow-hidden shadow-sm group"
                                        >
                                          <img
                                            src={photo.preview}
                                            alt={`Photo ${globalIndex + 1}`}
                                            className="w-full h-full object-cover"
                                          />

                                          {/* Cover Selector */}
                                          <div className="absolute bottom-1 left-1 flex items-center space-x-1 bg-white/80 rounded px-2 py-1">
                                            {!isCover ? (
                                              <label className="flex items-center cursor-pointer text-xs font-medium text-gray-700">
                                                <input
                                                  type="radio"
                                                  className="form-checkbox mr-1 accent-blue-600"
                                                  checked={false}
                                                  onChange={() => setCoverPhotoIndex(globalIndex)}
                                                />
                                                Make Cover Photo
                                              </label>
                                            ) : (
                                              <span className="bg-[#2d2f33] text-white text-xs px-2 py-1 rounded">
                                                Cover photo
                                              </span>
                                            )}
                                          </div>

                                          {/* Remove Button */}
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleRemovePhoto(globalIndex);
                                            }}
                                            className="absolute top-0 right-0 bg-white/60 text-red-600 text-sm rounded-full w-5 h-5 flex items-center justify-center shadow"
                                            title="Remove"
                                          >
                                            <MdDelete  className="text-black" />
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 p-3 rounded-md bg-orange-50 border border-orange-200 text-sm text-gray-700 max-w-md">
                              <FcInfo className="w-4 h-4 text-orange-500" />
                              <span>Without photos your ad will be ignored by buyers</span>
                            </div>
                          </div>
                        )}

                        {/* Step 4 - Property Details */}
                        {step === 4 && (
                          <div className="h-full">
                            {renderDynamicFieldsStep4()}
                          </div>
                        )}

                        {/* Step 5 - Pricing */}
                        {step === 5 && (
                          <div className="h-full">
                            {renderDynamicFieldsStep5()}
                          </div>
                        )}

                        {/* Step 6 - Company Details */}
                        {step === 6 && (
                          <div>
                            <div className="max-w-3xl mx-auto px-6 py-10">
                              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                                Before you post… Let buyers know who you are
                              </h2>
                              <p className="text-gray-600 mb-8">
                                These details will help serious buyers to connect with you and inspire trust
                              </p>

                              {/* RERA Registration */}
                              <div className="mb-6">
                                <label className="block font-medium mb-2">Are you RERA registered?</label>
                                <div className="flex flex-wrap gap-3">
                                  {["Yes", "I have applied", "Not Applicable"].map((option) => (
                                    <button
                                      key={option}
                                      type="button"
                                      onClick={() => handleCompanyDetailChange('reraStatus', option)}
                                      className={`px-4 py-2 border rounded text-sm font-medium transition ${
                                        companyDetails.reraStatus === option
                                          ? 'bg-blue-500 text-white border-blue-500'
                                          : 'text-gray-700 hover:bg-gray-100 hover:border-blue-500'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* License Type */}
                              <div className="mb-6">
                                <label className="block font-medium mb-2">License Type</label>
                                <div className="flex gap-4">
                                  {["Individual", "Firm"].map((type) => (
                                    <button
                                      key={type}
                                      type="button"
                                      onClick={() => handleCompanyDetailChange('licenseType', type)}
                                      className={`px-4 py-2 border rounded text-sm font-medium transition ${
                                        companyDetails.licenseType === type
                                          ? 'bg-blue-500 text-white border-blue-500'
                                          : 'text-gray-700 hover:bg-gray-100 hover:border-blue-500'
                                      }`}
                                    >
                                      {type}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Individual Personal Details */}
                              {companyDetails.licenseType === "Individual" && (
                                <div className="mb-6">
                                  <h3 className="text-lg font-medium mb-3">Your Personal Details</h3>
                                  <div className="space-y-4">
                                    <div className="relative">
                                      <input
                                        type="text"
                                        value={companyDetails.fullName}
                                        onChange={(e) => handleCompanyDetailChange('fullName', e.target.value)}
                                        placeholder=" "
                                        className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                                      />
                                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                        Full Name
                                      </label>
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="email"
                                        value={companyDetails.email}
                                        onChange={(e) => handleCompanyDetailChange('email', e.target.value)}
                                        placeholder=" "
                                        className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                                      />
                                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                        Email
                                      </label>
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="tel"
                                        value={companyDetails.phone}
                                        onChange={(e) => handleCompanyDetailChange('phone', e.target.value)}
                                        placeholder=" "
                                        className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                                      />
                                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                        Phone Number
                                      </label>
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        value={companyDetails.address}
                                        onChange={(e) => handleCompanyDetailChange('address', e.target.value)}
                                        placeholder=" "
                                        className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                                      />
                                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                        Your Address
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Company Details */}
                              {companyDetails.licenseType === "Firm" && (
                                <div className="mb-6">
                                  <h3 className="text-lg font-medium mb-3">Company Details</h3>
                                  <div className="space-y-4">
                                    <div className="relative">
                                      <input
                                        type="text"
                                        value={companyDetails.companyName}
                                        onChange={(e) => handleCompanyDetailChange('companyName', e.target.value)}
                                        placeholder=" "
                                        className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                                      />
                                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                        Company Name
                                      </label>
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        placeholder="Company URL (Optional)"
                                        className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                                      />
                                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                        Company URL
                                      </label>
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        value={companyDetails.companyAddress1}
                                        onChange={(e) => handleCompanyDetailChange('companyAddress1', e.target.value)}
                                        placeholder=" "
                                        className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                                      />
                                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                        Company Address 1
                                      </label>
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        placeholder="Company Address 2 (Optional)"
                                        className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                                      />
                                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                        Company Address 2
                                      </label>
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        value={companyDetails.location}
                                        onChange={(e) => handleCompanyDetailChange('location', e.target.value)}
                                        placeholder=" "
                                        className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent"
                                      />
                                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                        City
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Company Description */}
                              {companyDetails.licenseType === "Firm" && (
                                <div className="mb-6">
                                  <label className="block font-medium mb-2">Describe your company</label>
                                  <div className="relative">
                                    <textarea
                                      rows="4"
                                      placeholder=" "
                                      value={companyDetails.companyDesc}
                                      onChange={(e) => handleCompanyDetailChange('companyDesc', e.target.value)}
                                      className="peer block w-full appearance-none border border-gray-300 bg-white/60 backdrop-blur-md rounded-sm px-4 pt-6 pb-2 text-base shadow-sm transition-all focus:border-blue-600 focus:outline-none placeholder-transparent resize-none"
                                    ></textarea>
                                    <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all transform scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-2">
                                      Company Description
                                    </label>
                                  </div>
                                  <div className="flex justify-between mt-1 text-sm">
                                    <span className="text-gray-500">
                                      {companyDetails.companyDesc.trim().length} characters
                                    </span>
                                    <span className="text-gray-500">Minimum 30 characters recommended</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Step 7 - Review */}
                        {step === 7 && (
                          <div className="space-y-8">
                            <h2 className="text-2xl font-bold mb-6">Review Your Property Details</h2>
                            <div className="text-center py-10">
                              <p className="text-lg">Review step will be implemented here</p>
                            </div>
                          </div>
                        )}

                        {/* Step Navigation */}
                        <div className="flex justify-between items-center pt-4">
                          {step > 1 && step <= 6 && (
                            <Button type="button" onClick={handleBack} variant="outline" className=" hover:bg-blue-600 hover:text-white transition duration-500">
                              Back
                            </Button>
                          )}
                          {step < 7 ? (
                            <Button
                              type="button"
                              onClick={handleNext}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              disabled={step === 1 && !selectedSubtype}
                            >
                              Next
                            </Button>
                          ) : null}
                        </div>
                      </form>
                    </CardContent>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;
