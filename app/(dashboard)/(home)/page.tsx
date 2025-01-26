'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import HanziWriter from 'hanzi-writer'
import { Settings, Loader2 } from 'lucide-react'
import { characterFormSchema, type CharacterFormValues } from '@/schema/character'
import { getHanziWriterConfig, HanziWriterConfig } from '@/components/hanzi-writer-config'
import { Button } from '@/components/ui/button'
import { CharacterControls } from '@/components/character-controls'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'

export default function HomePage() {
  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(characterFormSchema),
    defaultValues: {
      character: ''
    }
  })

  const characterDisplayRef = React.useRef<HTMLDivElement>(null)
  const writerRef = React.useRef<HanziWriter | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const drawCharacter = React.useCallback(
    async (config: ReturnType<typeof getHanziWriterConfig>) => {
      if (!characterDisplayRef.current) return null

      const character = form.getValues('character')
      if (!character) return null

      // Clear previous character if exists
      if (writerRef.current) {
        writerRef.current.cancelQuiz()
        writerRef.current = null
      }
      characterDisplayRef.current.innerHTML = ''

      try {
        setIsLoading(true)
        // Initialize HanziWriter with the target element and config using create method
        const writer = HanziWriter.create(characterDisplayRef.current, character, {
          width: 300,
          height: 300,
          padding: 5,
          showOutline: true,
          strokeAnimationSpeed: config.strokeAnimationSpeed,
          strokeColor: config.strokeColor,
          radicalColor: config.radicalColor,
          delayBetweenStrokes: config.delayBetweenStrokes,
          charDataLoader: function (char, onComplete) {
            fetch(`/api/characters/${char}`)
              .then(response => response.json())
              .then(data => {
                if (data.error) {
                  throw new Error(data.error)
                }
                onComplete(data)
                setIsLoading(false)
              })
              .catch(error => {
                console.error(`Failed to load data for character ${char}:`, error)
                setIsLoading(false)
              })
          }
        })

        // Update the writer reference after successful creation
        writerRef.current = writer
        writer.animateCharacter()
        return writer
      } catch (error) {
        console.error('Failed to create writer:', error)
        setIsLoading(false)
        return null
      }
    },
    [form]
  )

  function onSubmit(data: CharacterFormValues) {
    if (!data.character) return
    const config = getHanziWriterConfig()
    drawCharacter(config)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2">
          <input
            {...form.register('character')}
            placeholder="仅支持一个汉字展示"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            生成
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="default" disabled={isLoading}>
                <Settings />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>动画设置</DialogTitle>
                <DialogDescription>设置将存储在LocalStorage并应用到下次绘制中</DialogDescription>
              </DialogHeader>
              <HanziWriterConfig onConfigSave={drawCharacter} />
            </DialogContent>
          </Dialog>
        </div>
        {form.formState.errors.character && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.character.message}</p>
        )}
      </form>
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex justify-center items-center rounded-sm border border-border ">
          <div ref={characterDisplayRef} data-hanzi-writer className="w-[300px] h-[300px] bg-transparent z-20" />
          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
              <line x1="0" y1="0" x2="300" y2="300" stroke="hsl(var(--border))" />
              <line x1="300" y1="0" x2="0" y2="300" stroke="hsl(var(--border))" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="hsl(var(--border))" />
              <line x1="0" y1="150" x2="300" y2="150" stroke="hsl(var(--border))" />
            </svg>
          </div>
        </div>
        <CharacterControls writer={writerRef.current} onRedraw={drawCharacter} />
      </div>
    </div>
  )
}
