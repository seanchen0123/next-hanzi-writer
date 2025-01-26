'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { DialogClose } from '@/components/ui/dialog'
import { configSchema, type ConfigValues, defaultConfig } from '@/schema/config'

type HanziWriterConfigProps = {
  onConfigSave?: (config: ConfigValues) => void
}

export function getHanziWriterConfig(): ConfigValues {
  if (typeof window === 'undefined') return defaultConfig

  const savedConfig = localStorage.getItem('hanzi-writer-config')
  if (!savedConfig) return defaultConfig

  try {
    return { ...defaultConfig, ...JSON.parse(savedConfig) }
  } catch {
    return defaultConfig
  }
}

export function HanziWriterConfig({ onConfigSave }: HanziWriterConfigProps) {
  const form = useForm<ConfigValues>({
    resolver: zodResolver(configSchema),
    defaultValues: getHanziWriterConfig()
  })

  const { toast } = useToast()

  function onSubmit(data: ConfigValues) {
    localStorage.setItem('hanzi-writer-config', JSON.stringify(data))
    toast({
      title: '✅ 成功',
      description: '配置已保存!',
      duration: 2000
    })

    onConfigSave?.(data)
  }

  function onReset() {
    form.reset(defaultConfig)
    localStorage.removeItem('hanzi-writer-config')
    toast({
      title: '✅ 成功',
      description: '配置已重置!',
      duration: 2000
    })
    onConfigSave?.(defaultConfig)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="strokeAnimationSpeed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>动画速度</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newValue = Math.max(0.1, (field.value || defaultConfig.strokeAnimationSpeed) - 0.1)
                      field.onChange(Number(newValue.toFixed(1)))
                    }}
                  >
                    -
                  </Button>
                  <Input type="number" step="0.1" readOnly {...field} />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newValue = Math.min(10, (field.value || defaultConfig.strokeAnimationSpeed) + 0.1)
                      field.onChange(Number(newValue.toFixed(1)))
                    }}
                  >
                    +
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="strokeColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>字体颜色</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} />
                  <input
                    type="color"
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    className="h-10 w-10 rounded-md border border-input"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="radicalColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>偏旁部首颜色</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} />
                  <input
                    type="color"
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    className="h-10 w-10 rounded-md border border-input"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="delayBetweenStrokes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>每笔画延迟(ms)</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newValue = Math.max(0, (field.value || defaultConfig.delayBetweenStrokes) - 50)
                      field.onChange(newValue)
                    }}
                  >
                    -
                  </Button>
                  <Input type="number" step="50" readOnly {...field} />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newValue = Math.min(2000, (field.value || defaultConfig.delayBetweenStrokes) + 50)
                      field.onChange(newValue)
                    }}
                  >
                    +
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onReset}>
              恢复默认配置
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">保存设置</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  )
}
