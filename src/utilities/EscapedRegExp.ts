// Represents a escaped regular expression (with escaped pattern).
export class EscapedRegExp extends RegExp {
    public constructor (pattern: string, ...parameters: any[]) {
        super(EscapedRegExp.escapeRegExp(pattern), ...parameters);
    }
    
    public static escapeRegExp (pattern: string): string {
        return pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
}