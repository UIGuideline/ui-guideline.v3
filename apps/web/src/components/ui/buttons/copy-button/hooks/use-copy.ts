import { useCallback, useEffect, useState } from 'react';
import type { CopyOptions, CopyResult } from '../types';
import { CopyMode, CopyStatus } from '../types';

/**
 * Hook to manage copy to clipboard functionality with image and text
 *
 * This hook supports three copy modes:
 * 1. 'both': Try to copy both image and text together (with fallback strategy)
 * 2. 'imageOnly': Copy only the image
 * 3. 'textOnly': Copy only the text
 */
export const useCopy = () => {
  const [status, setStatus] = useState<CopyStatus>(CopyStatus.idle);
  const [lastResult, setLastResult] = useState<CopyResult | null>(null);
  // Initialize as true to avoid hydration mismatch, will be updated on client
  const [isSupported, setIsSupported] = useState<boolean>(true);

  /**
   * Check if the Clipboard API is supported (client-side only)
   */
  useEffect(() => {
    const supported =
      typeof navigator !== 'undefined' &&
      typeof navigator.clipboard !== 'undefined' &&
      typeof navigator.clipboard.write === 'function' &&
      typeof ClipboardItem !== 'undefined';

    setIsSupported(supported);
  }, []);

  /**
   * Fetch image from URL and convert to Blob
   */
  const fetchImageAsBlob = useCallback(async (imageUrl: string): Promise<Blob | null> => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('[useCopyWithImage] Error fetching image:', error);
      return null;
    }
  }, []);

  /**
   * Copy both image and text together
   */
  const copyImageAndText = useCallback(async (imageBlob: Blob, text: string): Promise<CopyResult> => {
    try {
      const clipboardItem = new ClipboardItem({
        [imageBlob.type]: imageBlob,
        'text/plain': new Blob([text], { type: 'text/plain' }),
      });

      await navigator.clipboard.write([clipboardItem]);

      return {
        success: true,
        mode: CopyMode.both,
        message: 'Image and text copied successfully',
      };
    } catch (error) {
      console.warn('[useCopyWithImage] Failed to copy image and text together:', error);
      return {
        success: false,
        mode: undefined,
        error: error as Error,
      };
    }
  }, []);

  /**
   * Copy only the image
   */
  const copyImageOnly = useCallback(async (imageBlob?: Blob): Promise<CopyResult> => {
    try {
      if (!imageBlob) {
        return {
          success: false,
          mode: undefined,
          error: new Error('Image is required'),
        };
      }

      const clipboardItem = new ClipboardItem({
        [imageBlob.type]: imageBlob,
      });

      await navigator.clipboard.write([clipboardItem]);

      return {
        success: true,
        mode: CopyMode.imageOnly,
        message: 'Image copied successfully',
      };
    } catch (error) {
      console.warn('[useCopyWithImage] Failed to copy image:', error);
      return {
        success: false,
        mode: undefined,
        error: error as Error,
      };
    }
  }, []);

  /**
   * Copy only the text
   */
  const copyTextOnly = useCallback(async (text?: string): Promise<CopyResult> => {
    try {
      if (!text) {
        return {
          success: false,
          mode: undefined,
          error: new Error('Text is required'),
        };
      }

      await navigator.clipboard.writeText(text);

      return {
        success: true,
        mode: CopyMode.textOnly,
        message: 'Text copied successfully',
      };
    } catch (error) {
      console.warn('[useCopyWithImage] Failed to copy text:', error);
      return {
        success: false,
        mode: undefined,
        error: error as Error,
      };
    }
  }, []);

  /**
   * Helper to handle result state updates
   */
  const handleResult = useCallback(
    (
      result: CopyResult,
      onCopySuccess?: (result: CopyResult) => void,
      onCopyError?: (error: Error) => void,
    ): CopyResult => {
      setStatus(result.success ? CopyStatus.success : CopyStatus.error);
      setLastResult(result);

      if (result.success) onCopySuccess?.(result);
      else onCopyError?.(result.error!);

      return result;
    },
    [],
  );

  /**
   * Handle text-only copy mode
   */
  const handleTextOnlyMode = useCallback(
    async (
      text?: string,
      onCopySuccess?: (result: CopyResult) => void,
      onCopyError?: (error: Error) => void,
    ): Promise<CopyResult> => {
      const result = await copyTextOnly(text);
      return handleResult(result, onCopySuccess, onCopyError);
    },
    [copyTextOnly, handleResult],
  );

  /**
   * Handle image-only copy mode
   */
  const handleImageOnlyMode = useCallback(
    async (
      imageUrl: string,
      onCopySuccess?: (result: CopyResult) => void,
      onCopyError?: (error: Error) => void,
    ): Promise<CopyResult> => {
      const imageBlob = await fetchImageAsBlob(imageUrl);

      if (!imageBlob) {
        const errorResult: CopyResult = {
          success: false,
          mode: undefined,
          error: new Error('Failed to fetch image'),
        };
        return handleResult(errorResult, onCopySuccess, onCopyError);
      }

      const result = await copyImageOnly(imageBlob);
      return handleResult(result, onCopySuccess, onCopyError);
    },
    [fetchImageAsBlob, copyImageOnly, handleResult],
  );

  /**
   * Handle both copy mode with fallback strategy
   */
  const handleBothMode = useCallback(
    async (
      imageUrl: string,
      text: string,
      onCopySuccess?: (result: CopyResult) => void,
      onCopyError?: (error: Error) => void,
    ): Promise<CopyResult> => {
      const imageBlob = await fetchImageAsBlob(imageUrl);

      // If image fetch failed, fallback to text only
      if (!imageBlob) {
        const textResult = await copyTextOnly(text);
        return handleResult(textResult, onCopySuccess, onCopyError);
      }

      // 1. Try to copy both image and text
      let result = await copyImageAndText(imageBlob, text);
      if (result.success) return handleResult(result, onCopySuccess, onCopyError);

      // 2. Try to copy only image
      result = await copyImageOnly(imageBlob);
      if (result.success) return handleResult(result, onCopySuccess, onCopyError);

      // 3. Try to copy only text
      result = await copyTextOnly(text);
      if (result.success) return handleResult(result, onCopySuccess, onCopyError);

      // 4. Everything failed
      const errorResult: CopyResult = {
        success: false,
        mode: undefined,
        error: new Error('Failed to copy image or text to clipboard'),
      };
      return handleResult(errorResult, onCopySuccess, onCopyError);
    },
    [fetchImageAsBlob, copyImageAndText, copyImageOnly, copyTextOnly, handleResult],
  );

  /**
   * Main copy function
   */
  const copy = useCallback(
    async (options: CopyOptions): Promise<CopyResult> => {
      const { imageUrl, text, mode = CopyMode.both, onCopyStart, onCopySuccess, onCopyError } = options;

      // Check clipboard support
      if (!isSupported) {
        setStatus(CopyStatus.error);
        const result: CopyResult = {
          success: false,
          mode: undefined,
          error: new Error('Clipboard API is not supported in this browser'),
        };
        setLastResult(result);
        onCopyError?.(result.error!);
        return result;
      }

      setStatus(CopyStatus.copying);
      onCopyStart?.();

      // Handle copy based on mode
      switch (mode) {
        case CopyMode.textOnly:
          return handleTextOnlyMode(text, onCopySuccess, onCopyError);

        case CopyMode.both:
          return handleBothMode(imageUrl!, text!, onCopySuccess, onCopyError);

        default:
        case CopyMode.imageOnly:
          return handleImageOnlyMode(imageUrl!, onCopySuccess, onCopyError);
      }
    },
    [isSupported, handleTextOnlyMode, handleImageOnlyMode, handleBothMode, handleResult],
  );

  /**
   * Reset the copy status to idle
   */
  const reset = useCallback(() => {
    setStatus(CopyStatus.idle);
    setLastResult(null);
  }, []);

  return {
    copy,
    reset,
    status,
    lastResult,
    isSupported,
  };
};
