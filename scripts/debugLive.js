"use strict";
const debugLiveContainer = document.createElement("div");
debugLiveContainer.classList.add("debugLiveContainer");
debugLiveContainer.style.display = "none";

const debugLiveInput = document.createElement("input");
debugLiveInput.setAttribute("type", "checkbox");
debugLiveInput.classList.add("debugLiveInput");
debugLiveInput.id = "debugLiveInput";
debugLiveInput.style.display = "none";

const debugLiveLabel = document.createElement("label");
debugLiveLabel.classList.add("debugLiveLabel");
debugLiveLabel.textContent = "Debug Live";
debugLiveLabel.setAttribute("for", "debugLiveInput");

debugLiveContainer.append(debugLiveInput, debugLiveLabel);
document.body.prepend(debugLiveContainer);

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key == "*") {
    e.preventDefault();
    debugLiveInput.checked = !debugLiveInput.checked;
    debugLiveChange();
  }
});
debugLiveInput.addEventListener("change", () => debugLiveChange());

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    debugLiveChange();
  }
}).observe(document, { subtree: true, childList: true });

const outlineWidth = 2; // in px
const PROPERTIES = {
  outline: {
    hover: {
      parent: `${outlineWidth * 2}px solid orange`,
      element: `${outlineWidth}px solid red`,
      siblings: `${outlineWidth}px solid #3988FF`,
    },
    rest: {
      element: `${outlineWidth}px solid black`,
    },
  },
  outlineOffset: {
    hover: {
      parent: `${-outlineWidth / 2}px`,
    },
  },
  background: {
    hover: {
      parent: "#f4921f88",
      element: "#ff000055",
      siblings: "#3988FF55",
    },
    rest: {
      element: "#4bab4b55",
    },
  },
};
const getSiblings = e => {
  const parent = e.currentTarget.parentElement;
  return [...parent.children].filter(el => el !== e.currentTarget);
};
const mouseoverListener = e => {
  e.stopPropagation();
  if (e.ctrlKey) {
    const siblings = getSiblings(e);
    siblings.forEach(sibling => {
      sibling.style.background = PROPERTIES.background.hover.siblings;
      sibling.style.outline = PROPERTIES.outline.hover.siblings;
    });
    const parent = e.currentTarget.parentElement;
    parent.style.outline = PROPERTIES.outline.hover.parent;
    parent.style.outlineOffset = PROPERTIES.outlineOffset.hover.parent;
    parent.style.background = PROPERTIES.background.hover.parent;
    e.currentTarget.style.outline = PROPERTIES.outline.hover.element;
    e.currentTarget.style.background = PROPERTIES.background.hover.element;
  }
};
const mouseoutListener = e => {
  e.stopPropagation();
  const siblings = getSiblings(e);
  siblings.forEach(sibling => {
    sibling.style.background = PROPERTIES.background.rest.element;
    sibling.style.outline = PROPERTIES.outline.rest.element;
  });
  const parent = e.currentTarget.parentElement;
  parent.style.outline = PROPERTIES.outline.rest.element;
  parent.style.outlineOffset = "";
  parent.style.background = PROPERTIES.background.rest.element;
  e.currentTarget.style.outline = PROPERTIES.outline.rest.element;
  e.currentTarget.style.background = PROPERTIES.background.rest.element;
};

function debugLiveChange() {
  const all = [...document.querySelectorAll("body *:not([class*='debugLive']")];

  if (debugLiveInput.checked) {
    all.forEach(el => {
      el.addEventListener("mousemove", mouseoverListener);
      el.addEventListener("mouseout", mouseoutListener);
      if (!getComputedStyle(el).backgroundImage.includes("url("))
        el.style.background = "#4bab4b55";
      el.style.color = "black";
      el.style.outline = `2px solid ${
        el.classList.contains("undefined") ? "red" : "black"
      }`;
    });
  } else {
    all.forEach(el => {
      el.removeEventListener("mousemove", mouseoverListener);
      el.removeEventListener("mouseout", mouseoutListener);
      el.style.background = "";
      el.style.outline = "";
      el.style.color = "";
    });
    document.body.style.background = "";
    document.body.style.outline = "";
  }
}
console.info("%cdebugLive available!", "color: limegreen;");
