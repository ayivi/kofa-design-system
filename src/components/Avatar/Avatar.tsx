import {
  forwardRef,
  useEffect,
  useState,
  type HTMLAttributes,
  type SyntheticEvent,
} from 'react';

export type AvatarSize = 'xxs' | 'xs' | 's' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarVariant = 'initials' | 'image';

export interface AvatarProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  /** Seven-step size scale from the Figma avatar component set. */
  size?: AvatarSize;
  /** Defaults to image when src is provided and initials otherwise. */
  variant?: AvatarVariant;
  /** Short fallback content, ideally one or two initials. */
  initials?: string;
  /** User-provided image URL. */
  src?: string;
  /** Accessible image description. Use an empty string for decorative avatars. */
  alt?: string;
  /** Controls the crop for image avatars. */
  objectPosition?: string;
  /** Called after the avatar falls back from an image to initials. */
  onImageError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      alt = '',
      className = '',
      initials = 'AL',
      objectPosition = 'center',
      onImageError,
      size = 'md',
      src,
      variant,
      ...props
    },
    ref,
  ) => {
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
      setImageFailed(false);
    }, [src]);

    const requestedVariant = variant ?? (src ? 'image' : 'initials');
    const showImage =
      requestedVariant === 'image' && Boolean(src) && !imageFailed;

    function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
      setImageFailed(true);
      onImageError?.(event);
    }

    return (
      <span
        ref={ref}
        className={['kofa-avatar', className].filter(Boolean).join(' ')}
        data-size={size}
        data-variant={showImage ? 'image' : 'initials'}
        {...props}
      >
        {showImage ? (
          <img
            className="kofa-avatar__image"
            src={src}
            alt={alt}
            style={{ objectPosition }}
            onError={handleImageError}
          />
        ) : (
          <span className="kofa-avatar__initials">{initials}</span>
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';
