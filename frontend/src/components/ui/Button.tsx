import { type ComponentPropsWithoutRef } from 'react';

type ColorProps = {
  color: 'primary' | 'secondary' | 'textOnly';
  additionalclassname?: string;
};

type ButtonProps = ComponentPropsWithoutRef<'button'> &
  ColorProps & {
    href?: never;
  };

type AnchorProps = ComponentPropsWithoutRef<'a'> &
  ColorProps & {
    href?: string;
  };

// type predicate
function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return 'href' in props;
}

export default function Button(props: ButtonProps | AnchorProps) {
  const baseClassNames = 'rounded-md px-3.5 py-2.5 text-sm font-semibold';

  const colorClassNames = {
    primary:
      'text-white shadow-sm bg-primary hover:bg-primary-strong active:bg-primary-stronger focus:outline-none focus:ring focus:ring-neutral',
    secondary:
      'text-white shadow-sm bg-secondary hover:bg-secondary-strong active:bg-secondary-stronger focus:outline-none focus:ring focus:ring-neutral',
    textOnly: 'leading-6 text-gray-strong',
  };

  if (isAnchorProps(props)) {
    return (
      <div className="flex flex-col items-center justify-center">
        <a
          className={`${props.className} ${baseClassNames} ${
            colorClassNames[props.color]
          } ${props.additionalclassname}`}
          {...props}
        ></a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        type={props.type}
        className={`${props.className} ${baseClassNames} ${
          colorClassNames[props.color]
        } ${props.additionalclassname}`}
        {...props}
      ></button>
    </div>
  );
}
