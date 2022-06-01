import isInDOM from './isInDOM';

export default function hasParent(element, root) {
  return root && root.contains(element) && isInDOM(element);
}
