import { Avatar, AvatarSize } from '@ui';

export interface ContributorAvatarProps {
  /**
   * The URL of the contributor's avatar image.
   */
  src: string;

  /**
   * The alt text of the contributor's avatar image.
   */
  alt: string;

  /**
   * The fallback text of the contributor's avatar image.
   */
  fallback: string;

  /**
   * The size of the contributor's avatar image.
   */
  size?: AvatarSize;
}

export const ContributorAvatar = ({ src, alt, fallback, size = AvatarSize.xs }: ContributorAvatarProps) => {
  return (
    <Avatar size={size}>
      <Avatar.Image src={src} alt={alt} />
      <Avatar.Fallback>{fallback}</Avatar.Fallback>
    </Avatar>
  );
};
