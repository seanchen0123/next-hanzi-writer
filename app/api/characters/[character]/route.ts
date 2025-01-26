import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ character: string }> }) {
  const character = (await params).character

  try {
    // Dynamically import character data from hanzi-writer-data package
    const characterData = await import(`hanzi-writer-data/${character}.json`)
    return NextResponse.json(characterData.default)
  } catch (error) {
    return NextResponse.json({ error: `Failed to load data for character ${character}` }, { status: 404 })
  }
}
