import * as z from "zod"

export const characterFormSchema = z.object({
  character: z
    .string()
    .min(1, "请输入一个汉字")
    .max(1, "仅支持输入一个汉字")
    .refine((value) => /[\u4e00-\u9fa5]/.test(value), "请输入合法的中文汉字"),
})

export type CharacterFormValues = z.infer<typeof characterFormSchema>