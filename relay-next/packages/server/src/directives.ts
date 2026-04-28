import { Int } from "grats";

/**
 * @gqlDirective defer on FRAGMENT_SPREAD | INLINE_FRAGMENT
 */
export function defer(args: {
  label?: string | null;
  if?: boolean | null;
}) {
  void args;
}

/**
 * @gqlDirective stream on FIELD
 */
export function stream(args: {
  label?: string | null;
  initialCount?: Int | null;
  if?: boolean | null;
}) {
  void args;
}
