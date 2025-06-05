"use client";

import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

import { realEstateSchema } from "../schemas/realEstateSchema";
import { realEstateUISchema } from "../schemas/realEstateUISchema";
import {
  RadioGroupControl,
  CheckboxGroupControl,
  FileInputControl,
} from "./CustomRenderers";

const renderers = [
  ...materialRenderers,
  { tester: RadioGroupControl.tester, renderer: RadioGroupControl.renderer },
  {
    tester: CheckboxGroupControl.tester,
    renderer: CheckboxGroupControl.renderer,
  },
  { tester: FileInputControl.tester, renderer: FileInputControl.renderer },
  {
    tester: (uischema) =>
      uischema.scope?.includes("city") ||
      uischema.scope?.includes("locality") ||
      uischema.scope?.includes("carpetArea") ||
      uischema.scope?.includes("totalFloors") ||
      uischema.scope?.includes("propertyFloor"),
    renderer: ({
      schema,
      path,
      handleChange,
      data,
      errors,
      required,
      showAsterisk,
    }) => {
      const fieldName = path?.replace("#/properties/", "") || "";
      const isRequired = realEstateSchema.required?.includes(fieldName);

      return (
        <div className={`space-y-2 ${path?.includes("city") ? "mb-[100px]" : ""}`}>
          <Label>
            {schema.title}
            {showAsterisk && isRequired && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </Label>
          <Input
            value={data || ""}
            onChange={(e) => handleChange(path, e.target.value)}
            className={errors?.length ? "border-red-500" : ""}
          />
          {errors?.length > 0 && (
            <p className="text-sm text-red-500 mt-1">
              {schema.title} is required
            </p>
          )}
        </div>
      );
    },
  },
];

export default function RealEstateForm() {
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [showAsterisk, setShowAsterisk] = useState(false);
  const [range, setRange] = useState([20, 80]);
  const [filteredUISchema, setFilteredUISchema] = useState({
    ...realEstateUISchema,
    elements: [realEstateUISchema.elements[0]],
  });

  useEffect(() => {
    const currentGroup = realEstateUISchema.elements[currentStep - 1];

    if (!currentGroup) return;

    const filteredElements = currentGroup.elements.filter((element) => {
      if (element.type !== "Group") return true;

      // Hide furnishing and floor details for plots/land
      if (data.propertySubType === "Plot/Land") {
        if (element.label === "Furnishing Details") return false;
        if (element.label === "Floor Details") return false;
      }

      // Hide residential features for commercial properties
      if (data.propertyCategory === "Commercial") {
        if (element.label === "Residential Specific Features") return false;
      }

      return true;
    });

    setFilteredUISchema({
      ...realEstateUISchema,
      elements: [
        {
          ...currentGroup,
          elements: filteredElements,
        },
      ],
    });
  }, [currentStep, data.propertySubType, data.propertyCategory]);

  const handleSliderChange = (val) => {
    const minGap = 1;
    const [min, max] = val;

    if (max - min < minGap) {
      if (range[0] !== min) {
        setRange([min, min + minGap]);
      } else {
        setRange([max - minGap, max]);
      }
    } else {
      setRange(val);
    }
  };

  const getCurrentStepFields = () => {
    const currentGroup = filteredUISchema.elements[0];
    return currentGroup.elements
      .filter((el) => el.type === "Control")
      .map((control) => control.scope.replace("#/properties/", ""));
  };

  const validateCurrentStep = () => {
    const currentFields = getCurrentStepFields();
    const newErrors = {};

    currentFields.forEach((field) => {
      if (
        realEstateSchema.required?.includes(field) &&
        (!data[field] ||
          (Array.isArray(data[field]) && data[field].length === 0))
      ) {
        newErrors[field] = `${
          realEstateSchema.properties[field]?.title || field
        } is required`;
      }
    });

    setErrors(newErrors);
    setShowAsterisk(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setShowErrors(true);
    if (!validateCurrentStep()) return;
    setCurrentStep((prev) => Math.min(prev + 1, 5));
    setShowAsterisk(false);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
    setShowErrors(false);
    setShowAsterisk(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (!validateCurrentStep()) return;
    console.log("✅ Form submitted:", data, "Range:", range);
    alert("🎉 Form submitted successfully!");
  };

  const progressValue = (currentStep / 5) * 100;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        List Your Property in 5 Simple Steps
      </h1>

      <div className="mb-8">
        <div className="flex justify-between mb-2 px-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`flex flex-col items-center ${
                step <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  step <= currentStep
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100"
                }`}
              >
                {step}
              </div>
              <span className="text-sm mt-2 font-medium">Step {step}</span>
            </div>
          ))}
        </div>
        <Progress value={progressValue} className="h-2 bg-gray-200" />
      </div>

      <Card className="shadow-xl border border-gray-100">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {filteredUISchema.elements[0].label}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <JsonForms
              schema={realEstateSchema}
              uischema={filteredUISchema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ data }) => setData(data)}
              validationMode={showErrors ? "ValidateAndShow" : "NoValidation"}
            />

            {currentStep === 5 && (
              <div className="w-64 mx-auto">
                <p className="mb-2">
                  Selected Range: ₹{range[0]}L – ₹{range[1]}L
                </p>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={range}
                  onValueChange={handleSliderChange}
                />
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-gray-100">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  className="min-w-[120px] h-11"
                >
                  ← Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="min-w-[120px] h-11 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next →
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="min-w-[120px] h-11 bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {showErrors && Object.keys(errors).length > 0 && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 animate-fade-in">
          <h3 className="font-semibold text-red-700 mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Please fix these errors:
          </h3>
          <ul className="space-y-2">
            {Object.values(errors).map((error, index) => (
              <li key={index} className="text-red-600 text-sm flex items-start">
                <span className="mr-1">•</span>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
