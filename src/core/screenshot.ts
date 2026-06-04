/**
 * Capture a still frame of a user-selected screen/window/tab as a PNG data URL.
 * Returns null if the user cancels the picker or the capture fails.
 */
export async function captureScreenshot(): Promise<string | null> {
  let stream: MediaStream;
  const controller = new CaptureController();
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
      controller,
    });
    // Must run before the next await, or the surface has already taken focus.
    try {
      controller.setFocusBehavior('no-focus-change');
    } catch (err) {
      console.debug('Conditional Focus unavailable; surface will take focus.', err);
    }
  } catch {
    return null;
  }

  try {
    const [track] = stream.getVideoTracks();
    // grabFrame() reads the track directly, so it works even while this tab is backgrounded.
    const bitmap = await new ImageCapture(track).grabFrame();

    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0);
    bitmap.close();

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.debug('Screenshot capture failed:', err);
    return null;
  } finally {
    stream.getTracks().forEach((t) => t.stop());
  }
}
