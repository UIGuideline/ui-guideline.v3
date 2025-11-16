/**
 * Copy status states for the CopyWithImage component
 */
export enum CopyStatus {
  idle = 'idle',
  copying = 'copying',
  success = 'success',
  error = 'error',
}

/**
 * what to attempt copying
 */
export enum CopyMode {
  both = 'both',
  imageOnly = 'imageOnly',
  textOnly = 'textOnly',
}

/**
 * Result of a copy operation
 */
export interface CopyResult {
  success: boolean;
  mode: CopyMode | undefined;
  error?: Error;
  message?: string;
}

/**
 * Options for the copy operation
 */
export interface CopyOptions {
  /**
   * URL of the image to copy
   */
  imageUrl?: string;

  /**
   * Text to copy alongside the image
   */
  text?: string;

  /**
   * what to attempt copying
   */
  mode?: CopyMode;

  /**
   * Callback function when copy operation starts
   */
  onCopyStart?: () => void;

  /**
   * Callback function when copy operation succeeds
   */
  onCopySuccess?: (result: CopyResult) => void;

  /**
   * Callback function when copy operation fails
   */
  onCopyError?: (error: Error) => void;
}
