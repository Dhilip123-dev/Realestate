import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { Label } from '@/components/ui/label';
import { BsPatchQuestionFill } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { IoMdCheckmarkCircle } from "react-icons/io";

const PostProperty = () => {
  // Step 1
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubtype, setSelectedSubtype] = useState('');
  const [step, setStep] = useState(1);
  const [step1Errors, setStep1Errors] = useState({
    action: false,
    type: false,
    subtype: false
  });

  // Step 2
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [subLocality, setSubLocality] = useState("");
  const [society, setSociety] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState({
    amenities: [],
    propertyFeatures: [],
    societyFeatures: [],
  });
  const [step2Errors, setStep2Errors] = useState({
    city: false,
    locality: false,
    subLocality: false,
    society: false
  });

  // Step 3
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [balconies, setBalconies] = useState(null);
  const [carpetArea, setCarpetArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("sq.ft.");
  const [otherRooms, setOtherRooms] = useState([]);
  const [furnishing, setFurnishing] = useState("");
  const [coveredParking, setCoveredParking] = useState(0);
  const [openParking, setOpenParking] = useState(0);
  const [totalFloors, setTotalFloors] = useState("");
  const [propertyOnFloor, setPropertyOnFloor] = useState("");
  const [availability, setAvailability] = useState("");
  const [propertyAge, setPropertyAge] = useState("");
  const [possessionBy, setPossessionBy] = useState("");
  const [step3Errors, setStep3Errors] = useState({
    bedrooms: false,
    bathrooms: false,
    totalFloors: false,
    propertyOnFloor: false,
    availability: false,
    propertyAge: false,
    possessionBy: false,
    carpetArea: false
  });

  // Step 4 
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const videoInputRef = useRef(null);
  const [showVideoGuidelines, setShowVideoGuidelines] = useState(false);
  const [step4Errors, setStep4Errors] = useState({
    photos: false
  });

  // Step 5
  const [ownership, setOwnership] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [pricePerSqft, setPricePerSqft] = useState('');
  const [allInclusive, setAllInclusive] = useState(false);
  const [taxExcluded, setTaxExcluded] = useState(false);
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [brokerage, setBrokerage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [propertyDescription, setPropertyDescription] = useState('');
  const [step5Errors, setStep5Errors] = useState({
    ownership: false,
    expectedPrice: false,
    pricePerSqft: false,
    brokerage: false,
    description: false
  });

  // Step 6
  const [reraStatus, setReraStatus] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress1, setCompanyAddress1] = useState("");
  const [location, setLocation] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [step6Errors, setStep6Errors] = useState({
    reraStatus: false,
    licenseType: false,
    companyName: false,
    companyAddress1: false,
    location: false,
    companyDesc: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const propertySubtypes = {
    Residential: {
      Rent: ['Flat/Apartment', 'Independent House / Villa', 'Independent / Builder Floor', '1 RK/ Studio Apartment', 'Farmhouse', 'Other'],
      Sell: ['Flat/Apartment', 'Independent House / Villa', 'Independent / Builder Floor', 'Plot / Land', '1 RK/ Studio Apartment', 'Farmhouse', 'Other'],
      PG: ['Boys PG', 'Girls PG', 'Hostel', 'Other']
    },
    Commercial: {
      Rent: ['Office Space', 'Retail Shop', 'Warehouse', 'Industrial Building', 'Showroom', 'Hotel/Resort', 'Other'],
      Sell: ['Office Space', 'Retail Shop', 'Warehouse', 'Industrial Building', 'Commercial Land', 'Showroom', 'Other'],
      PG: []
    }
  };

  const features = {
    amenities: [
      "Maintenance Staff", "Water Storage", "Security / Fire Alarm", "Visitor Parking",
      "Feng Shui / Vaastu Compliant", "Park", "Intercom Facility", "Lift(s)"
    ],
    propertyFeatures: [
      "High Ceiling Height", "False Ceiling Lighting", "Piped-gas", "Internet/wi-fi connectivity",
      "Centrally Air Conditioned", "Water purifier", "Recently Renovated", "Private Garden / Terrace",
      "Natural Light", "Airy Rooms", "Spacious Interiors"
    ],
    societyFeatures: [
      "Water softening plant", "Shopping Centre", "Fitness Centre / GYM", "Swimming Pool",
      "Club house / Community Center", "Security Personnel"
    ]
  };

  const toggleFeature = (category, feature) => {
    setSelectedFeatures((prev) => {
      const updated = prev[category].includes(feature)
        ? prev[category].filter(f => f !== feature)
        : [...prev[category], feature];
      return { ...prev, [category]: updated };
    });
  };

  useEffect(() => {
    setSelectedSubtype('');
  }, [selectedType, selectedAction]);

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSubmitted]);

  // Validation functions for each step
  const validateStep1 = () => {
    const errors = {
      action: !selectedAction,
      type: !selectedType,
      subtype: !selectedSubtype
    };
    setStep1Errors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const validateStep2 = () => {
    const errors = {
      city: !city.trim(),
      locality: !locality.trim(),
      subLocality: !subLocality.trim(),
      society: !society.trim()
    };
    setStep2Errors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const validateStep3 = () => {
    const errors = {
      bedrooms: !bedrooms,
      bathrooms: !bathrooms,
      totalFloors: !totalFloors,
      propertyOnFloor: !propertyOnFloor,
      availability: !availability,
      propertyAge: availability === "Ready to move" && !propertyAge,
      possessionBy: availability === "Under construction" && !possessionBy,
      carpetArea: !carpetArea || isNaN(Number(carpetArea)) || Number(carpetArea) <= 0
    };
    setStep3Errors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const validateStep4 = () => {
    const errors = {
      photos: photos.length < 3
    };
    setStep4Errors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const validateStep5 = () => {
    const errors = {
      ownership: !ownership,
      expectedPrice: !expectedPrice || isNaN(Number(expectedPrice)) || Number(expectedPrice) <= 0,
      pricePerSqft: !pricePerSqft || isNaN(Number(pricePerSqft)) || Number(pricePerSqft) <= 0,
      brokerage: !brokerage,
      description: propertyDescription.trim().length < 30
    };
    setStep5Errors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const validateStep6 = () => {
    const errors = {
      reraStatus: !reraStatus,
      licenseType: !licenseType,
      companyName: !companyName.trim(),
      companyAddress1: !companyAddress1.trim(),
      location: !location.trim(),
      companyDesc: !companyDesc.trim() || companyDesc.trim().length < 30
    };
    setStep6Errors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 6) {
      if (!validateStep6()) {
        scrollToFirstError();
        return;
      }
      
      const formData = {
        action: selectedAction,
        type: selectedType,
        subtype: selectedSubtype,
        location: { city, locality, subLocality, society },
        features: selectedFeatures,
        propertyDetails: {
          bedrooms,
          bathrooms,
          balconies,
          carpetArea,
          areaUnit,
          otherRooms,
          furnishing,
          parking: { covered: coveredParking, open: openParking },
          floors: { total: totalFloors, propertyOn: propertyOnFloor },
          availability,
          ...(availability === "Ready to move" ? { propertyAge } : { possessionBy })
        },
        media: { photos, coverPhotoIndex, video },
        pricing: {
          ownership,
          expectedPrice,
          pricePerSqft,
          allInclusive,
          taxExcluded,
          priceNegotiable,
          brokerage,
          propertyDescription
        },
        companyDetails: {
          reraStatus,
          licenseType,
          companyName,
          companyAddress1,
          location,
          companyDesc
        }
      };
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      resetFormFields();
    }
  };

  const scrollToFirstError = () => {
    const firstError = document.querySelector('.border-red-500, .text-red-500');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const resetFormFields = () => {
    setSelectedAction('');
    setSelectedType('');
    setSelectedSubtype('');
    setCity('');
    setLocality('');
    setSubLocality('');
    setSociety('');
    setSelectedFeatures({
      amenities: [],
      propertyFeatures: [],
      societyFeatures: []
    });
    setBedrooms(null);
    setBathrooms(null);
    setBalconies(null);
    setCarpetArea('');
    setAreaUnit('sq.ft.');
    setOtherRooms([]);
    setFurnishing('');
    setCoveredParking(0);
    setOpenParking(0);
    setTotalFloors('');
    setPropertyOnFloor('');
    setAvailability('');
    setPropertyAge('');
    setPossessionBy('');
    setPhotos([]);
    setCoverPhotoIndex(null);
    setVideo(null);
    setOwnership('');
    setExpectedPrice('');
    setPricePerSqft('');
    setAllInclusive(false);
    setTaxExcluded(false);
    setPriceNegotiable(false);
    setBrokerage('');
    setPropertyDescription('');
    setReraStatus('');
    setLicenseType('');
    setCompanyName('');
    setCompanyAddress1('');
    setLocation('');
    setCompanyDesc('');
    setStep(1);
  };

  const handleNext = () => {
    let isValid = true;
    
    switch(step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      case 5:
        isValid = validateStep5();
        break;
      default:
        break;
    }

    if (!isValid) {
      scrollToFirstError();
      return;
    }

    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const fileInputRef = useRef(null);

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
    
    // Clear photo error if any
    if (updatedPhotos.length >= 3 && step4Errors.photos) {
      setStep4Errors(prev => ({ ...prev, photos: false }));
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
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
      return;
    }
  
    const fileURL = URL.createObjectURL(file); 
    setVideo(file);
    setVideoURL(fileURL);
  };

  useEffect(() => {
    return () => {
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
    };
  }, [videoURL]);

  return (
    <div className="main">
      <div className="max-w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-7xl">
          <Card className="overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[620px]">
              {/* Left Fixed Section */}
              <div className="bg-blue-600 p-8 text-white h-full">
                <h2 className="text-3xl font-bold mb-6">List Your Property in 3 Simple Steps</h2>
                <div className="space-y-6">
                  {[
                    { title: "Location Details", desc: "Tell us about your property type and location" },
                    { title: "Property Details", desc: "Share specifications and amenities" },
                    { title: "Property Profile", desc: "Ur Amenties" },
                    { title: "Photos, Videos", desc: "high-quality images to attract buyers" },
                    { title: "Pricing & Others", desc: "Pricing" },
                    { title: "Admin Apporoval", desc: "Our team will verify and publish your listing" },
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
                        {step === 3 && 'Property Profile'}
                        {step === 4 && 'Photos, Videos'}
                        {step === 5 && 'Pricing & Others'}
                        {step === 6 && 'Your Profile'}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-base font-light">You're looking to...</Label>
                              <div className="flex gap-2">
                                {['Sell', 'Rent', 'PG'].map(action => (
                                  <Button
                                    key={action}
                                    type="button"
                                    variant={selectedAction === action ? "default" : "outline"}
                                    size="sm"
                                    className={`w-20 rounded ${selectedAction === action ? 'bg-blue-600 text-white' : ''} ${step1Errors.action ? 'border-red-500' : ''}`}
                                    onClick={() => {
                                      setSelectedAction(action);
                                      if (step1Errors.action) {
                                        setStep1Errors(prev => ({ ...prev, action: false }));
                                      }
                                    }}
                                  >
                                    {action}
                                  </Button>
                                ))}
                              </div>
                              {step1Errors.action && <p className="text-sm text-red-500">Please select an action</p>}
                            </div>

                            <div className="space-y-2">
                              <Label className="text-base font-light">You're Looking for...</Label>
                              <div className="flex flex-wrap gap-2">
                                {['Residential', 'Commercial'].map(type => (
                                  <Button
                                    key={type}
                                    type="button"
                                    variant={selectedType === type ? "default" : "outline"}
                                    size="sm"
                                    className={`w-31 rounded ${selectedType === type ? 'bg-blue-600 text-white' : ''} ${step1Errors.type ? 'border-red-500' : ''}`}
                                    onClick={() => {
                                      setSelectedType(type);
                                      if (step1Errors.type) {
                                        setStep1Errors(prev => ({ ...prev, type: false }));
                                      }
                                    }}
                                  >
                                    {type}
                                  </Button>
                                ))}
                              </div>
                              {step1Errors.type && <p className="text-sm text-red-500">Please select a property type</p>}
                            </div>

                            {propertySubtypes[selectedType]?.[selectedAction]?.length > 0 && (
                              <div className="space-y-2">
                                <Label className="text-base font-light">What kind of property do you have?</Label>
                                <div className="flex flex-wrap gap-2">
                                  {propertySubtypes[selectedType][selectedAction].map(subtype => (
                                    <Button
                                      key={subtype}
                                      type="button"
                                      variant={selectedSubtype === subtype ? "default" : "outline"}
                                      size="sm"
                                      className={`px-4 py-2 text-sm rounded ${
                                        selectedSubtype === subtype 
                                          ? 'bg-blue-600 text-white' 
                                          : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
                                      } ${step1Errors.subtype ? 'border-red-500' : ''}`}
                                      onClick={() => {
                                        setSelectedSubtype(subtype);
                                        if (step1Errors.subtype) {
                                          setStep1Errors(prev => ({ ...prev, subtype: false }));
                                        }
                                      }}
                                    >
                                      {subtype}
                                    </Button>
                                  ))}
                                </div>
                                {step1Errors.subtype && <p className="text-sm text-red-500">Please select a property subtype</p>}
                              </div>
                            )}
                          </>
                        )}

                        {step === 2 && (
                          <div className="text-gray-700 space-y-6">
                            {/* Location Fields */}
                            <div className="space-y-4">
                              <Label className="font-sm">Property Located</Label>
                              <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => {
                                  setCity(e.target.value);
                                  if (step2Errors.city) {
                                    setStep2Errors(prev => ({ ...prev, city: false }));
                                  }
                                }}
                                className={`border p-2 w-full rounded ${step2Errors.city ? 'border-red-500' : ''}`}
                              />
                              {step2Errors.city && <p className="text-sm text-red-500">City is required</p>}

                              <Label className="font-sm">Locality / Apartment</Label>
                              <input
                                type="text"
                                placeholder="Locality"
                                value={locality}
                                onChange={(e) => {
                                  setLocality(e.target.value);
                                  if (step2Errors.locality) {
                                    setStep2Errors(prev => ({ ...prev, locality: false }));
                                  }
                                }}
                                className={`border p-2 w-full rounded ${step2Errors.locality ? 'border-red-500' : ''}`}
                              />
                              {step2Errors.locality && <p className="text-sm text-red-500">Locality is required</p>}

                              <Label className="font-sm">Sub Locality</Label>
                              <input
                                type="text"
                                placeholder="Sub Locality"
                                value={subLocality}
                                onChange={(e) => {
                                  setSubLocality(e.target.value);
                                  if (step2Errors.subLocality) {
                                    setStep2Errors(prev => ({ ...prev, subLocality: false }));
                                  }
                                }}
                                className={`border p-2 w-full rounded ${step2Errors.subLocality ? 'border-red-500' : ''}`}
                              />
                              {step2Errors.subLocality && <p className="text-sm text-red-500">Sub locality is required</p>}

                              <Label className="font-sm">Apartment / Society</Label>
                              <input
                                type="text"
                                placeholder="Society"
                                value={society}
                                onChange={(e) => {
                                  setSociety(e.target.value);
                                  if (step2Errors.society) {
                                    setStep2Errors(prev => ({ ...prev, society: false }));
                                  }
                                }}
                                className={`border p-2 w-full rounded ${step2Errors.society ? 'border-red-500' : ''}`}
                              />
                              {step2Errors.society && <p className="text-sm text-red-500">Society is required</p>}
                            </div>

                            {/* Amenities */}
                            <div className="space-y-2">
                              <h3 className="font-medium">Amenities</h3>
                              <div className="flex flex-wrap gap-2">
                                {features.amenities.map((item) => (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() => toggleFeature("amenities", item)}
                                    className={`px-3 py-1 border rounded text-sm transition ${
                                      selectedFeatures.amenities.includes(item)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700'
                                    }`}
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Property Features */}
                            <div className="space-y-2">
                              <h3 className="font-medium">Property Features</h3>
                              <div className="flex flex-wrap gap-2">
                                {features.propertyFeatures.map((item) => (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() => toggleFeature("propertyFeatures", item)}
                                    className={`px-3 py-1 border rounded text-sm transition ${
                                      selectedFeatures.propertyFeatures.includes(item)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700'
                                    }`}
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Society / Building Features */}
                            <div className="space-y-2">
                              <h3 className="font-medium">Society / Building Features</h3>
                              <div className="flex flex-wrap gap-2">
                                {features.societyFeatures.map((item) => (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() => toggleFeature("societyFeatures", item)}
                                    className={`px-3 py-1 border rounded text-sm transition ${
                                      selectedFeatures.societyFeatures.includes(item)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700'
                                    }`}
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="text-gray-700 space-y-6">
                            <Label className="text-2xl">Tell us about your property</Label>

                            <div className="space-y-6">
                              <h3 className="text-lg font-semibold text-gray-800">Add Room Details</h3>

                              {/* Bedrooms */}
                              <div>
                                <Label className="block text-sm font-medium mb-2">No. of Bedrooms *</Label>
                                <div className="flex gap-2 mb-1 cursor-pointer">
                                  {[1, 2, 3, 4, 5].map(num => (
                                    <button
                                      key={num}
                                      type="button"
                                      onClick={() => {
                                        setBedrooms(num);
                                        if (step3Errors.bedrooms) {
                                          setStep3Errors(prev => ({ ...prev, bedrooms: false }));
                                        }
                                      }}
                                      className={`w-10 h-10 rounded-full border ${
                                        bedrooms === num
                                          ? 'transition-colors duration-200 text-white bg-blue-600'
                                          : 'border-gray-300 text-gray-600'
                                      } ${
                                        step3Errors.bedrooms ? 'border-red-500' : ''
                                      }`}
                                    >
                                      {num}
                                    </button>
                                  ))}
                                </div>                            
                                {step3Errors.bedrooms && (
                                  <p className="text-sm text-red-500 mt-1">Please select number of bedrooms</p>
                                )}
                              </div>

                              {/* Bathrooms */}
                              <div>
                                <Label className="block text-sm font-medium mb-2">No. of Bathrooms *</Label>
                                <div className="flex gap-2 mb-1">
                                  {[1, 2, 3, 4, 5].map(num => (
                                    <button
                                      key={num}
                                      type="button"
                                      onClick={() => {
                                        setBathrooms(num);
                                        if (step3Errors.bathrooms) {
                                          setStep3Errors(prev => ({ ...prev, bathrooms: false }));
                                        }
                                      }}
                                      className={`w-10 h-10 rounded-full border ${
                                        bathrooms === num
                                          ? 'transition-colors duration-200 text-white bg-blue-600'
                                          : 'border-gray-300 text-gray-600'
                                      } ${
                                        step3Errors.bathrooms ? 'border-red-500' : ''
                                      }`}
                                    >
                                      {num}
                                    </button>
                                  ))}
                                </div>
                                {step3Errors.bathrooms && (
                                  <p className="text-sm text-red-500 mt-1">Please select number of bathrooms</p>
                                )}
                              </div>

                              {/* Balconies */}
                              <div>
                                <Label className="block text-sm font-medium mb-2">Balconies</Label>
                                <div className="flex gap-2">
                                  {[0, 1, 2, 3].map(num => (
                                    <button
                                      key={num}
                                      type="button"
                                      onClick={() => setBalconies(num)}
                                      className={`w-10 h-10 rounded-full border ${
                                        balconies === num
                                          ? 'transition-colors duration-200 text-white bg-blue-600'
                                          : 'border-gray-300 text-gray-600'
                                      }`}
                                    >
                                      {num}
                                    </button>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => setBalconies(4)}
                                    className={`px-4 h-10 rounded border ${
                                      balconies === 4
                                        ? 'transition-colors duration-200 text-white bg-blue-600'
                                        : 'border-gray-300 text-gray-600'
                                    }`}
                                  >
                                    More than 3
                                  </button>
                                </div>
                              </div>

                              {/* Area Details Section */}
                              <div className="mt-6">
                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                  Add Area Details *
                                  <span className="text-blue-600 cursor-pointer text-lg" title="Area detail helps buyers understand your property better"></span>
                                </Label>
                                <p className="text-xs text-gray-500 mb-2">At least one area type is mandatory</p>

                                <div className={`flex items-center border rounded shadow-sm px-3 py-1 w-full max-w-md ${
                                  step3Errors.carpetArea ? 'border-red-500' : ''
                                }`}>
                                  <div className="flex-1">
                                    <Label className="text-xs text-gray-500">Carpet Area</Label>
                                    <input
                                      type="text"
                                      value={carpetArea}
                                      onChange={(e) => {
                                        setCarpetArea(e.target.value);
                                        if (step3Errors.carpetArea) {
                                          setStep3Errors(prev => ({ ...prev, carpetArea: false }));
                                        }
                                      }}
                                      placeholder="e.g. 1,111"
                                      className="w-full text-base bg-transparent focus:outline-none"
                                    />
                                  </div>
                                  <div className="border-l px-4">
                                    <select
                                      value={areaUnit}
                                      onChange={(e) => setAreaUnit(e.target.value)}
                                      className="bg-transparent focus:outline-none text-gray-700 text-sm p-5"
                                    >
                                      <option value="sq.ft.">sq.ft.</option>
                                      <option value="sq.m.">sq.m.</option>
                                      <option value="acres">acres</option>
                                      <option value="gaj">cent</option>
                                      <option value="hectare">hectare</option>
                                    </select>
                                  </div>
                                </div>
                                {step3Errors.carpetArea && (
                                  <p className="text-sm text-red-500 mt-1">Please enter a valid carpet area</p>
                                )}
                              </div>

                              {/* Other Rooms */}
                              <div>
                                <Label className="block text-sm font-medium mb-2">Other rooms</Label>
                                <div className="flex gap-2 flex-wrap">
                                  {["Pooja Room", "Study Room", "Servant Room", "Store Room"].map(room => (
                                    <button
                                      key={room}
                                      type="button"
                                      onClick={() =>
                                        setOtherRooms(prev =>
                                          prev.includes(room)
                                            ? prev.filter(r => r !== room)
                                            : [...prev, room]
                                        )
                                      }
                                      className={`px-4 py-1 rounded border transition ${
                                        otherRooms.includes(room)
                                          ? ' text-white bg-blue-600'
                                          : 'border-gray-300 text-gray-600'
                                      }`}
                                    >
                                      {room}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Furnishing */}
                              <div>
                                <Label className="block text-sm font-medium mb-2">Furnishing </Label>
                                <div className="flex gap-2">
                                  {["Furnished", "Semi-furnished", "Un-furnished"].map(option => (
                                    <button
                                      key={option}
                                      type="button"
                                      onClick={() => setFurnishing(option)}
                                      className={`px-4 py-1 rounded border transition ${
                                        furnishing === option
                                          ? ' text-white bg-blue-600'
                                          : 'border-gray-300 text-gray-600'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Reserved Parking */}
                              <div>
                                <Label className="block text-sm font-medium mb-2">Reserved Parking</Label>
                                <div className="flex items-center gap-6 flex-wrap">                              
                                  {/* Covered Parking */}
                                  <div className="flex items-center gap-2">
                                    <span>Covered Parking</span>
                                    <button
                                      type="button"
                                      onClick={() => setCoveredParking(Math.max(0, coveredParking - 1))}
                                      disabled={coveredParking === 0}
                                      className={`w-8 h-8 rounded-full border text-lg ${
                                        coveredParking === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                      }`}
                                    >
                                      −
                                    </button>
                                    <span>{coveredParking}</span>
                                    <button
                                      type="button"
                                      onClick={() => setCoveredParking(coveredParking + 1)}
                                      className="w-8 h-8 rounded-full border text-lg"
                                    >
                                      +
                                    </button>
                                  </div>

                                  {/* Open Parking */}
                                  <div className="flex items-center gap-2">
                                    <span>Open Parking</span>
                                    <button
                                      type="button"
                                      onClick={() => setOpenParking(Math.max(0, openParking - 1))}
                                      disabled={openParking === 0}
                                      className={`w-8 h-8 rounded-full border text-lg ${
                                        openParking === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                      }`}
                                    >
                                      −
                                    </button>
                                    <span>{openParking}</span>
                                    <button
                                      type="button"
                                      onClick={() => setOpenParking(openParking + 1)}
                                      className="w-8 h-8 rounded-full border text-lg"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Floor Details */}
                              <div>
                                <Label className="block text-sm font-medium mb-1">Floor Details *</Label>
                                <p className="text-sm text-gray-400 mb-2">Total no of floors and your floor details</p>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <input
                                      type="number"
                                      placeholder="Total Floors"
                                      className={`border rounded px-3 py-2 w-full ${
                                        step3Errors.totalFloors ? 'border-red-500' : ''
                                      }`}
                                      value={totalFloors}
                                      onChange={e => {
                                        setTotalFloors(e.target.value);
                                        if (step3Errors.totalFloors) {
                                          setStep3Errors(prev => ({ ...prev, totalFloors: false }));
                                        }
                                      }}
                                    />
                                    {step3Errors.totalFloors && (
                                      <p className="text-sm text-red-500 mt-1">Please enter total floors</p>
                                    )}
                                  </div>
                                  <div>
                                    <input
                                      type="number"
                                      placeholder="Property On the Floors"
                                      className={`border rounded px-3 py-2 w-full ${
                                        step3Errors.propertyOnFloor ? 'border-red-500' : ''
                                      }`}
                                      value={propertyOnFloor}
                                      onChange={e => {
                                        setPropertyOnFloor(e.target.value);
                                        if (step3Errors.propertyOnFloor) {
                                          setStep3Errors(prev => ({ ...prev, propertyOnFloor: false }));
                                        }
                                      }}
                                    />
                                    {step3Errors.propertyOnFloor && (
                                      <p className="text-sm text-red-500 mt-1">Please enter property floor</p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Availability Status */}
                              <div>
                                <Label className="block text-sm font-medium mb-2">Availability Status *</Label>
                                <div className="flex gap-4">
                                  {["Ready to move", "Under construction"].map(status => (
                                    <button
                                      key={status}
                                      type="button"
                                      onClick={() => {
                                        setAvailability(status);
                                        if (step3Errors.availability) {
                                          setStep3Errors(prev => ({ ...prev, availability: false }));
                                        }
                                        // Reset dependent fields when changing availability
                                        if (status === "Ready to move") {
                                          setPossessionBy("");
                                        } else {
                                          setPropertyAge("");
                                        }
                                      }}
                                      className={`px-4 py-2 rounded border transition-all ${
                                        availability === status
                                          ? "bg-blue-600 text-white border-blue-600"
                                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                                      } ${
                                        step3Errors.availability ? 'border-red-500' : ''
                                      }`}
                                    >
                                      {status}
                                    </button>
                                  ))}
                                </div>
                                {step3Errors.availability && (
                                  <p className="text-sm text-red-500 mt-1">Please select availability status</p>
                                )}

                                {/* Age of property (if Ready to move) */}
                                {availability === "Ready to move" && (
                                  <div className="mt-4">
                                    <Label className="block text-sm font-medium mb-2">Age of Property *</Label>
                                    <div className="flex gap-3 flex-wrap">
                                      {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map(age => (
                                        <button
                                          key={age}
                                          type="button"
                                          onClick={() => {
                                            setPropertyAge(age);
                                            if (step3Errors.propertyAge) {
                                              setStep3Errors(prev => ({ ...prev, propertyAge: false }));
                                            }
                                          }}
                                          className={`px-4 py-1 rounded border ${
                                            propertyAge === age
                                              ? "bg-blue-600 text-white border-blue-600"
                                              : "border-gray-300 text-gray-600 hover:border-blue-400 hover:bg-gray-50"
                                          } ${
                                            step3Errors.propertyAge ? 'border-red-500' : ''
                                          }`}
                                        >
                                          {age}
                                        </button>
                                      ))}
                                    </div>
                                    {step3Errors.propertyAge && (
                                      <p className="text-sm text-red-500 mt-1">Please select property age</p>
                                    )}
                                  </div>
                                )}

                                {/* Possession By (if Under construction) */}
                                {availability === "Under construction" && (
                                  <div className="mt-4">
                                    <Label className="block text-sm font-medium mb-2">Possession By *</Label>
                                    <select
                                      className={`w-[300px] border rounded px-4 py-2 text-gray-700 ${
                                        step3Errors.possessionBy ? 'border-red-500' : 'border-gray-300'
                                      }`}
                                      value={possessionBy}
                                      onChange={(e) => {
                                        setPossessionBy(e.target.value);
                                        if (step3Errors.possessionBy) {
                                          setStep3Errors(prev => ({ ...prev, possessionBy: false }));
                                        }
                                      }}
                                    >
                                      <option value="" disabled>Expected by</option>
                                      <option value="3months">Within 3 months</option>
                                      <option value="6months">Within 6 months</option>
                                      {Array.from({ length: 6 }, (_, i) => {
                                        const year = new Date().getFullYear() + i;
                                        return (
                                          <option key={year} value={year}>
                                            {year}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {step3Errors.possessionBy && (
                                      <p className="text-sm text-red-500 mt-1">Please select expected possession date</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 4 && (
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
                                    <ul className="space-y-1 text-sm">
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
                                className={`border-2 border-dashed ${step4Errors.photos ? 'border-red-500' : 'border-blue-400'} p-6 rounded-md text-center bg-blue-50`}
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
                              {step4Errors.photos && (
                                <p className="text-sm text-red-500 mt-2">Please upload at least 3 photos</p>
                              )}

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

                        {step === 5 && (
                          <div className="space-y-8 text-gray-800 relative">
                            {/* Ownership */}
                            <div id="ownership-field">
                              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 relative">
                                Ownership *
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
                                    onClick={() => {
                                      setOwnership(option);
                                      if (step5Errors.ownership) {
                                        setStep5Errors(prev => ({ ...prev, ownership: false }));
                                      }
                                    }}
                                    className={`px-4 py-1 rounded border transition ${
                                      ownership === option ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                                    } ${step5Errors.ownership ? 'border-red-500' : ''}`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                              {step5Errors.ownership && <p className="text-red-500 text-sm mt-1">Please select an ownership type</p>}
                            </div>

                            {/* Price Details */}
                            <div id="price-details-field">
                              <h2 className="text-lg font-semibold mb-3">Price Details *</h2>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <input
                                    type="number"
                                    id="expected-price-field"
                                    placeholder="₹ Expected Price"
                                    value={expectedPrice}
                                    onChange={(e) => {
                                      setExpectedPrice(e.target.value);
                                      if (step5Errors.expectedPrice) {
                                        setStep5Errors(prev => ({ ...prev, expectedPrice: false }));
                                      }
                                    }}
                                    className={`border rounded-md px-3 py-2 w-full ${step5Errors.expectedPrice ? 'border-red-500' : ''}`}
                                  />
                                  {step5Errors.expectedPrice && <p className="text-red-500 text-sm mt-1">Expected price must be a positive number</p>}
                                </div>
                                <div>
                                  <input
                                    type="number"
                                    id="price-per-sqft-field"
                                    placeholder="₹ Price per sq.ft."
                                    value={pricePerSqft}
                                    onChange={(e) => {
                                      setPricePerSqft(e.target.value);
                                      if (step5Errors.pricePerSqft) {
                                        setStep5Errors(prev => ({ ...prev, pricePerSqft: false }));
                                      }
                                    }}
                                    className={`border rounded-md px-3 py-2 w-full ${step5Errors.pricePerSqft ? 'border-red-500' : ''}`}
                                  />
                                  {step5Errors.pricePerSqft && <p className="text-red-500 text-sm mt-1">Price per sq.ft. must be a positive number</p>}
                                </div>
                              </div>

                              {/* Price options checkboxes */}
                              <div className="mt-4 flex flex-col gap-2 text-sm">
                                <label className="flex items-center gap-2 group relative">
                                  <input
                                    type="checkbox"
                                    checked={allInclusive}
                                    onChange={(e) => setAllInclusive(e.target.checked)}
                                  />
                                  All inclusive price
                                  <span className="text-gray-400 cursor-pointer">
                                    <BsPatchQuestionFill />
                                    <div className="absolute right-10 top-0 z-50 w-80 p-4 bg-white border border-gray-300 rounded-md shadow-lg text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
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

                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={taxExcluded}
                                    onChange={(e) => setTaxExcluded(e.target.checked)}
                                  />
                                  Tax and Govt. charges excluded
                                </label>

                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={priceNegotiable}
                                    onChange={(e) => setPriceNegotiable(e.target.checked)}
                                  />
                                  Price Negotiable
                                </label>
                              </div>
                            </div>

                            {/* Brokerage */}
                            <div id="brokerage-field">
                              <h2 className="text-lg font-semibold mb-2">Do you charge brokerage? *</h2>
                              <div className="flex items-center gap-6">
                                {['Yes', 'No'].map(option => (
                                  <label key={option} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      value={option}
                                      checked={brokerage === option}
                                      onChange={(e) => {
                                        setBrokerage(e.target.value);
                                        if (step5Errors.brokerage) {
                                          setStep5Errors(prev => ({ ...prev, brokerage: false }));
                                        }
                                      }}
                                    />
                                    {option}
                                  </label>
                                ))}
                              </div>
                              {step5Errors.brokerage && <p className="text-red-500 text-sm mt-1">Please select whether brokerage is charged</p>}
                            </div>

                            {/* Property Description */}
                            <div id="description-field">
                              <h2 className="text-lg font-semibold mb-1">What makes your property unique *</h2>
                              <p className="text-sm text-gray-500 mb-2">Adding description will increase your listing visibility</p>
                              <textarea
                                className={`resize-none w-full border rounded-md p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 ${
                                  step5Errors.description 
                                    ? 'border-red-500 focus:ring-red-500' 
                                    : propertyDescription.trim().length >= 30 
                                      ? 'border-green-500 focus:ring-green-500' 
                                      : 'border-gray-300'
                                }`}
                                rows={5}
                                placeholder="Share some details about your property like spacious rooms, well maintained facilities..."
                                value={propertyDescription}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val.length <= 5000) {
                                    setPropertyDescription(val);
                                    if (step5Errors.description) {
                                      setStep5Errors(prev => ({ ...prev, description: false }));
                                    }
                                  }
                                }}
                              />
                              <div className="flex justify-between mt-1 text-sm">
                                <span className={
                                  step5Errors.description 
                                    ? "text-red-500" 
                                    : propertyDescription.trim().length >= 30 
                                      ? "text-green-600" 
                                      : "text-gray-500"
                                }>
                                  {step5Errors.description 
                                    ? "Minimum 30 characters required" 
                                    : propertyDescription.trim().length >= 30 
                                      ? "Looks good!" 
                                      : `${propertyDescription.trim().length} characters`}
                                </span>
                                <span className="text-gray-500">
                                  {propertyDescription.trim().length} characters / 5000 max
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 6 && (
                          <div>
                            <div className="max-w-3xl mx-auto px-6 py-10">
                              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                                Before you post... Let buyers know who you are
                              </h2>
                              <p className="text-gray-600 mb-8">
                                These details will help serious buyers to connect with you and inspire trust
                              </p>

                              {/* RERA Registration */}
                              <div className="mb-6">
                                <label className="block font-medium mb-2">Are you RERA registered? *</label>
                                <div className="flex flex-wrap gap-3">
                                  {["Yes", "I have applied", "Not Applicable"].map((option) => (
                                    <button
                                      key={option}
                                      type="button"
                                      onClick={() => {
                                        setReraStatus(option);
                                        if (step6Errors.reraStatus) {
                                          setStep6Errors(prev => ({ ...prev, reraStatus: false }));
                                        }
                                      }}
                                      className={`px-4 py-2 border rounded text-sm font-medium transition ${
                                        reraStatus === option
                                          ? 'bg-blue-500 text-white border-blue-500'
                                          : 'text-gray-700 hover:bg-gray-100 hover:border-blue-500'
                                      } ${step6Errors.reraStatus ? 'border-red-500' : ''}`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                                {step6Errors.reraStatus && <p className="text-red-500 text-sm mt-1">Please select RERA status</p>}
                              </div>

                              {/* License Type */}
                              <div className="mb-6">
                                <label className="block font-medium mb-2">License Type *</label>
                                <div className="flex gap-4">
                                  {["Individual", "Firm"].map((type) => (
                                    <button
                                      key={type}
                                      type="button"
                                      onClick={() => {
                                        setLicenseType(type);
                                        if (step6Errors.licenseType) {
                                          setStep6Errors(prev => ({ ...prev, licenseType: false }));
                                        }
                                      }}
                                      className={`px-4 py-2 border rounded text-sm font-medium transition ${
                                        licenseType === type
                                          ? 'bg-blue-500 text-white border-blue-500'
                                          : 'text-gray-700 hover:bg-gray-100 hover:border-blue-500'
                                      } ${step6Errors.licenseType ? 'border-red-500' : ''}`}
                                    >
                                      {type}
                                    </button>
                                  ))}
                                </div>
                                {step6Errors.licenseType && <p className="text-red-500 text-sm mt-1">Please select license type</p>}
                              </div>

                              {/* Company Details */}
                              <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3">Company Details</h3>
                                <div className="space-y-4">
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Company Name *"
                                      value={companyName}
                                      onChange={(e) => {
                                        setCompanyName(e.target.value);
                                        if (step6Errors.companyName) {
                                          setStep6Errors(prev => ({ ...prev, companyName: false }));
                                        }
                                      }}
                                      className={`w-full p-3 border rounded focus:outline-blue-500 ${
                                        step6Errors.companyName ? 'border-red-500' : ''
                                      }`}
                                    />
                                    {step6Errors.companyName && <p className="text-red-500 text-sm mt-1">Company name is required</p>}
                                  </div>
                                  
                                  <input
                                    type="text"
                                    placeholder="Company URL (Optional)"
                                    className="w-full p-3 border rounded focus:outline-blue-500"
                                  />
                                  
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Company Address 1 *"
                                      value={companyAddress1}
                                      onChange={(e) => {
                                        setCompanyAddress1(e.target.value);
                                        if (step6Errors.companyAddress1) {
                                          setStep6Errors(prev => ({ ...prev, companyAddress1: false }));
                                        }
                                      }}
                                      className={`w-full p-3 border rounded focus:outline-blue-500 ${
                                        step6Errors.companyAddress1 ? 'border-red-500' : ''
                                      }`}
                                    />
                                    {step6Errors.companyAddress1 && <p className="text-red-500 text-sm mt-1">Company address is required</p>}
                                  </div>
                                  
                                  <input
                                    type="text"
                                    placeholder="Company Address 2 (Optional)"
                                    className="w-full p-3 border rounded focus:outline-blue-500"
                                  />
                                  
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="City *"
                                      value={location}
                                      onChange={(e) => {
                                        setLocation(e.target.value);
                                        if (step6Errors.location) {
                                          setStep6Errors(prev => ({ ...prev, location: false }));
                                        }
                                      }}
                                      className={`w-full p-3 border rounded focus:outline-blue-500 ${
                                        step6Errors.location ? 'border-red-500' : ''
                                      }`}
                                    />
                                    {step6Errors.location && <p className="text-red-500 text-sm mt-1">City is required</p>}
                                  </div>
                                </div>
                              </div>

                              {/* Company Description */}
                              <div className="mb-6">
                                <label className="block font-medium mb-2">Describe your company *</label>
                                <textarea
                                  rows="4"
                                  placeholder="Write here what makes your company unique (minimum 30 characters)"
                                  value={companyDesc}
                                  onChange={(e) => {
                                    setCompanyDesc(e.target.value);
                                    if (step6Errors.companyDesc) {
                                      setStep6Errors(prev => ({ ...prev, companyDesc: false }));
                                    }
                                  }}
                                  className={`w-full p-3 border rounded resize-none focus:outline-blue-500 ${
                                    step6Errors.companyDesc ? 'border-red-500' : ''
                                  }`}
                                ></textarea>
                                <div className="flex justify-between mt-1 text-sm">
                                  <span className={step6Errors.companyDesc ? "text-red-500" : "text-gray-500"}>
                                    {step6Errors.companyDesc 
                                      ? "Minimum 30 characters required" 
                                      : `${companyDesc.trim().length} characters`}
                                  </span>
                                  <span className="text-gray-500">Minimum 30 characters</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Step Navigation */}
                        <div className="flex justify-between items-center pt-4">
                          {step > 1 && (
                            <Button type="button" onClick={handleBack} variant="outline">
                              Back
                            </Button>
                          )}
                          {step < 6 ? (
                            <Button
                              type="button"
                              onClick={handleNext}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              disabled={step === 1 && !selectedSubtype}
                            >
                              Next
                            </Button>
                          ) : (
                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                              Submit
                            </Button>
                          )}
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