import { VisionEntry } from "./entry/VisionEntry";

export type VisionDescriptor = {
    readonly hostname: string;

    readonly uris: string[];

    readonly entries: VisionEntry[];

    readonly meta: {
        readonly language: string;
        readonly languages: string[];
    }
};