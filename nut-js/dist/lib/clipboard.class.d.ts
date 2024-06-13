/**
 * {@link ClipboardClass} class gives access to a systems clipboard
 */
import { ProviderRegistry } from "./provider/provider-registry.class";
export declare class ClipboardClass {
    private providerRegistry;
    /**
     * {@link ClipboardClass} class constructor
     * @param providerRegistry
     */
    constructor(providerRegistry: ProviderRegistry);
    /**
     * {@link setContent} copies a given text to the system clipboard
     * @param text The text to copy
     */
    setContent(text: string): Promise<void>;
    /**
     * {@link getContent} returns the current content of the system clipboard (limited to text)
     */
    getContent(): Promise<string>;
}
//# sourceMappingURL=clipboard.class.d.ts.map