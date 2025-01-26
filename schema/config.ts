import * as z from "zod"

export const configSchema = z.object({
  strokeAnimationSpeed: z
    .number()
    .min(0.1, "速度最小为0.1")
    .max(10, "速度最大为10"),
  strokeColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "必须是6位16进制颜色值，如#FFFFFF"),
  radicalColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "必须是6位16进制颜色值，如#FFFFFF"),
  delayBetweenStrokes: z
    .number()
    .min(0, "延迟最小为0ms")
    .max(2000, "延迟最大为2000ms")
})

export type ConfigValues = z.infer<typeof configSchema>

export const defaultConfig: ConfigValues = {
  strokeAnimationSpeed: 1,
  strokeColor: "#333333",
  radicalColor: "#333333",
  delayBetweenStrokes: 500
}