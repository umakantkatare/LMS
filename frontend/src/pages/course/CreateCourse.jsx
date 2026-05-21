import useCourseForm from "@/hooks/useCourseForm";
import BasicInfoSection from "@/components/course/createCourse/BasicInfoSection";
import CourseActions from "@/components/course/createCourse/CourseActions";
import CourseHeader from "@/components/course/createCourse/CourseHeader";
import DynamicSection from "@/components/course/createCourse/DynamicSection";
import PricingSection from "@/components/course/createCourse/PricingSection";

export default function CreateCoursePage() {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    isFree,
    fileInputRef,
    selectedCategory,
    setSelectedCategory,
    thumbnailPreview,
    handleThumbnailChange,
    tagsField,
    requirementsField,
    outcomesField,
  } = useCourseForm();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-6">
      <div className="max-w-5xl mx-auto">
        <CourseHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          <BasicInfoSection
            register={register}
            errors={errors}
            setValue={setValue}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            thumbnailPreview={thumbnailPreview}
            handleThumbnailChange={handleThumbnailChange}
            fileInputRef={fileInputRef}
          />

          <PricingSection
            isFree={isFree}
            setValue={setValue}
            register={register}
          />

          <DynamicSection
            title="Requirements"
            fields={requirementsField.fields}
            register={register}
            append={requirementsField.append}
            remove={requirementsField.remove}
            fieldName="requirements"
            placeholder="Basic JavaScript knowledge"
          />

          <DynamicSection
            title="Learning Outcomes"
            fields={outcomesField.fields}
            register={register}
            append={outcomesField.append}
            remove={outcomesField.remove}
            fieldName="learningOutcomes"
            placeholder="Build full-stack MERN applications"
          />

          <DynamicSection
            title="Tags"
            fields={tagsField.fields}
            register={register}
            append={tagsField.append}
            remove={tagsField.remove}
            fieldName="tags"
            placeholder="react"
          />

          <CourseActions />
        </form>
      </div>
    </div>
  );
}
