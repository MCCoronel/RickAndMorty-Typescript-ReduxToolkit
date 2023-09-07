export interface RawCharacter {
    id: number
    name: string
    status: "Alive" | "Dead" | "unknown" | "Post-Apocalyptic"
    species: string
    type: string
    gender: "Male" | "Female" | "Genderless" | "unknown"
    image: string
    origin: {
        name: string
        url: string
    }
    location: {
        
    }
    episode: string[]
    url: string
    created: string

}

export interface Character extends RawCharacter {
    lastKnownLocation: string
    firstSeenIn: string
  }
  

export type CharacterType = Omit<
  Character,
  'origin' | 'location' | 'episode' | 'url' | 'created'
>