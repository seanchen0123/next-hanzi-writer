"use client"

import * as React from "react"
import HanziWriter from "hanzi-writer"
import { Button } from "@/components/ui/button"
import { getHanziWriterConfig } from "@/components/hanzi-writer-config"

type CharacterControlsProps = {
  writer: HanziWriter | null
  onRedraw: (config: ReturnType<typeof getHanziWriterConfig>) => void
  isLoading?: boolean
}

export function CharacterControls({ onRedraw, isLoading }: CharacterControlsProps) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        size={'lg'}
        disabled={isLoading}
        onClick={() => {
          const config = getHanziWriterConfig()
          onRedraw(config)
        }}
      >
        重新绘制
      </Button>
    </div>
  )
}