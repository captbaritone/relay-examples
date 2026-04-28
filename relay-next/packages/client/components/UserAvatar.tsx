import { graphql, serverFragment } from "@/relay/server";
import { UserAvatar_user$key } from "./__generated__/UserAvatar_user.graphql";

export default async function UserAvatar({
  userRef,
  size = "sm",
}: {
  userRef: UserAvatar_user$key;
  size?: "sm" | "lg";
}) {
  const user = await serverFragment(
    graphql`
      fragment UserAvatar_user on User @throwOnFieldError {
        name
        avatarColor
      }
    `,
    userRef,
  );

  const sizeClass = size === "lg" ? "h-12 w-12 text-lg" : "h-8 w-8 text-sm";

  return (
    <div
      className={`flex items-center justify-center rounded-full font-bold text-white ${sizeClass}`}
      style={{ backgroundColor: user.avatarColor }}
    >
      {user.name[0]}
    </div>
  );
}
