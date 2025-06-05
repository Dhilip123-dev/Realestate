"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RadioGroupControl = {
  tester: (uischema) => uischema.options?.format === "radio",
  renderer: ({
    schema,
    path,
    handleChange,
    data,
    errors,
    required,
    showAsterisk,
  }) => {
    const options = schema.enum || [];
    const title = schema.title || "";

    return (
      <div className="space-y-3">
        <Label className="flex items-center">
          {title}
          {showAsterisk && required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </Label>
        <RadioGroup
          value={data || ""}
          onValueChange={(value) => handleChange(path, value)}
          className={`mt-1 ${errors?.length ? "border-red-500" : ""}`}
        >
          <div className="flex flex-wrap gap-4">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option}
                  id={`${path}-${option}`}
                  className={
                    errors?.length ? "border-red-500 text-red-500" : ""
                  }
                />
                <Label htmlFor={`${path}-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        {errors?.length > 0 && (
          <p className="text-sm text-red-500 mt-1">{title} is required</p>
        )}
      </div>
    );
  },
};

export const CheckboxGroupControl = {
  tester: (uischema) => uischema.options?.format === "checkbox",
  renderer: ({
    schema,
    uischema,
    path,
    handleChange,
    data,
    errors,
    required,
    showAsterisk,
  }) => {
    const options = schema.items?.enum || [];
    const title = schema.title || "";
    const currentValues = data || [];

    return (
      <div className="space-y-3">
        <Label className="flex items-center">
          {title}
          {showAsterisk && required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${path}-${option}`}
                checked={currentValues.includes(option)}
                onCheckedChange={(checked) => {
                  const newValues = checked
                    ? [...currentValues, option]
                    : currentValues.filter((v) => v !== option);
                  handleChange(path, newValues);
                }}
                className={errors?.length ? "border-red-500" : ""}
              />
              <Label htmlFor={`${path}-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
        {errors?.length > 0 && (
          <p className="text-sm text-red-500 mt-1">{title} is required</p>
        )}
      </div>
    );
  },
};

export const FileInputControl = {
  tester: (uischema) => uischema.options?.format === "file",
  renderer: ({
    schema,
    path,
    handleChange,
    data,
    errors,
    required,
    showAsterisk,
  }) => {
    const title = schema.title || "";
    const isMultiple = schema.type === "array";
    const accept = path && path.includes("video") ? "video/*" : "image/*";

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const fileUrls = files.map((file) => URL.createObjectURL(file));
      handleChange(path, isMultiple ? fileUrls : fileUrls[0]);
    };

    return (
      <div className="space-y-4">
        <Label className="flex items-center ">
          {title}
          {showAsterisk && required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </Label>

        {path && path.includes("video") ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              A video is worth a thousand pictures. Properties with videos get
              higher page views.
            </p>
            <div className="flex items-center gap-">
              <Input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id={`file-input-${path}`}
                accept={accept}
              />
              <Button
                variant={errors?.length ? "destructive" : "outline"}
                type="button"
                onClick={() =>
                  document.getElementById(`file-input-${path}`).click()
                }
              >
                Upload Video
              </Button>
              {data && (
                <span className="text-sm text-gray-600">Video selected</span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Max 50MB, duration less than 10 mins
            </p>
            {errors?.length > 0 && (
              <p className="text-sm text-red-500">{title} is required</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              A picture is worth a thousand words. Buyers look at photos before
              purchasing.
            </p>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                errors?.length
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Input
                type="file"
                multiple={isMultiple}
                onChange={handleFileChange}
                className="hidden"
                id={`file-input-${path}`}
                accept={accept}
              />
              <Button
                variant={errors?.length ? "destructive" : "outline"}
                type="button"
                onClick={() =>
                  document.getElementById(`file-input-${path}`).click()
                }
                className="mb-3"
              >
                Upload Photos
              </Button>
              <p className="text-sm text-gray-500">
                Drag and drop your photos here
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Add at least 3 photos
              </p>
              {data?.length > 0 && (
                <p className="text-sm text-gray-600 mt-3">
                  {data.length} photo(s) selected
                </p>
              )}
            </div>
            {errors?.length > 0 && (
              <p className="text-sm text-red-500">{title} is required</p>
            )}
          </div>
        )}
      </div>
    );
  },
};
