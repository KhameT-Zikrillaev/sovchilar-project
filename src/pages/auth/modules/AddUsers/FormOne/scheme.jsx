import { z } from "zod";
import i18n from "i18next";

export const scheme = z.object({
  firstName: z
    .string()
    .min(1, i18n.t("auth.FormOne.Validation.firstName.required"))
    .max(50, i18n.t("auth.FormOne.Validation.firstName.max")),
  
  lastName: z
    .string()
    .min(1, i18n.t("auth.FormOne.Validation.lastName.required"))
    .max(50, i18n.t("auth.FormOne.Validation.lastName.max")),
  
  phone: z
    .string()
    .min(1, i18n.t("auth.FormOne.Validation.phone.required"))
    .regex(/^\+998[0-9]{9}$/, i18n.t("auth.FormOne.Validation.phone.invalid")),
  
  age: z
    .preprocess(
      (value) => (value ? Number(value) : undefined),
      z.number({
        required_error: i18n.t("auth.FormOne.Validation.age.required"),
      })
        .min(18, i18n.t("auth.FormOne.Validation.age.min"))
        .max(100, i18n.t("auth.FormOne.Validation.age.max"))
    ),
  
  gender: z
    .string()
    .min(1, i18n.t("auth.FormOne.Validation.gender.required"))
    .refine(value => ["male", "female"].includes(value), {
      message: i18n.t("auth.FormOne.Validation.gender.invalid")
    }),
  
  address: z
    .string()
    .min(1, i18n.t("auth.FormOne.Validation.address.required"))
    .refine(value => [
      "Toshkent", "Andijon", "Buxoro", "Fargona", "Jizzax",
      "Xorazm", "Namangan", "Navoiy", "Qashqadaryo", "Samarqand",
      "Sirdaryo", "Surxondaryo", "Qoraqalpogiston"
    ].includes(value), {
      message: i18n.t("auth.FormOne.Validation.address.invalid")
    })
});
