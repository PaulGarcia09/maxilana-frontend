export default function isInDom(obj: any) {
  return Boolean(obj.closest('body'));
}
