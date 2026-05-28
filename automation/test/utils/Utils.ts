/**
 * @author - Abhishek
 * utils class with helper methods
 */

export class Utils {
  /**
   * to use this method when .click() fails even after element is displayed
   * @param webdriverIO element
   * @returns promise<void>
   */
  async forceTap(element: WebdriverIO.Element): Promise<void> {
    await element.waitForDisplayed();
    const location = await element.getLocation();
    const size = await element.getSize();

    // Calculate the exact center pixels
    const x = Math.round(location.x + size.width / 2);
    const y = Math.round(location.y + size.height / 2);

    // Perform a raw W3C action tap
    await driver
      .action("pointer")
      .move({ duration: 0, x, y })
      .down({ button: 0 })
      .pause(100)
      .up({ button: 0 })
      .perform();
  }
}
