import { toArray } from "util";
import sketch from "sketch";
import { getInvisionData, invisionToSketchData, removeInvisionData } from "./utils";

export default function() {
  const { pages } = sketch.getSelectedDocument();

  // get all the layers from all the pages
  const nativeLayers = pages.reduce(
    (prev, p) =>
      prev.concat(toArray(p.sketchObject.childrenIncludingSelf(false))),
    []
  );

  // get all the layers that have invision data
  const layersWithInvisionPrototype = nativeLayers.filter(getInvisionData);

  layersWithInvisionPrototype.forEach(nativeLayer => {
    const layer = sketch.fromNative(nativeLayer);
    if (layer.flow) {
      // already has a sketch prototype so we'll ignore it
      return;
    }
    const invisionData = getInvisionData(nativeLayer);
    const properTranslation = invisionToSketchData(layer, invisionData)
    if (properTranslation) {
      removeInvisionData(nativeLayer)
    }
  });
}
