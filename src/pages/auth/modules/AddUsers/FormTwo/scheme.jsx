import { z } from "zod";
import i18n from "i18next";

export const scheme = z.object({
  qualification: z
    .string()
    .min(1, i18n.t("auth.FormTwo.Validation.qualification.required"))
    .refine(
      (value) => [
        "middle",
        "specialized",
        "incompleteHigher",
        "higher",
        "master",
        "doctorate"
      ].includes(value),
      i18n.t("auth.FormTwo.Validation.qualification.invalid")
    ),

  maritalStatus: z
    .string()
    .min(1, i18n.t("auth.FormTwo.Validation.maritalStatus.required"))
    .refine(
      (value) => ["single", "divorced", "widowed", "married_second"].includes(value),
      i18n.t("auth.FormTwo.Validation.maritalStatus.invalid")
    ),

  jobTitle: z
    .string()
    .min(1, i18n.t("auth.FormTwo.Validation.jobTitle.required"))
    .max(100, i18n.t("auth.FormTwo.Validation.jobTitle.max")),

  nationality: z
    .string()
    .min(1, i18n.t("auth.FormTwo.Validation.nationality.required"))
    .refine(
      (value) => [
        "uzbek",
        "russian",
        "kazakh",
        "kyrgyz",
        "tajik",
        "turkmen",
        "tatar",
        "other"
      ].includes(value),
      i18n.t("auth.FormTwo.Validation.nationality.invalid")
    ),

  description: z
    .string()
    .min(20, i18n.t("auth.FormTwo.Validation.description.min"))
    .max(500, i18n.t("auth.FormTwo.Validation.description.max")),

  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
      },
      i18n.t("auth.FormTwo.Validation.image.invalidFormat")
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5MB
      },
      i18n.t("auth.FormTwo.Validation.image.maxSize")
    ),

  // Новое поле для чекбокса
  terms: z
    .literal(true, {
      errorMap: () => ({ message: i18n.t("auth.FormTwo.Validation.terms.required") }),
    }),
});
