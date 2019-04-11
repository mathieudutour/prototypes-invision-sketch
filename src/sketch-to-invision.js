import { toArray } from "util";
import sketch from "sketch";
import { getInvisionData, getSketchData, sketchToInvisionData, removeSketchData } from "./utils";

export default function() {
  const { pages } = sketch.getSelectedDocument();

  // get all the layers from all the pages
  const nativeLayers = pages.reduce(
    (prev, p) =>
      prev.concat(toArray(p.sketchObject.childrenIncludingSelf(false))),
    []
  );

  // get all the layers that have sketch data
  const layersWithSketchPrototype = nativeLayers.filter(getSketchData);

  layersWithSketchPrototype.forEach(nativeLayer => {
    const invisionData = getInvisionData(nativeLayer);
    if (invisionData) {
      // already has a invision prototype so we'll ignore it
      return;
    }
    const layer = sketch.fromNative(nativeLayer);
    const sketchData = layer.flow;
    const properTranslation = sketchToInvisionData(nativeLayer, sketchData)
    if (properTranslation) {
      removeSketchData(layer)
    }
  });
}
