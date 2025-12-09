import { Avatar, AvatarSize } from '@ui';

export interface SystemAvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  size?: AvatarSize;
}

export const SystemAvatar = ({ src, alt, fallback, size = AvatarSize.xl }: SystemAvatarProps) => {
  return (
    <Avatar size={size}>
      {src && <Avatar.Image src={src} alt={alt} />}
      <Avatar.Fallback>{fallback}</Avatar.Fallback>
    </Avatar>
  );
};
