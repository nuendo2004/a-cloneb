"use client";
import Model from "./Model";
import useRentHome from "@/app/hooks/useRentHome";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../nav/Categories";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import { addNewProperty } from "@/app/service/rentingService";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum Wizard {
  _Category = 0,
  _Location = 1,
  _Information = 2,
  _Images = 3,
  _Description = 4,
  _Price = 5,
}

const RentHome = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
      imageSrc: "",
      price: 0,
      title: "",
      description: "",
    },
  });
  const router = useRouter();

  const categoryWatch = watch("category");
  const locationWatch = watch("location");
  const guestCountWatch = watch("guestCount");
  const roomCountWatch = watch("roomCount");
  const bathCountWatch = watch("bathroomCount");
  const imageSrcWatch = watch("imageSrc");

  const GlobalMap = useMemo(
    () =>
      dynamic(() => import("../GlobalMap"), {
        ssr: false,
      }),
    [locationWatch]
  );
  const setFieldValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const rentHomeHook = useRentHome();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(Wizard._Category);
  const onPrevious = () => {
    if (currentStep === 0) return;
    setCurrentStep((step) => step - 1);
  };
  const onNext = () => {
    if (currentStep >= Wizard._Price) return;
    setCurrentStep((step) => step + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    if (currentStep !== Wizard._Price) return onNext();
    setIsLoading(true);
    addNewProperty(formData)
      .then(() => {
        toast.success("Listing created successfully!");
        router.refresh();
        reset();
        setCurrentStep(Wizard._Category);
        rentHomeHook.onClose();
      })
      .catch(() => toast.error("Oops, something went wrong"))
      .finally(() => setIsLoading(false));
  };

  const label = useMemo(() => {
    if (currentStep === Wizard._Price) return "Submit";
    return "Next";
  }, [currentStep]);
  const secondaryLabel = useMemo(() => {
    if (currentStep === Wizard._Category) return undefined;
    return "Back";
  }, [currentStep]);

  // step 1 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  let content = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-col-2 md:grid-cols-3 px-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((category) => (
          <div key={category.label} className="col-span-1">
            <div
              className={`
            ${
              categoryWatch === category.label
                ? "border-black"
                : "border-neutral-300"
            }
            hover:cursor-pointer hover:border-neutral-800 flex flex-col py-3 justify-center items-center m-auto border rounded-md`}
              onClick={() => setFieldValue("category", category.label)}
            >
              <category.icon size={45} />
              <div>{category.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // step 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  if (currentStep === Wizard._Location) {
    content = (
      <div>
        <Heading
          title="Where is this property located?"
          subtitle="Help your guest to find you!"
        />
        <CountrySelect
          value={locationWatch}
          onChange={(value) => setFieldValue("location", value)}
          className="mt-4"
        />
        <GlobalMap center={locationWatch?.latlng} className="mt-4" />
      </div>
    );
  }

  // step 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  if (currentStep === Wizard._Information) {
    content = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          value={guestCountWatch}
          subtitle="How many guests do you allow?"
          onChange={(value) => setFieldValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          value={roomCountWatch}
          subtitle="How many rooms do you have?"
          onChange={(value) => setFieldValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          value={bathCountWatch}
          subtitle="How many guests do you allow?"
          onChange={(value) => setFieldValue("bathroomCount", value)}
        />
      </div>
    );
  }

  // step 3 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  if (currentStep === Wizard._Images) {
    content = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show Guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrcWatch}
          onChange={(value) => setFieldValue("imageSrc", value)}
        />
      </div>
    );
  }

  // step 4 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  if (currentStep === Wizard._Description) {
    content = (
      <div>
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          error={errors}
          required
          className="my-6"
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          error={errors}
          required
        />
      </div>
    );
  }

  // step 5 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  if (currentStep === Wizard._Price) {
    content = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Finally let's set your price"
          subtitle="How much would you like to charge for a night?"
        />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          type="number"
          register={register}
          error={errors}
          required
          formatPrice
          className="mt-6"
        />
      </div>
    );
  }

  return (
    <Model
      title="ACloneB your home!"
      body={content}
      isActive={rentHomeHook.isActive}
      onClose={rentHomeHook.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={label}
      secondaryLabel={secondaryLabel}
      secondaryAction={onPrevious}
    />
  );
};

export default RentHome;
