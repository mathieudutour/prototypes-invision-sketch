import sketch from "sketch";

const invisionKey = "com.invision.prototype";

export function getInvisionData(nativeLayer) {
  return (
    nativeLayer.userInfo &&
    nativeLayer.userInfo() &&
    nativeLayer.userInfo()[invisionKey]
  );
}

export function getSketchData(nativeLayer) {
  return (
    nativeLayer.flow &&
    nativeLayer.flow()
  );
}

const animationMap = [
  sketch.Flow.AnimationType.none, // instant
  sketch.Flow.AnimationType.none, // dissolve
  sketch.Flow.AnimationType.slideFromLeft, // push right
  sketch.Flow.AnimationType.slideFromRight, // push left
  sketch.Flow.AnimationType.slideFromLeft, // slide right
  sketch.Flow.AnimationType.slideFromRight, // slide left
  sketch.Flow.AnimationType.slideFromBottom, // slide up
  sketch.Flow.AnimationType.slideFromTop, // slide down
  sketch.Flow.AnimationType.none, // flip right
  sketch.Flow.AnimationType.none, // flip left
  sketch.Flow.AnimationType.none, // flow
  sketch.Flow.AnimationType.none, // pop
  sketch.Flow.AnimationType.none // slide dissolve
];

const properTranslation = [
  true,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false
]

export function invisionToSketchData(layer, data) {
  switch (Number(data.linkType)) {
    case 0: {
      // link to screen
      layer.flow = {
        targetId: data.targetArtboardID,
        animationType: animationMap[Number(data.transition)]
      };
      return properTranslation[Number(data.transition)]
    }
    case 5: {
      // link back
      layer.flow = {
        targetId: sketch.Flow.BackTarget
      };
      return true;
    }
    case 1: // link to overlay
      return false;
    case 3: // link to external url
      return false;
    default: {
      // not sure what are the other types
      return false; // we will just ignore ignore them anyway
    }
  }
}

const animationReverseMap = {
  none: 0,
  slideFromRight: 5,
  slideFromLeft: 4,
  slideFromBottom: 6,
  slideFromTop: 7,
}

export function sketchToInvisionData(nativeLayer, data) {
  const invisionData = {}
  let proper = true

  if (data.isBackAction()) {
    invisionData.linkType = 5
  } else {
    invisionData.linkType = 0
    invisionData.targetArtboardID = data.targetId
    if (typeof animationReverseMap[data.animationType] !== 'undefined') {
      invisionData.transition = animationReverseMap[data.animationType]
    } else {
      invisionData.transition = animationReverseMap[data.animationType] || 0
      proper = false
    }
  }

  const userInfo = nativeLayer.userInfo() ? nativeLayer.userInfo().mutableCopy() : NSMutableDictionary.new();
  userInfo.setObject_forKey(invisionData, invisionKey);
  nativeLayer.setUserInfo(userInfo.count() ? userInfo : null);

  return proper
}

export function removeInvisionData(nativeLayer) {
  const userInfo = nativeLayer.userInfo() ? nativeLayer.userInfo().mutableCopy() : NSMutableDictionary.new();
  userInfo.removeObjectForKey(invisionKey);
  nativeLayer.setUserInfo(userInfo.count() ? userInfo : null);
}

export function removeSketchData(layer) {
  layer.flow = undefined
}
