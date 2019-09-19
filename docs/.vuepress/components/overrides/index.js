export function override(context, node, component) {
  return overrideLabel(context, node, component)
}

function overrideLabel(context, node, component) {
  if (node.reply === true && node.label) {
    return component
  } else if (node.reply !== true && node.label) {
    switch (node.label) {
      case 'brandImage':
        return () => import('./brandImage')
      default:
        return component
    }
  } else {
    return component
  }
}
