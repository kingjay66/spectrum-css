import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
// import { ifDefined } from 'lit-html/directives/if-definedjs';

import "../index.css";

export const Template = ({
  rootClass = "spectrum-ProgressCircle",
  customClasses = [],
  size = "m",
  overBackground = false,
  isIndeterminate = false,
  ...globals
}) => {
  const { express } = globals;

  try {
    if (!express) import(/* webpackPrefetch: true */ "../themes/spectrum.css");
    else import(/* webpackPrefetch: true */ "../themes/express.css");
  } catch (e) {
    console.warn(e);
  }

  let sizeClassName = "medium";
  switch(size) {
    case "s":
      sizeClassName = "small";
      break;
    case "l":
      sizeClassName = "large";
      break;
    default:
      sizeClassName = "medium";
  }

  const componentMarkup = html`
    <div class=${classMap({
      [rootClass]: true,
      [`${rootClass}--${sizeClassName}`]: typeof size !== "undefined",
      [`${rootClass}--indeterminate`]: isIndeterminate,
      [`${rootClass}--staticWhite`]: overBackground,
      ...customClasses.reduce((a, c) => ({ ...a, [c]: true }), {}),
    })}>
      <div class="spectrum-ProgressCircle-track"></div>
      <div class="spectrum-ProgressCircle-fills">
        <div class="spectrum-ProgressCircle-fillMask1">
          <div class="spectrum-ProgressCircle-fillSubMask1">
          <div class="spectrum-ProgressCircle-fill"></div>
        </div>
      </div>
      <div class="spectrum-ProgressCircle-fillMask2">
        <div class="spectrum-ProgressCircle-fillSubMask2">
          <div class="spectrum-ProgressCircle-fill"></div>
        </div>
      </div>
    </div>
  `;

  const decoratedMarkup = html`
    <div style="background-color: #0F797D;">
      ${componentMarkup}
    </div>
  `;

  return overBackground ? decoratedMarkup : componentMarkup;
}
