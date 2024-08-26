declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_API: string;
    readonly NEXT_PUBLIC_LOCATION_API: string;
    readonly NEXT_PUBLIC_PROJECT_API: string;
    readonly NEXT_PUBLIC_PROPERTY_API: string;
  }
}
