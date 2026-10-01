import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import chevronDown from './assets/chevron-down.svg';
import ghanaFlag from './assets/ghana-flag.png';

export type InputHelperTextPosition = 'top' | 'bottom';
export type InputVariant = 'default' | 'phone';

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'prefix'
> {
  /** Optional visible label. Supply aria-label when a visible label is omitted. */
  label?: ReactNode;
  /** Supporting or validation copy associated with the input. */
  helperText?: ReactNode;
  /** Places helper text with the label or beneath the control. */
  helperTextPosition?: InputHelperTextPosition;
  /** Applies the standard text or Ghana phone-number treatment from Figma. */
  variant?: InputVariant;
  /** Displays the error ring and exposes aria-invalid to assistive technology. */
  invalid?: boolean;
  /** Content rendered before the native input in the default variant. */
  leadingIcon?: ReactNode;
  /** Content rendered after the native input in the default variant. */
  trailingIcon?: ReactNode;
  /** Country calling code shown by the phone variant. */
  countryCode?: string;
  /** Override for the phone variant's flag asset. */
  countryFlagSrc?: string;
  /** Accessible flag description. Leave empty when the country code is visible. */
  countryFlagAlt?: string;
  /** Additional class applied to the native input element. */
  inputClassName?: string;
}

function joinIds(...ids: Array<string | undefined>) {
  return ids.filter(Boolean).join(' ') || undefined;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      className = '',
      countryCode = '+233',
      countryFlagAlt = '',
      countryFlagSrc = ghanaFlag,
      disabled,
      helperText,
      helperTextPosition = 'bottom',
      id,
      inputClassName = '',
      invalid = false,
      label,
      leadingIcon,
      readOnly,
      required,
      trailingIcon,
      type,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? `kofa-input-${generatedId.replace(/:/g, '')}`;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const countryCodeId =
      variant === 'phone' ? `${inputId}-country-code` : undefined;
    const hasError = invalid || ariaInvalid === true || ariaInvalid === 'true';
    const resolvedType = type ?? (variant === 'phone' ? 'tel' : 'text');
    const classes = ['kofa-input', className].filter(Boolean).join(' ');

    const helper = helperText ? (
      <span
        className="kofa-input__helper"
        data-invalid={hasError || undefined}
        id={helperId}
      >
        {helperText}
      </span>
    ) : null;

    return (
      <div
        className={classes}
        data-disabled={disabled || undefined}
        data-invalid={hasError || undefined}
        data-readonly={readOnly || undefined}
        data-variant={variant}
      >
        {(label || (helper && helperTextPosition === 'top')) && (
          <div className="kofa-input__heading">
            {label && (
              <label className="kofa-input__label" htmlFor={inputId}>
                {label}
                {required && <span aria-hidden="true"> *</span>}
              </label>
            )}
            {helperTextPosition === 'top' && helper}
          </div>
        )}

        <div className="kofa-input__control">
          {variant === 'phone' ? (
            <span className="kofa-input__phone-prefix">
              <img
                className="kofa-input__flag"
                src={countryFlagSrc}
                alt={countryFlagAlt}
              />
              <span className="kofa-input__country-code" id={countryCodeId}>
                {countryCode}
              </span>
              <img className="kofa-input__chevron" src={chevronDown} alt="" />
            </span>
          ) : (
            leadingIcon && (
              <span className="kofa-input__adornment" aria-hidden="true">
                {leadingIcon}
              </span>
            )
          )}

          <input
            ref={ref}
            {...props}
            aria-describedby={joinIds(ariaDescribedBy, countryCodeId, helperId)}
            aria-invalid={hasError || undefined}
            className={['kofa-input__native', inputClassName]
              .filter(Boolean)
              .join(' ')}
            disabled={disabled}
            id={inputId}
            readOnly={readOnly}
            required={required}
            type={resolvedType}
          />

          {variant === 'default' && trailingIcon && (
            <span className="kofa-input__adornment" aria-hidden="true">
              {trailingIcon}
            </span>
          )}
        </div>

        {helperTextPosition === 'bottom' && helper}
      </div>
    );
  },
);

Input.displayName = 'Input';
